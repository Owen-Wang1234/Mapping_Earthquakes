// Add console.log to check to see if the code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map("mapid").setView([40.7, -94.5], 4);

// Create the tile layer that will be the background of the map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});

// Then add the "graymap" tile layer to the map.
streets.addTo(map);

// Get data from cities.js.
let cityData = cities;

// Coordinates for each point to be used in the polyline will be held here.
let line = [];

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
    console.log(city)
    line.push(city.location);
    L.marker(city.location)
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Airport: " + city.airport + "</h3>")
    .addTo(map);
});

// Create a polyline using the line coordinates.
L.polyline(line, {
    color: "blue",
    weight: 4,
    opacity: 0.5,
    dashArray: "10"
}).addTo(map);