// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//add 2nd tile layer option for map background
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

//create base layer for both maps
let baseMaps = {
  Light: light,
  Dark: dark
};

//create the map object with center, zoom level and default layers
let map = L.map('mapid', {
  center: [44.0,-80.0],
  zoom: 3,
  layers: [dark]
})
//pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

//getting airport geoJSON url
let torontoData = "https://raw.githubusercontent.com/JerryMcG/Mapping_Earthquakes/main/torontoRoutes.json";

//create a style for the lines
let myStyle = {
  color: "#ffffa1",
  weight: 2
}
// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data){
  console.log(data);
  //creating a GeoJson layer with the retrieved data
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2>Airline: " + feature.properties.airline + "<h2> <hr> <h2>Destination: " 
      + feature.properties.dst + "<h2>")
    }
  })
  .addTo(map);
}); 