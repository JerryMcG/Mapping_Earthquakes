// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//add 2nd tile layer option for map background
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

//create base layer for both maps
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

//create the map object with center, zoom level and default layers
let map = L.map('mapid', {
  center: [43.7,-79.3],
  zoom: 11,
  layers: [satelliteStreets]
});
//pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

//getting airport geoJSON url
let torontoHoods = "https://raw.githubusercontent.com/JerryMcG/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data){
  console.log(data);
  //creating a GeoJson layer with the retrieved data
  L.geoJSON(data).addTo(map);
}); 