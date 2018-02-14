/*
*/

////////////////////////////////////////////////////////////////////////////////
//  Project vars
var world_f = 'world-110m.json';
var states_f = 'us-states.json';
var iowa_f = 'ia-counties.geojson';
var tweets_f = 'tweets_Nov9_2am_3am_EST.csv';
var scale_f = 'scale-data.tsv';

////////////////////////////////////////////////////////////////////////////////
//  Geographic vars
var geo_projection = d3.geoAlbers();
var geo_path = d3.geoPath().pointRadius(2).projection(geo_projection);

////////////////////////////////////////////////////////////////////////////////
//  Scale chart vars
var margin = {top: 20, right: 10, bottom: 20, left: 10},
    width = 600 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

var svg_scale = d3.select('#scalesChart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var parse_time = d3.timeParse("%d-%b-%y");

d3.tsv('data/' + scale_f, function(data) {
  // look at the data
  //console.log(data);

  // Convert the attributes to nums
  data.forEach(function(d) {
    d.close = +d.close;
    d.date = parse_time(d.date);
    return d;
  });

  // Use D3's scales
	// Numeric
	var scl_linear = d3.scaleLinear().range([0, 200]);
  scl_linear.domain( // Linear only needs the min/max
    [d3.min(data, function(d) { return d.close; }),
    d3.max(data, function(d) { return d.close; })]
  );
  // Time
  var scl_time = d3.scaleTime().range([0, 200]);
  scl_time.domain(  // Same with time
    [d3.min(data, function(d) { return d.date; }),
    d3.max(data, function(d) { return d.date; })]
  );

  //////////////////
  // DRAW
  svg_scale.append('g')
    .attr('transform', 'translate(' + 0 +','+ 0 + ')')
    .call(d3.axisBottom(scl_linear).ticks(5))
    .append("text")
      .attr("fill", "#000")
      .attr("y", 25)
      .attr("dy", "0.71em")
      .attr('dx', 200)
      .attr("text-anchor", "end")
      .text("Linear Scale");
  svg_scale.append('g')
    .attr('transform', 'translate(' + 250 +','+ 0 + ')')
    .call(d3.axisBottom(scl_time))
    .append("text")
      .attr("fill", "#000")
      .attr("y", 25)
      .attr("dy", "0.71em")
      .attr('dx', 200)
      .attr("text-anchor", "end")
      .text("Date Scale");
});

////////////////////////////////////////////////////////////////////////////////
//  Symbol vars
var margin = {top: 20, right: 10, bottom: 20, left: 10},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg_symbol = d3.select('#symbolMap').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.json('data/' + states_f, function(err, data) {
  if (err) throw err;

  // CONVERT TOPOJSON TO GEOJSON
  var states = data.features;
  svg_symbol.selectAll('.state')
    .data(states)
      .enter().append('path')
    .attr('class', 'state')
    .attr('d', geo_path);

    d3.csv('data/'+tweets_f, function(tweets) {


      tweets.forEach(function(d) {
        d.latitude = +d.latitude;
        d.longitude = +d.longitude;
        var point = geo_projection([d.longitude, d.latitude]);
        d.x = point[0];
        d.y = point[1];
        d.followersCount = +d.followersCount;

        return d;
      });
      console.log(tweets);

      var scl_radius = d3.scaleQuantile()
        .domain(tweets
          .filter(function(d) { return d.followersCount > 0; })
          .map(function(d) { return d.followersCount; }))
        .range([0, 1, 2, 5, 10]);

      svg_symbol.selectAll('.tweet')
        .data(tweets.filter(function(d) { return d.followersCount > 0; }))
          .enter().append('circle')
        .attr('class', 'tweet')
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        .attr('r', function(d) { return scl_radius(d.followersCount); });

    });
});
