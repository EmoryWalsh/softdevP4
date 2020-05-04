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

console.log(regAvg('North America', 'freedom'));
//console.log("hi");


function graphRegion(reg){
  var data = [
  {
    className: reg,
    axes: [
      {axis: "economy", value: regAvg(reg, 'economy')},
      {axis: "family", value: regAvg(reg, 'family')},
      {axis: "health", value: regAvg(reg, 'health')},
      {axis: "freedom", value: regAvg(reg, 'freedom')},
      {axis: "trust", value: regAvg(reg, 'trust')},
      {axis: "generosity", value: regAvg(reg, 'generosity')},
      {axis: "other", value: regAvg(reg, 'other')}
    ]
    },
  ];
  /*
  return data.map(function(d) {
    return {
      className: d.className,
      axes: d.axes.map(function(axis) {
        return {axis: axis.axis, value: Math.ceil(Math.random() * 10)};
      })
    };
  });*/
}

function graphFactor(fac){
}

rgn.addEventListener("click",graphRegion);
ftr.addEventListener("click",graphFactor);
