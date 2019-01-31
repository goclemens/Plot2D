import d3 from "d3";

function Plot2D(options) {

  // default options
  this.options = {
    width_outer: 640,
    height_outer: 400,
    margin: {top: 10, right: 10, bottom: 10, left: 10},

    domainX: [0,10],
    domainY: [0,5],

    autoUpdateDomain: false

  };

  Object.assign(this.options,options);

  // dependent privates 
  var width_inner = width_outer - this.margin.left - this.margin.right;
  var height_inner = height_outer - this.margin.top - this.margin.bottom;

  // properties
  this.datasets = [];
  this.selectedDatasets = [];

  this._state = {
    activeDatasets: [],
    domainX: this.options.domainX,
    domainY: this.options.domainY
  }



  // #### D3 SVG element layers ####
  var outer = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'))
    .attr("width", this.options.width_outer)
    .attr("height", this.options.height_outer);

  // inner group element
  var inner = outer.append("g")
    .attr("transform", "translate(" + this.options.margin.left + "," + this.options.margin.top + ")");

  // scales
  var yScale = d3.scaleLinear()
    .domain(this.options.domainY)
    .range([height_inner, 0]);

  var xScale = d3.scaleLinear()
    .domain(this.options.domainX)
    .range([0, width_inner])

  // axis
  var xAxis = d3.axisBottom()
    .scale(xScale);

  var yAxis = d3.axisLeft()
    .scale(yScale);


  inner.append("g")
    .attr("class", "x_axis")
    .attr("transform", "translate(0," + height_inner + ")")
    .call(xAxis);

  inner.append("g")
    .attr("class", "y_axis")
    .call(yAxis);
  
  // plots
  var plots = inner.append("g")
    .attr("class", "g_plots");


  

}

Plot2D.prototype.autoDomain = function() {

  var domainX_new = [0,0];
  var domainY_new = [0,0];

  for (i=0; i<this.selectedDatasets.length; i++) {

    let dataset = this.selectedDatasets[i];
    
    for (let j=0; j<dataset.data.length; j++) {

      
      dataset.data[j].x
      dataset.data[j].y

    }

  }


}
 
Plot2D.prototype.addData = function(dataset,options) {
  
}

Plot2D.prototype.deleteData = function(identifier) {

}

Plot2D.prototype.addOnClick = function(func) { // pass "this" to func
  
}

Plot2D.prototype.changeMode = function(mode) {

}



// update logic
  // update domain
  // update axis
  // update plots
  // (update UI)

Plot2D.prototype.update = function() {
  this.updates.updateDomain();
  this.updates.updateAxis();
  this.updates.updatePlots();
}

// Plot2D.prototype.updateGraphs

// svg.node().appendChild(plot.node())


Plot2D.prototype.updates = {

  updateDomain: function() {
    if (this.options.autoUpdateDomain == true) {
      this.autoDomain();
    }
    yScale.domain(this.options.domainY)
    xScale.domain(this.options.domainX)
  },

  updateAxis: function() {
    yAxis.scale(yScale);
    xAxis.scale(xScale);
  },

  updatePlots: function() {

    let selectedDatasets = this.selectedDatasets;
    for (let i=0; i<selectedDatasets.length; i++) {
      this._state.findIndex(function(element){
        return element.id == selectedDatasets[i].id;
      })
    }




  }


};

// create list of shown data
// activate the renderings of the data

// line overlay
var line = d3.line()
  .x(function(d) { return x(d.x); })
  .y(function(d) { return y(d.y); });

var plot = svg.append("path")
  .datum(dataFit)
  .attr("id","dataFit")
  .attr("class", "line")
  .attr("d", line)
  .style("stroke",plotColors[0]);

  svg.selectAll(".dot").remove();
  // scatterplott of data
  svg.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("r", 3.5)
    .attr("cx", function(d){
      return x(d.x);
    })
    .attr("cy", function(d){
      return y(d.y)
    })
    .style("fill", "black")

allplot


/* 
PLOTS:

paths: color, width
points: color, radius

*/

export default Plot2D;