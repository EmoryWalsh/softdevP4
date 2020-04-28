var btn = document.getElementById("btn");
var instructions = document.getElementById("instructions");
var key = document.getElementById("key");

var renderMap = async() => {
	//hide render button and instructions
	instructions.style.display = "none";
	//show key
	key.style = ""
	var world = await d3.json('/static/data/countries-10m.json');
	var pathData = topojson.feature(world,world.objects.countries).features;

	var colorMapper = genMapper();

	svg.selectAll(".pathFill")
        .data(pathData)
        .join(
            enter => enter.append('path')
                // d3.geoPath() gets the coordinates from the data object and constructs a path
                .attr('d', d3.geoPath().projection(d3.geoMercator()))
                .attr('class', 'pathFill')
                .attr('fill', d => color(colorMapper, d)));
}


const createSVG = () => {

    // create map svg and group
    let map = d3.select('#svg-container').append('svg')
            // 975 by 610 is the default size for rendering a map of the USA
            .attr("viewBox", [0, 0, 975, 610])
            .attr("width", "100%")
           	.append('g');


    return map;
}


var genMapper = () => {
	return d3.scaleLinear().domain([2.85,7.6]).range(["red","green"]);
}


const color = (colorMapper,d) => {
	var name = d['properties']['name'];
	if (data[name] == undefined) {
		console.log(name);
		return "#000000";
	}
	var num = data[name]['score'];
	return colorMapper(num);
}

var svg = createSVG();
btn.addEventListener("click",renderMap);
