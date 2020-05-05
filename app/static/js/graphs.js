var rReg = document.getElementById("rReg");
var rFac = document.getElementById("rFac");

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

// stores region selection
/*var myReg;
$('#regionDropdown + [aria-labelledby="regionDropdown"] a').on('click', function (e) {
  e.preventDefault();
  // get selected option and change background
  myReg = this.textContent;
  //console.log(myReg.textContent);
})*/

// stores factor selection
/*var myFac;
$('#factorDropdown + [aria-labelledby="factorDropdown"] a').on('click', function (e) {
  e.preventDefault();
  // get selected option and change background
  myFac = this.textContent;
  //console.log(myFac.textContent);
})*/

graphFactor = function(e){
  svg1.innerHTML = ""
  svg = d3.select("#svg1").append("svg")
    .attr("width", 500)
    .attr("height", 500);
  radialScale = d3.scaleLinear()
    .domain([0,1.5])
    .range([0,200]);
  ticks = [0.3,0.6,0.9,1.2,1.5];
  ticks.forEach(t =>
    svg.append("circle")
    .attr("cx", 200)
    .attr("cy", 200)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("r", radialScale(t))
  );
  ticks.forEach(t =>
    svg.append("text")
    .attr("x", 205)
    .attr("y", 200 - radialScale(t))
    .attr("stroke", "black")
    .text(t.toString())
  );
  //console.log(myFac);
  myFac = factorRadioValues();
  var factors = facData(myFac);
  for (var i = 0; i < factors.length; i++) {
    let fac_name = factors[i];
    let angle = (Math.PI / 2) + (2 * Math.PI * i / factors.length);
    let line_coordinate = angleToCoordinate(angle, 1.5);
    let label_coordinate = angleToCoordinate(angle, 1.7);

    //draw axis line
    svg.append("line")
    .attr("x1", 200)
    .attr("y1", 200)
    .attr("x2", line_coordinate.x)
    .attr("y2", line_coordinate.y)
    .attr("stroke","black");

    //draw axis label
    svg.append("text")
    .attr("x", label_coordinate.x)
    .attr("y", label_coordinate.y)
    .text(fac_name);
  }

    let line = d3.line()
      .x(d => d.x)
      .y(d => d.y);
    let colors = ["blue", "green", "red"];

    console.log(fcData);
    for (var i = 0; i < fcData.length; i++){
      let d = fcData[i];
      console.log(d)
      let color = colors[i];
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
        .attr("opacity", 0.5);
    }
}

graphRegion = function(e){
  svg2.innerHTML = ""
  svg = d3.select("#svg2").append("svg")
    .attr("width", 500)
    .attr("height", 500);
  radialScale = d3.scaleLinear()
    .domain([0,1.5])
    .range([0,200]);
  ticks = [0.3,0.6,0.9,1.2,1.5];
  ticks.forEach(t =>
    svg.append("circle")
    .attr("cx", 200)
    .attr("cy", 200)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("r", radialScale(t))
  );
  ticks.forEach(t =>
    svg.append("text")
    .attr("x", 205)
    .attr("y", 200 - radialScale(t))
    .attr("stroke", "black")
    .text(t.toString())
  );
  //console.log(myReg);
  myReg = regionRadioValues();
  var regions = regData(myReg);
  for (var i = 0; i < regions.length; i++) {
    let reg_name = regions[i];
    let angle = (Math.PI / 2) + (2 * Math.PI * i / regions.length);
    let line_coordinate = angleToCoordinate(angle, 1.5);
    let label_coordinate = angleToCoordinate(angle, 1.7);

    //draw axis line
    svg.append("line")
    .attr("x1", 200)
    .attr("y1", 200)
    .attr("x2", line_coordinate.x)
    .attr("y2", line_coordinate.y)
    .attr("stroke","black");

    //draw axis label
    svg.append("text")
    .attr("x", label_coordinate.x)
    .attr("y", label_coordinate.y)
    .text(reg_name);
  }

    let line = d3.line()
      .x(d => d.x)
      .y(d => d.y);
    let colors = ["blue", "green", "red"];

    console.log(rgData);
    for (var i = 0; i < rgData.length; i++){
      let d = rgData[i];
      let color = colors[i];
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
        .attr("opacity", 0.5);
    }
}

//maps onto polar graph / converts
function angleToCoordinate(angle, value){
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return {"x": 200 + x, "y": 200 - y};
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

rReg.addEventListener("click",graphRegion);
rFac.addEventListener("click",graphFactor);
