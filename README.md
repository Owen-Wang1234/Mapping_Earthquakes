# Mapping_Earthquakes

## Project Overview
The client wishes to assemble a web page with an interactive map that points out all recent earthquakes that date back to seven days from the time the user opens the web page. Each earthquake on the map is sized and colored according to the magnitude, and provides the magnitude and location when the marker is clicked. The product is displayed with an HTML file, is formatted and styled with a CSS file, and uses the JavaScript file to generate the map with Leaflet and the MapBox API and to populate the map with markers using the GeoJSON data file.

## Resources

### Data Sources
These JSON files are not part of the project and are used only for practicing and demonstrating concepts of mapping GeoJSON data (found on the `Mapping_GeoJSON_Points` branch, the `Mapping_GeoJSON_Linestrings` branch, and the `Mapping_GeoJSON_Polygons` branch):

- majorAirports.json
- torontoRoutes.json
- torontoNeighborhoods.json

### Web Resources

- Mapbox - Static Maps API (API Key required)
- Leaflet - Version 1.9.3
- USGS Earthquake Hazards Program - https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
- fraxen's tectonicplates Repository - https://github.com/fraxen/tectonicplates/tree/master/GeoJSON

This web page was created in early-to-mid December of 2022; all HTML, CSS, and JavaScript code are based on the version that is current to this period of time (HTML5 and JS ES6+)

## Handling GitHub Branches
This project involves working with multiple branches in addition to the main branch. However, only two branches are merged with the main branch; all other branches remain separate yet accessible for visitors to learn more about working with Leaflet and MapBox to generate interactive maps. The first branch created (and subsequently merged) only generates a simple map centered on the United States. The second branch merged with the main branch is the last branch created that actually maps the earthquake data on a global map.

## Web Page Design

### HTML Page Script
The HTML file is the front-end interface for users to view and interact with the map. The design is very simple as it only serves as a container; all work on the map itself is done from the JavaScript file. The head section contains the CSS files both generated and linked from Leaflet and the library for D3 JavaScript. The body section contains the area that holds the map itself, the JavaScript library from Leaflet, the JavaScript config file with the MapBox API key, and the actual JavaScript application file. If a branch involves a JavaScript data file, then the HTML will include a line to reference it (GeoJSON files are directly handled in the JavaScript application).

### Stylesheet
The CSS simply sets the map area to fill out the whole page (100% height and 100% width with no padding or margin). When mapping the earthquake data, two more CSS elements are added, both correspond to the newly added legend (the body and then the icons). The main legend body is sized and rounded with a white background and gray-ish text. The icons are sized as small squares on the left of the legend text and styled.

### JavaScript Program
The JavaScript file does the main work of generating the map and handling user interactions. The program starts by creating a map object using a set of coordinates as the starting center point and an initial zoom level. Next, the program uses the Mapbox API to generate the tile layer for the map and then add this layer to the map object. The result is a basic Leaflet Map that will be the foundation for all future mapping activities.

All other branches after build on this program by adding the necessary lines of code to generate and add markers on the map. Three more branches were constructed to illustrate different concepts including placing a (circle) marker on Los Angeles, California, placing multiple (circle) markers on different US cities (specifically New York, Chicago, Houston, Los Angeles, and Phoenix) sized by population, and drawing lines from one airport to another in a sequence (San Francisco, Salt Lake City, Austin, Toronto, and New York).

The next branches cover handling GeoJSON objects to plot on the map. One runs through a JSON file to place markers on many airports across the globe, another runs through a JSON file to trace lines highlighting the routes used by the Toronto airport, and one more runs through a JSON file to plot out polygons representing neighborhoods in Toronto.

One more branch is the actual project branch that maps the earthquake data gathered over seven days from the time the GeoJSON object was requested. The logic script comes in five "copies," each one represents a step in the process:

1. The first step establishes the Street and Satellite base layers, centers on the United States with a Zoom Level of 3 (allows the viewer to see most of the globe), and places markers on the map to represent every recorded earthquake listed on the GeoJSON object taken from the USGS website.

2. The second step builds on the D3 function that places markers by making circle markers based on earthquake magnitude. A function that styles and sizes the markers was added in front of the actual marker function, and the function that sizes by magnitude (any with a magnitude of 0 is given the minimum radius) is inserted between these two functions. The GeoJSON layer function (which actually places the markers) is adjusted to place circle markers with the styling function.

3. The third step continues by inserting a function that fills the circle marker with a color that corresponds to a certain range of magnitudes. In addition, the GeoJSON layer function adds some code that creates popups that show the magnitude and location of each marked earthquake.

4. The fourth step sets the GeoJSON layer as a toggleable overlay. A layer for the earthquakes and an object to contain overlays are created; the overlays are added to the layer control. The GeoJSON layer function now gets appended to the earthquakes layer first before being appended to the map in order to allow the layer control to accurately reflect the map.

5. The last step adds the legend to the map. After putting the earthquakes layer on the map, the legend is established at the bottom right of the map. Then next lines of code creates an "info" and "legend" class of a HTML section to be inserted into the body when completed, sets up the array of magnitude values, and sets up the array of the matching colors used on the circle markers. A loop runs through the magnitudes array, getting the corresponding color and appending a row into the legend containing the color icon and the magnitude range linked to the color. The final product is added to the map (the CSS file is also updated to account for the newly added legend).

## Module Challenge
The Module Challenge involves adding more code to the logic script to add additional features. The first deliverable adds another layer to draw the tectonic plate boundaries on the global map. The second deliverable adds one more layer to mark only the major earthquakes (magnitude greater than 4.5) on the global map. The last deliverable adds more base layers to the map.

### Tectonic Plates
The added lines of code introduce the Tectonic Plates overlay to the map. The new layer is created and added to the overlays object, and a D3 JSON method is called to retrieve the tectonic plate line coordinates from the `tectonicplates` GitHub Repository by `fraxen`. The lines are created with the GeoJSON layer function and styled before adding to the tectonic layer and then the map.

### Major Earthquakes
The script for the Major Earthquakes overlay is nearly identical to the script for the main earthquakes overlay. The only differences are the source of data and the color scale for the magnitudes. Major Earthquakes primarily cover earthquakes with a magnitude greater than 4.5, so three colors are used. Two are carried over from the original color scale, but the third is added to account for magnitudes greater than 6. This color is not included in the legend, but that it exists only in the Major Earthquakes layer alongside two other colors carried from the main earthquakes layer should allow it to stand out especially as particularly large circle markers.

The legend function is moved to the Major Earthquakes function so that it stays at the bottom near the end of the logic file.

### More Base Layers