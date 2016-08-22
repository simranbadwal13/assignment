var margin = {top: 20, right: 40, bottom: 450, left: 100},
   width = 1500 - margin.left - margin.right,
   height = 800 - margin.top - margin.bottom;
var x = d3.scale.ordinal()
   .rangeRoundBands([0, width], .1);
var y = d3.scale.linear()
   .range([height, 0]);
var color = d3.scale.ordinal()
	   .range(["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"]);
var xAxis = d3.svg.axis()
   .scale(x)
   .orient("bottom");
var yAxis = d3.svg.axis()
   .scale(y)
   .orient("left");
var svg = d3.select("body").append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
 .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
d3.json("json/bar4.json", function(error, data) {
 var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "Particulars" && key !== "Total"; });
 data.forEach(function(d) {
   var y0 = 0;
   d.ages = ageNames.map(function(name) {
	 return {
	   name: name,
	   y0: y0,
	   y1: y0 += +d[name]
	 };
   });
 d.total = d.ages[d.ages.length - 1].y1;
console.log(d.total);
		  
	   });
	   data.sort(function(a, b) {
		   return b.total - a.total;
	   });
 x.domain(data.map(function(d) { return d["Particulars"]; }));
 y.domain([0, d3.max(data, function(d) { return d.ages[d.ages.length - 1].y1; })]);
   svg.append("g")
		   .attr("class", "x axis")
		   .attr("transform", "translate(0," + height + ")")
		   .call(xAxis)
		   .selectAll("text")
		   .style("text-anchor", "end")
		   .attr("dx", "-.8em")
		   .attr("dy", ".15em")
		   .attr("transform", function(d) {
			   return "rotate(-70)"
		   });

	  svg.append("g")
		   .attr("class", "y axis")
		   .call(yAxis)
		   .append("text")
		   .attr("transform", "rotate(-90)")
		   .attr("x", -height/2)
		   .attr("dy", "-3.71em")
		   .style("text-anchor", "middle")
		   .text("In Millions");

 var country = svg.selectAll(".country")
	 .data(data)
   .enter().append("g")
	 .attr("class", "g")
	 .attr("transform", function(d) { return "translate(" + x(d["Particulars"]) + ",0)"; });
 country.selectAll("rect")
	 .data(function(d) { return d.ages; })
   .enter().append("rect")
	 .attr("width", x.rangeBand())
	 .attr("y", function(d) { return y(d.y1); })
	 .attr("height", function(d) { return y(d.y0) - y(d.y1); })
	 .style("fill", function(d) { return color(d.name); });
var legend = svg.selectAll(".legend")
		   .data(color.domain().slice().reverse())
		   .enter().append("g")
		   .attr("class", "legend")
		   .attr("transform", function(d, i) {
			   return "translate(0," + i * 20 + ")";
		   });

	   legend.append("rect")
		   .attr("x", width - 18)
		   .attr("width", 18)
		   .attr("height", 18)
		   .style("fill", color);

	   legend.append("text")
		   .attr("x", width - 24)
		   .attr("y", 9)
		   .attr("dy", ".35em")
		   .style("text-anchor", "end")
		   .text(function(d) {
			   return d;
		   });
});