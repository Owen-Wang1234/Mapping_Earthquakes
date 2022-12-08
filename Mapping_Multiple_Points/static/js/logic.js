// Add console.log to check to see if the code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map("mapid").setView([34.0522, -118.2437], 14);

// Create the tile layer that will be the background of the map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/dark-v10",
    accessToken: API_KEY
});

// Then add the "graymap" tile layer to the map.
streets.addTo(map);

// Add a circle marker to the map for Los Angeles, California.
let marker = L.circleMarker([34.0522, -118.2437], {
    radius: 300,
    color: "black",
    fillColor: "#ffffa1",
}).addTo(map);