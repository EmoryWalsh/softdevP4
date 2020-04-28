var btn = document.getElementById("btn");

var renderMap = async() => {
	var world = await d3.json('/static/data/countries-10m.json');
	var pathData = topojson.feature(world,world.objects.countries).features;


	svg.selectAll(".pathFill")
        .data(pathData)
        .join(
            enter => enter.append('path')
                // d3.geoPath() gets the coordinates from the data object and constructs a path
                .attr('d', d3.geoPath().projection(d3.geoMercator())));
}


const createSVG = () => {

    // create map svg and group
    let map = d3.select('#svg-container').append('svg')
            // 975 by 610 is the default size for rendering a map of the USA
            .attr("viewBox", [0, 0, 975, 610])
            .attr("width", "100%")
           	.append('g');


    return map;
};


var svg = createSVG();
btn.addEventListener("click",renderMap);
