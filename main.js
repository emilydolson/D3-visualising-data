//This is a comment
var chart_area = d3.select("#chart_area");
var frame = chart_area.append("svg");
var canvas = frame.append("g")

var margin = {top:19.5, right: 19.5, bottom: 19.5, left: 39.5}
var frame_width = 960;
var frame_height = 350;
var canvas_width = frame_width - margin.left - margin.right;
var canvas_height = frame_height - margin.top - margin.bottom;

frame.attr("width", frame_width);
frame.attr("height", frame_height);

canvas.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//var circle = canvas.append("circle").attr("r", 40);

var xScale = d3.scale.log();
xScale.domain([250, 1e5]).range([0, canvas_width]);

var xAxis = d3.svg.axis().orient("bottom").scale(xScale);

canvas.append("g")
	.attr("class", "x_axis")
	.attr("transform", "translate(0, " + canvas_height + ")")
	.call(xAxis);	

var yScale = d3.scale.linear().domain([10, 85]).range([canvas_height, 0]);

var yAxis = d3.svg.axis().orient("left").scale(yScale);

canvas.append("g")
	.attr("class", "y_axis")
	.call(yAxis);

var rScale = d3.scale.sqrt().domain([0, 5e8]).range([0, 40]);

var accessor = function(row){
	return {
		country: row.country,
		year: +row.year,
		pop: +row.pop,
		continent: row.continent,
		lifeExp: +row.lifeExp,
		gdpPercap: +row.gdpPercap
	};
}

d3.csv("http://emilydolson.github.io/D3-visualising-data/resources/nations.csv",
	accessor,
	function(nations){
		var data_canvas = canvas.append("g").attr("class", "data_canvas");
		var year = parseInt(document.getElementById("year_slider").value);
		var filtered_nations = nations.filter(function(d){return d.year == year});

		//var african_nations = nations.filter(function(d){return d.continent == "Africa"});
		//console.log(african_nations)

		var update = function(){
			var circles = data_canvas.selectAll("circle")
				.data(filtered_nations, function(d){return d.country})
				
			circles.enter()
				.append("circle")

			circles.exit().remove();

			circles.attr("cx", function(d){return xScale(d.gdpPercap)})
				.attr("cy", function(d) {return yScale(d.lifeExp)})
				.attr("r", function(d){return rScale(d.pop)});

		}
		update();

		d3.select("#year_slider").on("input", function(){
			year = parseInt(this.value);
			filtered_nations = nations.filter(function(d){return d.year==year;});
			update();
		})

	}
)