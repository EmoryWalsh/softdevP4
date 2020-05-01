var rgn = document.getElementById("regionDropdown");
var ftr = document.getElementById("factorDropdown");

function regAvg(reg, fac){
  var total = 0
  var num = 0
  for country in countries[row[1]]{
    if country['region'] == reg:
      total += countries[row[1]][fac]
      num ++
  }
  return total / num
}

console.log(regAvg('North America', 'Freedom'));
console.log("hi");

function graphRegion(reg){

}

function graphFactor(fac){
}

rgn.addEventListener("click",graphRegion);
ftr.addEventListener("click",graphFactor);
