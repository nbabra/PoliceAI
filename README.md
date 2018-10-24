
# Capital-One-SFPD

# Police AI

https://policeAI.surge.sh

Capital One Software Engineer Summer Summit Challenge. This challenge gave us public information law enforcement statistics in San Francisco. Our goal was to create a web app which allows the data to be visualized in a creative way and also determine the type of dispatch from a user inputted address and time.

---
## Criteria
* Data Visuals: Display or graph 3 metrics or trends from the data set that are interesting to you.

* Given an address and time, what is the most likely dispatch to be required?

* Which areas take the longest time to dispatch to on average? How can this be reduced?

## Bonus
* Preparing for the future: Which areas are experiencing the greatest increase in dispatch calls? Where and what type of dispatch service would you place to help with the rate of increasing calls?

## Build

**Data Visualization:** Canvas.js, MapBox
1. Pie Charts

      a. Number of incidents for each of the Neighborhoods/Districts.
      
      b. Number of incidents based off of the call type of each call. 

2. Bar Charts
      
      a. Average dispatch time for each call type.
      
      b. Number of incidents per unit type dispatched.

3. Map
      
      a. Top 3 call types in different colors with all others as yellow.
      
      
**Data Computation:** Javascript, Google Maps
Using the user's inputted address and time, a prediction was made of the call type and also the type of dispatch. Using the 5 closest points in terms of distance and time, the call type and unit type were outputted. 

**Data Extraction:** Python, Pandas, NumPy

**Front End:** HTML, CSS, JavaScript, Bootstrap, MapBox

## Computation 

Computations for the csv data can be found in jupyter notebook [jupyter-notebooks] (https://github.com/nbabra/Capital-One-SFPD/tree/master/jupyter-notebooks)

All other computations can be found in [address.js](https://github.com/nbabra/Capital-One-SFPD/blob/master/address.js)

## Authors

* **Navneeth Babra**  - (https://github.com/nbabra)

