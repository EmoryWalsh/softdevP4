///When choosing a data/graph type

//Data type buttons
var regDataBtn = document.getElementById("regionalData");
var facDataBtn = document.getElementById("factorData");

//Graph type buttons
var barGraphBtn = document.getElementById("barGraph");
var spiderPlotBtn = document.getElementById("spiderPlot");

var dataType = null;
var graphType = null;


function choiceClicks(btn){
  if(btn === "regDataBtn"){
    dataType = "region"
  }
  else if(btn === "facDataBtn"){
    dataType = "factor"
  }
  else if(btn === "barGraphBtn"){
    graphType = "bar"
  }
  else if(btn === "spiderPlotBtn"){
    graphType = "spider"
  }
  //console.log(dataType)
  //console.log(graphType)
  if(dataType != null && graphType != null){
    whichGraph()
  }
}

//Show div with choices for different graphs
function whichGraph(){
  if(dataType === "region"){
    if(graphType ==="spider"){
      document.getElementById("regSpider").style.display = "block";
      document.getElementById("facSpider").style.display = "none";
      document.getElementById("facBar").style.display = "none";
      document.getElementById("regBar").style.display = "none";
      svg_container.innerHTML = ""
    }
    else if(graphType === "bar"){
      document.getElementById("regBar").style.display = "block";
      document.getElementById("facSpider").style.display = "none";
      document.getElementById("regSpider").style.display = "none";
      document.getElementById("facBar").style.display = "none";
      svg_container.innerHTML = ""
    }
  }
  else if(dataType === "factor"){
    if(graphType ==="spider"){
      document.getElementById("facSpider").style.display = "block";
      document.getElementById("regSpider").style.display = "none";
      document.getElementById("facBar").style.display = "none";
      document.getElementById("regBar").style.display = "none";
      svg_container.innerHTML = ""
    }
    else if(graphType === "bar"){
      document.getElementById("facBar").style.display = "block";
      document.getElementById("facSpider").style.display = "none";
      document.getElementById("regSpider").style.display = "none";
      document.getElementById("regBar").style.display = "none";
      svg_container.innerHTML = ""
    }
  }
}


regDataBtn.addEventListener("click", function(){
                                      choiceClicks("regDataBtn")});
facDataBtn.addEventListener("click", function(){
                                      choiceClicks("facDataBtn")});
barGraphBtn.addEventListener("click", function(){
                                      choiceClicks("barGraphBtn")});
spiderPlotBtn.addEventListener("click", function(){
                                      choiceClicks("spiderPlotBtn")});

///This is relevant after a data/graph type is already chosen
var rReg = document.getElementById("rReg");
var rFac = document.getElementById("rFac");

var rColor = {
  'North America' : 'green',
  'Western Europe' : 'blue',
  'Australia and New Zealand' : 'red',
  'Middle East and Northern Africa' : 'yellow',
  'Latin America and Caribbean' : 'purple',
  'Southeastern Asia' : 'pink',
  'Central and Eastern Europe' : 'lightgreen',
  'Eastern Asia' : 'steelblue',
  'Sub-Saharan Africa' : 'orange',
  'Southern Asia' : 'gray'
};

var fColor = {
  'economy' : 'red',
  'family' : 'yellow',
  'health' : 'purple',
  'freedom' : 'blue',
  'trust' : 'green',
  'generosity' : 'orange'
}

//finds the selected radio bubbles for the regions
function regionRadioValues(){
  var els = document.getElementsByName('regions');
  //console.log(els)
  reg = []
  for(i = 0; i < els.length; i++){
    if(els[i].checked)
    reg.push(els[i].value);
  }
  return reg
}

//finds the selected radio bubbles for the factors
function factorRadioValues(){
  var els = document.getElementsByName('factor');
  console.log(els)
  fac = []
  for(i = 0; i < els.length; i++){
    if(els[i].checked){
      fac.push(els[i].value);
      console.log(els[i])
    }
  }
  return fac
}

function regAvg(reg, fac){
  var total = 0;
  var num = 0;
  var country;
//  console.log(data["Denmark"])
  for (country in data){
    if (data[country]['region'] == reg){
      //console.log(data[country][fac]);
      total += parseFloat(data[country][fac]); //need to fins a way to sub in fac
      num ++;
      //console.log(data[country])
    }
  }
  //console.log(total)
  return total / num;
}

var rgData;
function regData(reg){
  rgData = [];
  for(var r = 0; r < reg.length; r++){
    var factors = ['economy', 'family', 'health', 'freedom', 'trust', 'generosity'];
    for (var i = 0; i < 6; i++){
      var name = factors[i];
      factors[name] = regAvg(reg[r], factors[i]);
    }
    rgData.push(factors);
  }
  return factors;
}

var fcData;
function facData(fac){
  fcData = [];
  for(var f = 0; f < fac.length; f++){
    var regions = ['North America', 'Western Europe', 'Australia and New Zealand', 'Middle East and Northern Africa', 'Latin America and Caribbean', 'Southeastern Asia', 'Central and Eastern Europe', 'Eastern Asia', 'Sub-Saharan Africa', 'Southern Asia'];
    for (var i = 0; i < 10; i++){
      var name = regions[i];
      regions[name] = regAvg(regions[i], fac[f]);
    }
    fcData.push(regions);
  }
  return regions;
}

// stores data for region selection for bar graph
var myReg;
var barRegData;
$('#rDrop + [aria-labelledby="rDrop"] a').on('click', function (e) {
  e.preventDefault();
  myReg = this.textContent;
  barRegData = [];
  var factors = ['economy', 'family', 'health', 'freedom', 'trust', 'generosity'];
  for (var i = 0; i < 6; i++){
    var sub = {};
    sub["factor"] = factors[i];
    sub["score"] = regAvg(myReg, factors[i]);
    barRegData.push(sub);
  }
  //console.log(barRegData);
})

// stores data for region selection for bar graph
var myFac;
var barFacData;
$('#fDrop + [aria-labelledby="fDrop"] a').on('click', function (e) {
  e.preventDefault();
  myFac = this.textContent;
  barFacData = [];
  var regions = ['North America', 'Western Europe', 'Australia and New Zealand', 'Middle East and Northern Africa', 'Latin America and Caribbean', 'Southeastern Asia', 'Central and Eastern Europe', 'Eastern Asia', 'Sub-Saharan Africa', 'Southern Asia'];
  for (var i = 0; i < 10; i++){
    var sub = {};
    sub["region"] = regions[i];
    sub["score"] = regAvg(regions[i], myFac);
    barFacData.push(sub);
  }
  //console.log(barFacData);
})

graphFactor = function(e){
  svg_container.innerHTML = ""
  svg = d3.select("#svg_container").append("svg")
    .attr("width", 800)
    .attr("height", 900);
  radialScale = d3.scaleLinear()
    .domain([0,1.5])
    .range([0,300]);
  ticks = [0.3,0.6,0.9,1.2,1.5];
  ticks.forEach(t =>
    svg.append("circle")
    .attr("cx", 400)
    .attr("cy", 400)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("r", radialScale(t))
  );
  ticks.forEach(t =>
    svg.append("text")
    .attr("x", 405)
    .attr("y", 400 - radialScale(t))
    .attr("stroke", "black")
    .text(t.toString())
  );
  //console.log(myFac);
  myFac = factorRadioValues();
  var factors = facData(myFac);
  if(factors){
    for (var i = 0; i < factors.length; i++) {
      let fac_name = factors[i];
      let angle = (Math.PI / 2) + (2 * Math.PI * i / factors.length);
      let line_coordinate = angleToCoordinate(angle, 1.5);
      let label_coordinate = angleToCoordinate(angle, 1.7);

      //draw axis line
      svg.append("line")
      .attr("x1", 400)
      .attr("y1", 400)
      .attr("x2", line_coordinate.x)
      .attr("y2", line_coordinate.y)
      .attr("stroke","black");

      //draw axis label
      svg.append("text")
      .attr("x", label_coordinate.x)
      .attr("y", label_coordinate.y)
      .text(fac_name);
    }
  }

    let line = d3.line()
      .x(d => d.x)
      .y(d => d.y);
    //let colors = ["blue", "green", "red", "yellow", "pink", "purple", "orange", "gray", "light blue", "light green"];

    console.log(fcData);
    for (var i = 0; i < fcData.length; i++){
      let d = fcData[i];
      console.log(d)
      let color = fColor[myFac[i]];
      let coordinates = getPathCoordinates(d, factors);

      //console.log(color);

      //draw the path element
      svg.append("path")
        .datum(coordinates)
        .attr("d",line)
        .attr("stroke-width", 3)
        .attr("stroke", color)
        .attr("fill", color)
        .attr("stroke-opacity", 1)
        .attr("opacity", 0.7);
    }
}

graphRegion = function(e){
  svg_container.innerHTML = ""
  svg = d3.select("#svg_container").append("svg")
    .attr("width", 800)
    .attr("height", 800);
  radialScale = d3.scaleLinear()
    .domain([0,1.5])
    .range([0,300]);
  ticks = [0.3,0.6,0.9,1.2,1.5];
  ticks.forEach(t =>
    svg.append("circle")
      .attr("cx", 400)
      .attr("cy", 400)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("r", radialScale(t))
  );
  ticks.forEach(t =>
    svg.append("text")
      .attr("x", 405)
      .attr("y", 400 - radialScale(t))
      .attr("stroke", "black")
      .text(t.toString())
  );
  //console.log(myReg);
  myReg = regionRadioValues();
  var regions = regData(myReg);
  if(regions){
    for (var i = 0; i < regions.length; i++) {
      let reg_name = regions[i];
      let angle = (Math.PI / 2) + (2 * Math.PI * i / regions.length);
      let line_coordinate = angleToCoordinate(angle, 1.5);
      let label_coordinate = angleToCoordinate(angle, 1.7);

      //draw axis line
      svg.append("line")
      .attr("x1", 400)
      .attr("y1", 400)
      .attr("x2", line_coordinate.x)
      .attr("y2", line_coordinate.y)
      .attr("stroke","black");

      //draw axis label
      svg.append("text")
      .attr("x", label_coordinate.x)
      .attr("y", label_coordinate.y)
      .text(reg_name);
    }
  }

    let line = d3.line()
      .x(d => d.x)
      .y(d => d.y);
    //let colors = ["blue", "green", "red", "yellow", "pink", "purple"];

    //console.log(rgData);
    for (var i = 0; i < rgData.length; i++){
      let d = rgData[i];
      //console.log(rColor[myReg[i]])
      let color = rColor[myReg[i]];
      let coordinates = getPathCoordinates(d, regions);

      //console.log(color);

      //draw the path element
      svg.append("path")
        .datum(coordinates)
        .attr("d",line)
        .attr("stroke-width", 3)
        .attr("stroke", color)
        .attr("fill", color)
        .attr("stroke-opacity", 1)
        .attr("opacity", 0.7);
    }
}

//maps onto polar graph / converts
function angleToCoordinate(angle, value){
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return {"x": 400 + x, "y": 400 - y};
}

//calculates coordinates of each data point
function getPathCoordinates(data_point, data){
    var coordinates = [];
    for (var i = 0; i < data.length; i++){
        var fac_name = data[i];
        var angle = (Math.PI / 2) + (2 * Math.PI * i / data.length);
        coordinates.push(angleToCoordinate(angle, data_point[fac_name]));
    }
    return coordinates;
}

facBarGraph = function(e){
  svg_container.innerHTML = ""
  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 250, left: 20},
      width = 400,
      height = 500;

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("#svg_container").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data in the domains
    x.domain(barFacData.map(function(d) { return d.region; }));
    y.domain([0, d3.max(barFacData, function(d) { return d.score; })]);

    // append the rectangles for the bar chart
    console.log(barFacData)
    svg.selectAll(".bar")
        .data(barFacData)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.region))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.score))
        .attr("height", d => height - y(d.score));

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(15,5)rotate(90)")
          .style("text-anchor", "start")
          .attr("font-size", "16px")

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
}

regBarGraph = function(e){
  svg_container.innerHTML = ""
  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 120, left: 20},
      width = 400,
      height = 400;

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("#svg_container").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data in the domains
    x.domain(barRegData.map(function(d) { return d.factor; }));
    y.domain([0, d3.max(barRegData, function(d) { return d.score; })]);

    // append the rectangles for the bar chart
    //console.log(barRegData)
    svg.selectAll(".bar")
        .data(barRegData)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.factor))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.score))
        .attr("height", d => height - y(d.score))

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(15,7)rotate(90)")
          .style("text-anchor", "start")
          .attr("font-size", "18px")

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
}

rReg.addEventListener("click",graphRegion);
rFac.addEventListener("click",graphFactor);
rRegDrop.addEventListener("click",regBarGraph);
rFacDrop.addEventListener("click",facBarGraph);
