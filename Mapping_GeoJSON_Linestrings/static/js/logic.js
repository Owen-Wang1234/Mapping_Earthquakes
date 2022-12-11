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
    center: [44, -80],
    zoom: 2,
    layers: [dark]
});

// Pass the map layers into the layer control and add the layer control to the map.
L.control.layers(baseMaps).addTo(map);

// Then add the "graymap" tile layer to the map.
streets.addTo(map);

// Access the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/Owen-Wang1234/Mapping_Earthquakes/main/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2
};

// Grab the GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);

    // Create a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        // Style the lines.
        style: myStyle,

        // Create popup info-boxes for each airport.
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Airline: " + feature.properties.airline
                + "</h3> <hr> <h3>Destination: " + feature.properties.dst + "</h3>");
        }
    }).addTo(map);
});