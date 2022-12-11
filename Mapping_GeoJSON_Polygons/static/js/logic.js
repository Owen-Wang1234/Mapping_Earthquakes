// Create the tile layer that will be the background of the map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    accessToken: API_KEY
});

// Create the tile layer that will be the background of the map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// Create the map object with the center, zoom level, and default layer.
let map = L.map("mapid", {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
});

// Pass the map layers into the layer control and add the layer control to the map.
L.control.layers(baseMaps).addTo(map);

// Access the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/Owen-Wang1234/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Create a style for the polygons.
let myStyle = {
    color: "blue",
    fillColor: "yellow",
    weight: 1
};

// Grab the GeoJSON data.
d3.json(torontoHoods).then(function(data) {
    console.log(data);

    // Create a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        // Style the lines.
        style: myStyle,

        // Create popup info-boxes for each airport.
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Neighborhood: " + feature.properties.AREA_NAME + "</h3>");
        }
    }).addTo(map);
});