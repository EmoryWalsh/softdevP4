var rgn = document.getElementById("regionDropdown");
var ftr = document.getElementById("factorDropdown");


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

rgData = [];
function regData(reg){
  var factors = ['economy', 'family', 'health', 'freedom', 'trust', 'generosity', 'other'];
  for (var i = 0; i < 7; i++){
    var point = {};
    factors.forEach(f => point[f] = regAvg(reg,factors[i]));
    rgData.push(point);
  }
  return factors;
}

function facData(fac){
  fcData = [];
  var regions = ['North America', 'Western Europe', 'Australia and New Zealand', 'Middle East and Northern Africa', 'Latin America and Caribbean', 'Southeastern Asia', 'Central and Eastern Europe', 'Eastern Asia', 'Sub-Saharan Africa', 'Southern Asia'];
  for (var i = 0; i < 10; i++){
    var point = {};
    regions.forEach(f => point[f] = regAvg(regions[i], fac));
    fcData.push(point);
  }
  return regions;
}

// stores region selection
var myReg;
$('#regionDropdown + [aria-labelledby="regionDropdown"] a').on('click', function (e) {
  e.preventDefault();
  // get selected option and change background
  myReg = this;
  console.log(myReg.textContent);
})

// stores factor selection
var myFac;
$('#factorDropdown + [aria-labelledby="factorDropdown"] a').on('click', function (e) {
  e.preventDefault();
  // get selected option and change background
  myFac = this;
  console.log(myFac.textContent);
})

graphFactor = function(e){
  svg = d3.select("body").append("svg")
    .attr("width", 600)
    .attr("height", 600);
  radialScale = d3.scaleLinear()
    .domain([0,1.5])
    .range([0,250]);
  ticks = [0.3,0.6,0.9,1.2,1.5];
  ticks.forEach(t =>
    svg.append("circle")
    .attr("cx", 300)
    .attr("cy", 300)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("r", radialScale(t))
  );
  ticks.forEach(t =>
    svg.append("text")
    .attr("x", 305)
    .attr("y", 300 - radialScale(t))
    .attr("stroke", "white")
    .text(t.toString())
  );
  var factors = facData(myFac)
  for (var i = 0; i < factors.length; i++) {
    let fac_name = factors[i];
    let angle = (Math.PI / 2) + (2 * Math.PI * i / factors.length);
    let line_coordinate = angleToCoordinate(angle, 1.5);
    let label_coordinate = angleToCoordinate(angle, 1.7);

    //draw axis line
    svg.append("line")
    .attr("x1", 300)
    .attr("y1", 300)
    .attr("x2", line_coordinate.x)
    .attr("y2", line_coordinate.y)
    .attr("stroke","black");

    //draw axis label
    svg.append("text")
    .attr("x", label_coordinate.x)
    .attr("y", label_coordinate.y)
    .text(fac_name);

    line = d3.line()
      .x(d => d.x)
      .y(d => d.y);
    colors = ["darkorange", "gray", "navy"];
  }
  for (var i = 0; i < rgData.length; i ++){
    let d = rgData[i];
    let color = colors[i];
    let coordinates = getPathCoordinates(d, factors);

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
    return {"x": 300 + x, "y": 300 - y};
}

//calculates coordinates of each data point
function getPathCoordinates(data_point, data){
    var coordinates = [];
    for (var i = 0; i < factors.length; i++){
        var fac_name = factors[i];
        var angle = (Math.PI / 2) + (2 * Math.PI * i / factors.length);
        coordinates.push(angleToCoordinate(angle, data_point[fac_name]));
    }
    return coordinates;
}

graphRegion = function(e){
}

rgn.addEventListener("click",graphRegion);
ftr.addEventListener("click",graphFactor);
