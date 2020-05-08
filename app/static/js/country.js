var btna = document.getElementById("score");
var btnb = document.getElementById("economy");
var btnc = document.getElementById("family");
var btnd = document.getElementById("health");
var btne = document.getElementById("freedom");
var btnf = document.getElementById("trust");
var btng = document.getElementById("generosity");
var btnh = document.getElementById("other");
var btns = [btna,btnb,btnc,btnd,btne,btnf,btng,btnh];
var sv = document.getElementById("chart");
var map = {"score":0,"economy":1,"family":2,"health":3,"freedom":4,"trust":5,"generosity":6,"other":7};

var render = function(e) {
    console.log(e.target.id);
        var svg = d3.select("svg");
        svg.attr("width",1500);
        svg.attr("height",500);

        margin = 200;
        width = svg.attr("width") - margin;
        height = svg.attr("height") - margin;


        var xScale = d3.scaleBand().range([0, width]).padding(0.05),
                    yScale = d3.scaleLinear().range([height, 0]);

        var g = svg.append("g")
                    .attr("transform", "translate(" + 100 + "," + 100 + ")");

        var data = [];
        for (var l in lis[map[e.target.id]]) {
            add = {};
            add["country"] = l;
            add["value"] = Number(lis[map[e.target.id]][l]);
            data.push(add);
        }
        console.log(data);

        xScale.domain(data.map(function(d) { return d.country; }));
        yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale))
         .selectAll("text")
            .attr("transform", "translate(15,5)rotate(90)")
            .style("text-anchor", "start")


        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return d;
         }).ticks(10));


        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.country); })
         .attr("y", function(d) { return yScale(d.value); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d.value); })
         .attr("fill", function(d) {
            if (d.country == name) {
                return "yellow";
            }
            return "steelblue";
         })
         .attr("id", function(d) { return d.country; });

         for (var x = 0; x < btns.length; x++) {
             btns[x].removeEventListener("click",render);
             btns[x].addEventListener("click",clear);
         }
}

var clear = function(e) {
    sv.innerHTML = "";
    d3.select("svg").attr("height",0).attr("width",0);
    for (var x = 0; x < btns.length; x++) {
        btns[x].removeEventListener("click",clear);
        btns[x].addEventListener("click",render);
    }
}

for (var x = 0; x < btns.length; x++) {
    btns[x].addEventListener("click",render);
}
