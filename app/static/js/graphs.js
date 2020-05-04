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

function regData(reg){
  var dict = {};
  dict['economy'] = regAvg(reg,'economy');
  dict['family'] = regAvg(reg,'family');
  dict['health'] = regAvg(reg,'health');
  dict['freedom'] = regAvg(reg,'freedom');
  dict['trust'] = regAvg(reg,'trust');
  dict['generosity'] = egAvg(reg,'generosity');
  dict['other']  = regAvg(reg,'other');
  return dict;
}

function facData(fac){
  var dict = {};
  dict['North America'] = regAvg('North America',fac);
  dict['Western Europe'] = regAvg('Western Europe',fac);
  dict['Australia and New Zealand'] = regAvg('Australia and New Zealand',fac);
  dict['Middle East and Northern Africa'] = regAvg('Middle East and Northern Africa',fac);
  dict['Latin America and Caribbean'] = regAvg('Latin America and Caribbean',fac);
  dict['Southeastern Asia'] = regAvg('Southeastern Asia',fac);
  dict['Central and Eastern Europe'] = regAvg('Central and Eastern Europe',fac);
  dict['Eastern Asia'] = regAvg('Eastern Asia',fac);
  dict['Sub-Saharan Africa'] = regAvg('Sub-Saharan Africa',fac);
  dict['Southern Asia'] = regAvg('Southern Asia',fac);
  return dict;
  var arr = new Array(regAvg('North America',fac), regAvg('Western Europe',fac), regAvg('Australia and New Zealand',fac), regAvg('Middle East and Northern Afric',fac), regAvg('Latin America and Caribbean',fac), regAvg("Southeastern Asia",fac), regAvg('Central and Eastern Europe',fac), regAvg('Eastern Asia',fac), regAvg('Sub-Saharan Africa',fac), regAvg('Southern Asia',fac));
  return arr;
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
  }
}

//maps onto polar graph / converts
function angleToCoordinate(angle, value){
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return {"x": 300 + x, "y": 300 - y};
}

graphRegion = function(e){
}

rgn.addEventListener("click",graphRegion);
ftr.addEventListener("click",graphFactor);
