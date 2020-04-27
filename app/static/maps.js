var btn = document.getElementById("btn");

var tryfunc = async() => {
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
            .attr("width", "60%")
           	.append('g');
            

    // create legend group inside of map group
    let legend = map.append('g')
        .attr('id', 'legend')
        .attr("width", 325)
        .attr("height", 60)
        .attr('transform', 'translate(570,20)')
        .attr("viewBox", [0, 0, 325, 60]);

    legend.append('g').attr('id', 'legend-colors');
    legend.append('g').attr('id', 'legend-ticks-container');

    return map;
};


var svg = createSVG();
btn.addEventListener("click",tryfunc);