// import { getJSON, getLocation } from './utilities.js';
import QuakesController from './QuakesController.js';

const quakesController = new QuakesController('#quakeslist');


// const baseUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-03-02&latitude=43.814540699999995&longitude=-111.78491029999999&maxradiuskm=100";


// Make use of our two functions to get the current location from the browser...then send that on to the API to request the earthquakes within a 100km radius of that location. The URL that you should end up with should look like this:

// https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-03-02&latitude=43.814540699999995&longitude=-111.78491029999999&maxradiuskm=100

quakesController.init();
// console.log(getJSON, getLocation);
