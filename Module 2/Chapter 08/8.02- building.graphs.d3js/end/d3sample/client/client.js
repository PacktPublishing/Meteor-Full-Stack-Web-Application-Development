Template.diagram.rendered = function(){
  //we wrap everything in the Template.rendered() callback,
  // so that we don't interfere with Blaze
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  //We are going to set the domains for x an y immediately
  //(assuming the alphabet isn't going to change)
  x = d3.scale.ordinal()
    .domain('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
    .rangeRoundBands([0, width], .1);
  //ALSO: note that we *removed* the 'var' declarations,
  //so that x and y are global / accessible
  y = d3.scale.linear()
    .domain([0,0.15])
    .range([height, 0]);
  var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");
  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(10, "%");
  // We are moving the axes creation (and SVG init)
  // to be *outside* our autorun()
  var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," +
        margin.top + ")");
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Frequency");
  //We move D3.js rendering inside Tracker.autorun()
  this.autorun(function(){
    // Instead of reading data from a static file,
    // we access the Letters collection
    var data = Letters.find().fetch();
    if (!data.length) return;
    // To use D3.js's built-in update tracking,
    // we need access to our d3.selectAll() object..
    var bars = svg
    .selectAll(".bar")
    .data(data, function(d){return d._id;});
    // On new (when initializing), we append and animate
    bars.enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("height",0)
      .attr("y", height)
      .transition()
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height -
      y(d.frequency); });
    // On change, we just animate to the new position
    bars
      .transition()
      .duration(200)
      .ease("sin-out")
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height -
      y(d.frequency); });
  });
  
  // everything's set! let's randomize 5 times / second...
  Meteor.setInterval(randomize,200);
};

// Our randomize function
randomize = function(){
  // get a random position between 0-25
  var ranLetter = ~~(Math.random()*26),
      // and a random frequency between 0-15%
      ranFreq = (Math.random()*0.15);
  // get the actual character
  ranLetter = x.domain()[ranLetter];
  // update the frequency using a server call,
  // because it's easier than tracking down the _id
  Meteor.call('updateFrequency',ranLetter,ranFreq);
};