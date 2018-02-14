/*
*/

////////////////////////////////////////////////////////////////////////////////
//  Project vars
var world_f = 'world-110m.json';
var states_f = 'us-states.json';
var iowa_f = 'ia-counties.geojson';

////////////////////////////////////////////////////////////////////////////////
//  Chart vars
var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 480 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

var svg = d3.select('#viz').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


////////////////////////////////////////////////////////////////////////////////
//  Geographic vars
var geo_projection
var geo_path;



// Reading geojson
d3.json('data/' + states_f, function(err, data) {
  if (err) throw err;
  //console.log(data);

  // GeoJSON stores it's objects within a 'features' category
  var counties = data.features;

  geo_projection = d3.geoAlbersUsa().fitSize([width, height], data);
  geo_path = d3.geoPath().pointRadius(2).projection(geo_projection);

  var svg_temp = d3.select('#pathExample').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  svg_temp.selectAll('.county')
    .data(counties)
      .enter().append('path')
    .attr('class', 'county')
    .attr('d', geo_path);
});


d3.json('data/' + world_f, function(err, data) {
  if (err) throw err;

  // GeoJSON stores it's objects within a 'features' category
  var gson = topojson.feature(data, data.objects.countries);
  var counties = gson.features;

  //console.log(counties);

  var geo_projection = d3.geoMercator().fitSize([width, height], gson);
  var geo_path = d3.geoPath().pointRadius(2).projection(geo_projection);

  var svg_t = d3.select('#pathExample2').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  svg_t.selectAll('.country')
    .data(counties)
      .enter().append('path')
    .attr('class', 'country')
    .attr('d', geo_path);
});
