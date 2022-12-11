// Create the tile layer that will be the background of the map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    accessToken: API_KEY
});

// Create the tile layer that will be the background of the map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create the map object with the center, zoom level, and default layer.
let map = L.map("mapid", {
    center: [30, -30],
    zoom: 2,
    layers: [streets]
});

// Pass the map layers into the layer control and add the layer control to the map.
L.control.layers(baseMaps).addTo(map);

// Then add the "graymap" tile layer to the map.
streets.addTo(map);

// Access the airport GeoJSON URL.
let airportData = "https://raw.githubusercontent.com/Owen-Wang1234/Mapping_Earthquakes/main/majorAirports.json";

// Grab the GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);

    // Create a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        // Create popup info-boxes for each airport.
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Airport Code: " + feature.properties.faa
                + "</h3> <hr> <h3>Airport Name: " + feature.properties.name + "</h3>");
        }
    }).addTo(map);
});