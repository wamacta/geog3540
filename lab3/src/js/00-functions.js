function add_svg(selector, margin, width, height) {
  var svg = d3.select(selector).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    return svg;
}

function draw_scale(selector, scale, text, x, y) {
  var axis = selector.append('g')
    .attr('transform', 'translate(' + x +','+ y + ')')
    .call(d3.axisBottom(scale))
    .append("text")
      .attr("fill", "#000")
      .attr("y", 25)
      .attr("dy", "0.71em")
      .attr('dx', 200)
      .attr("text-anchor", "end")
      .text(text);
  return axis;
}
