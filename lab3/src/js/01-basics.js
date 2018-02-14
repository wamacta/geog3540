/*
  D3-conventions.
*/

// The margin gives us a boundary around the figure. This is useful when
// you have an axis with ticks needed to give information about the data
var margin = {top: 15, right: 15, bottom: 15, left: 15};

// We set the width/height with respect to the margins.
// This allows all of our marking to be corretly placed, we'll correct for this
var width = 960 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

// Our SVG element.
var svg_temp = d3.select("#viz-add")                             // grabs the <div> with the id 'visualization'
    .append("svg")                                      // Adds a SVG element to the end of it
    .attr("width", width + margin.left + margin.right)  // With our pre-calcd dimensions
    .attr("height", height + margin.top + margin.bottom)
      .append('g')                                      // Before adding a group and moving it
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
svg_temp.append('rect')
  .attr('x', 0)
      .attr('y', 0)
      .attr("width", width/2)
      .attr("height", height/2)
      .attr('class', 'outlineSVG');







// Our SVG element.
var svg = d3.select("#viz-attr")                             // grabs the <div> with the id 'visualization'
    .append("svg")                                      // Adds a SVG element to the end of it
    .attr("width", width + margin.left + margin.right)  // With our pre-calcd dimensions
    .attr("height", height + margin.top + margin.bottom)
      .append('g')                                      // Before adding a group and moving it
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// Classes
// Classes allow many objects to share similar properties.
// It also allows selecting a 'group'
svg.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr("width", width/2)
    .attr("height", height/2)
    .style('fill', 'none');
svg.append('rect')
    .attr('class', 'outlineSVG')                        // ADD a class
    .attr('x', width/2)
    .attr('y', 0)
    .attr("width", width/2)
    .attr("height", height/2);
svg.append('rect')
    .attr('class', 'outlineSVG')                        // ADD a class
    .attr('x', 0)
    .attr('y', height/2)
    .attr("width", width/2)
    .attr("height", height/2);

// ID
// ID's allow selection of a single element, useful for when we want specific elements
svg.append('rect')
    .attr('class', 'outlineSVG')
    .attr('id', 'fillSVG')                              // ADD an unique ID
    .attr('x', width/2)
    .attr('y', height/2)
    .attr("width", width/2)
    .attr("height", height/2);
