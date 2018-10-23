var latitudeData = []; //global variable from the dataset's longitude and latitude
var longitudeData = [];
var loc= {}; //global variable to hold latitude and longitude inputed address
var call = {};
var unit = {};

function initMap() {
    var geocoder = new google.maps.Geocoder();
    document.getElementById('submit').addEventListener('click', function() { //change the id that is used here and replace with button id for check area
    geocodeAddress(geocoder);
    });
}

function geocodeAddress(geocoder) {

    var location = [];

    var address = document.getElementById('address').value; //address input 

    geocoder.geocode({'address': address}, function(results, status) {

    if (status === 'OK') {

        location[0]=results[0].geometry.location.lat(); //store the latitude and longitude from the address as a variable
        location[1]=results[0].geometry.location.lng();

        loc.latitude = location[0];
        loc.longitude = location[1];

        if ((location[1] > -122.36475849999999) ||
        (location[1] < -122.5115) || (location[0] < 37.706927690000001) ||
        (location[0] > 37.83109279)) {

           alert("Invalid Address! Must be in San Francisco. Webpage is being reloaded.");
           reload();
           
         } else {
            move();
            getClose(loc.latitude, loc.longitude); //run through to store 5 closest values into an array
            
         }

    } else {
        alert('Geocode was not successful for the following reason: ' + status);
    }
    })
}

function getClose(latitude,longitude) {



    readJson("pred.json", function(text){
        data = JSON.parse(text);
    });

    var timeInput =Math.round(new Date (document.getElementById('datetime').value).getTime()/1000);
    console.log(timeInput);
    for (i = 0; i < 10000; i++) {
        latitudeData.push(parseFloat(data[i]['latitude']));
        longitudeData.push(parseFloat(data[i]['longitude']));
    }

    var close=[];
    
    for (i =1; i<6; i++){
        var dist = Math.acos(Math.sin(loc.latitude) * Math.sin(latitudeData[i]) + Math.cos(loc.latitude) * Math.cos(latitudeData[i]) * Math.cos(loc.longitude - longitudeData[i])); //distance formula considering curvature of Earth
        var point = {distance: dist, row_id: data[i]['row_id'], time: Math.round(new Date (data[i]['received_timestamp']).getTime()/1000)}; //converting to unix time in the array
        close.push(point);
    }
    close.sort(sortDist);
    for ( i =6; i<data.length; i++){
        var distNew = Math.acos(Math.sin(loc.latitude) * Math.sin(latitudeData[i]) + Math.cos(loc.latitude) * Math.cos(latitudeData[i]) * Math.cos(loc.longitude - longitudeData[i])); //distance formula considering curvature of Earth
        if (distNew < close[close.length-1].distance){ // checking if there are other closer points
            close.splice(-1); //remove the last point
            var pointNew = {distance: distNew, row_id: data[i]['row_id'], time: Math.round(new Date (data[i]['received_timestamp']).getTime()/1000)}; 
            close.push(pointNew); //add the new point
            close.sort(sortDist); //sort the array
        }
    }

    console.log(close);

    for (i=0; i<5; i++) {
        close[i].time = Math.abs(timeInput - close[i].time); //finding the closest time by difference
    }
    close.sort(sortTime);
    
    var finalSet = [];
    for (i=0; i<data.length; i++) {
        var dataPoint = {row_id: data[i]['row_id'], call_type: data[i]['call_type'], unit_type: data[i]['unit_type']}; //testing for the specific call type and unit type corresponding to the row id from the sorted array
        finalSet.push(dataPoint);
        
    }

    for (i = 0; i < finalSet.length; i++) { // cross reference the row id with the row id in the dataset and find the unit and call type
        if (close[0].row_id === finalSet[i].row_id) {
            call.call = finalSet[i].call_type;
            unit.unit = finalSet[i].unit_type;
        }
    }
    document.getElementById("response").innerHTML=call.call+", "+unit.unit;

    
}
function readJson(file, callback) { //reading json file
    var pred = new XMLHttpRequest();
    pred.overrideMimeType("application/json");
    pred.open("GET", file, false);
    pred.onreadystatechange = function() {
        if (pred.readyState === 4 && pred.status == "200") {
            callback(pred.responseText);
        }
    }
    pred.send(null);
}
function reload() {
        location.reload();
}
function sortDist(x, y) {
    if (x.distance === y.distance) {
        return 0;
    }
    else {
        return (x.distance < y.distance) ? -1 : 1;
    }
}
function sortTime(x,y) {
    if (x.time == y.time) {
        return 0;
    }
    else {
        return (x.time < y.time) ? -1 : 1;
    }
}
function move() {
    var elem = document.getElementById("myBar");   //loading bar 
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else if (width == 100) {
            clearInterval(id);
        } else {
            width++; 
            elem.style.width = width + '%'; 
        }
    }
}

