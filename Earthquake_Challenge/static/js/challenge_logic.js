// Add console.log to check to see if the code is working.
console.log("working");

// Create the Streets tile layer that will be a background of the map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    accessToken: API_KEY
});

// Create the Satellite Streets tile layer that will be a background of the map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    accessToken: API_KEY
});

// 3.1a - Create the Outdoors tile layer that will be a background of the map.
let outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    accessToken: API_KEY
});

// 3.1b - Create the Dark tile layer that will be a background of the map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets,
    // 3.2 - Add the additional maps to the base layer object.
    "Outdoors": outdoors,
    "Dark": dark
};

// Create the earthquake layer for the map.
let earthquakes = new L.layerGroup();

// 1.1 - Create the tectonic plate layer for the map.
let tectonics = new L.layerGroup();

// 2.1 - Create the major earthquakes layer for the map.
let majorEQ = new L.layerGroup();

// Define an object to contain the overlays.
// This overlay will be visible all the time.
let overlays = {
    // 1.2 - Add a reference to the tectonic layer.
    "Tectonic Plates": tectonics,
    "Earthquakes": earthquakes,
    // 2.2 - Add a reference to the major earthquakes layer.
    "Major Earthquakes": majorEQ
};

// Create the map object with the center, zoom level, and default layer.
let map = L.map("mapid", {
    center: [40.7, -94.5],
    zoom: 3,
    layers: [streets]
});

// Pass the map layers into the layer control and add the layer control to the map.
L.control.layers(baseMaps, overlays).addTo(map);

// 1.3 - Retrieve the tectonic plate GeoJSON data.
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(data) {
    // Style the tectonic plate lines.
    function styleInfo() {
        return {
            opacity: 1,
            color: "orangered",
            weight: 2
        };
    }

    // Create a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        // Set the style.
        style: styleInfo
    }).addTo(tectonics);

    // Then add the tectonic plate layer to the map.
    tectonics.addTo(map);
});

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    // This function returns the style data for each of the earthquakes plotted on the map.
    // The magnitude of the earthquake is passed into a function to calculate the radius.
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

    // This function determines the color of the earthquake marker based on the magnitude.
    function getColor(magnitude) {
        if (magnitude > 5) {
            return "#ea2c2c";
        }
        if (magnitude > 4) {
            return "#ea822c";
        }
        if (magnitude > 3) {
            return "#ee9c00";
        }
        if (magnitude > 2) {
            return "#eecc00";
        }
        if (magnitude > 1) {
            return "#d4ee00";
        }
        return "#98ee00";
    }

    // This function determines the radius of the earthquake marker based on the magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

    // Create a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        // Turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },

        // Set the style for each circleMarker using the styleInfo function.
        style: styleInfo,

        // Create a popup for each circleMarker to display the magnitude and location
        // of the earthquake after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakes);

    // Then add the earthquake layer to the map.
    earthquakes.addTo(map);
});

// 2.3 - Retrieve the major earthquakes GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(function(data) {
    // 2.4 - Use the same style as the earthquake data.
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

    // 2.5 - Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake.
    function getColor(magnitude) {
        if (magnitude > 6) {
            return "#ee00d4";
        }
        if (magnitude > 5) {
            return "#ea2c2c";
        }
        return "#ea822c";
    }

    // 2.6 - Use the function that determines the radius of the earthquake marker based on its magnitude.
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

    // 2.7 - Create a GeoJSON layer with the retrieved data that adds a circle to the map sets the style of the circle,
    // and displays the magnitude and location of the earthquake after the marker has been created and styled.
    L.geoJSON(data, {
        // Turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },

        // Set the style for each circleMarker using the styleInfo function.
        style: styleInfo,

        // Create a popup for each circleMarker to display the magnitude and location
        // of the earthquake after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(majorEQ);

    // 8. Add the major earthquakes layer to the map.
    majorEQ.addTo(map);

    // Create a legend control object.
    let legend = L.control({
        position: "bottomright"
    });

    // Then add all the details for the legend.
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        const magnitudes = [0, 1, 2, 3, 4, 5];
        const colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"
        ];

        // Loop through the intervals to generate a label with a colored square for each interval.
        for (var i = 0; i < magnitudes.length; i++) {
            console.log(colors[i]);
            div.innerHTML +=
                "<i style='background: " + colors[i] + "'></i> " +
                magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
        }

        return div;
    };

    // Then add the legend to the map.
    legend.addTo(map);
// 9. Close the braces and parentheses for the major earthquake data.
});