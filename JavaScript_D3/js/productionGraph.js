//margin convention
var margin = { top: 20, right: 20, bottom: 630, left: 60},
	width=1200 - margin.right - margin.left,
	height=1000 - margin.top - margin.bottom;


// define svg
var svg=d3.select('body')
	.append('svg')
	.attr ({
			"width" : width + margin.right + margin.left,
			"height" : height + margin.top + margin.bottom
			}) 
			.append('g')
			.attr("transform", "translate(" + margin.left +','+ margin.right + ')');

// define the x y scales

var xScale=d3.scale.ordinal()
			.rangeRoundBands([0,width],0.2, 0.2);

var yScale=d3.scale.linear()
			.range([height,0]);

//define axis
var xAxis=d3.svg.axis()
	.scale(xScale)
	.orient("bottom");

var yAxis=d3.svg.axis()
	.scale(yScale)
	.orient("left");

//json file
d3.json("json/Oilseed_json.json",function(error,data){
	if(error)console.log("Error : Data not loaded");

	data.forEach(function(d){
		d[" 3-2013"]= +d[" 3-2013"];
		d.Particulars=d.Particulars;
		console.log(d[" 3-2013"]);
		});
	data.sort(function(a,b){
		return b[" 3-2013"] - a[" 3-2013"];
	});
	// specify the domain of the x and y scales
	xScale.domain(data.map(function(d){ return d.Particulars;}) );
	yScale.domain([0, d3.max(data,function(d){return d[" 3-2013"];}) ] );

	// draw the bars
	svg.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr("heigth",0)
		.attr("y",height/20)
		.transition().duration(3000)
		.delay(function(d,i){ return i*200;})
		.attr({
			"x" : function(d) { return xScale(d.Particulars);},
			"y" : function(d) { return yScale(d[" 3-2013"]);},
			"width" : xScale.rangeBand(),
			"height" : function(d) { return height - yScale(d[" 3-2013"]);}
		})
		.style("fill", function(d,i){return 'rgb(20,20, '+ ((i*30)+100)+')'});

// label the bars
	svg.selectAll('text')
	.data(data)
	.enter()
	.append('text')
	.text(function(d){ return d[" 3-2013"];})
	.attr('x',function(d){ return xScale(d.Particulars) + xScale.rangeBand()/2; })
	.attr('y',function(d){ return yScale(d[" 3-2013"]) + 12; })
	.style("fill", "white")
	.style("text-anchor","middle");
	


// draw the xAxis
	svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height +")")
	.call(xAxis)
	.selectAll('text')
	.attr("transform","rotate(-75)")
	.attr("dx","-.8em")
	.attr("dy",".25em")
	.style("text-anchor","end")
	.style("font-size","15px");

	svg.append("g")
	.attr("class", "y axis")
	.call(yAxis);
});