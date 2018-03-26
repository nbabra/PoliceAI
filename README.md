# Capital-One-SFPD
https://c1-sfpd-stats.surge.sh

Capital One Software Engineer Summer Summit Challenge. This challenge gave us public information law enforcement statistics in San Francisco. Our goal was to create a web app which allows the data to be visualized in a creative way and also determine the type of dispatch from a user inputted address and time.

---

## Build

**Data Visualization:** Canvas.js
1. Pie Charts

      a. Number of incidents for each of the Neighborhoods/Districts.
      
      b. Number of incidents based off of the call type of each call. 

2. Bar Charts
      
      a. Average dispatch time for each call type.
      
      b. 
      
**Data Computation** Javascript, Google Maps
Using the user's inputted address and time, a prediction was made of the call type and also the type of dispatch. Using the 5 closest points in terms of distance and time, the call type and unit type were outputted. 

**Data Extraction:** Python, Pandas, NumPy

**Front End:**: Bootstrap, MapBox

## Computation 

Computations for the csv data can be found in jupyter notebook [jupyter-notebooks] (https://github.com/nbabra/Capital-One-SFPD/jupyter-notebooks

All other computations can be found in [address.js](https://github.com/nbabra/Capital-One-SFPD/address.js

## Authors

* **Navneeth Babra**  - (https://github.com/nbabra)

