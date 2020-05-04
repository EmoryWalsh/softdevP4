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
  var arr = new Array(regAvg(reg,'economy'), regAvg(reg,'family'), regAvg(reg,'health'), regAvg(reg,'freedom'), regAvg(reg,'trust'), regAvg(reg,'generosity'), regAvg(reg,'other'));
  return arr;
}

//console.log(regAvg('North America', 'freedom'));
//console.log("hi");
var myReg = rgn.options[rgn.selectedIndex].text;

graphRegion = function(e){
  data = [{
  type: 'scatterpolar',
  r: regData(myReg),
  theta: ['economy','family','health', 'freedom', 'trust', 'generosity', 'other'],
  fill: 'toself'
}]

layout = {
  polar: {
    radialaxis: {
      visible: true,
      range: [0, 1]
    }
  },
  showlegend: false
}

Plotly.newPlot("myDiv", data, layout)

}

function graphFactor(fac){
}

rgn.addEventListener("click",graphRegion;
ftr.addEventListener("click",graphFactor;
