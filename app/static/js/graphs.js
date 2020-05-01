var rgn = document.getElementById("regionDropdown");
var ftr = document.getElementById("factorDropdown");

function regAvg(reg, fac){
  var total = 0;
  var num = 0;
  var country;
  for (country in data['properties']['name']){
    if (data[name]['region'] == reg){
      total += data[name][fac]; //need to fins a way to sub in fac
      num ++;
    }
  }
  return total / num;
}

console.log(regAvg('North America', 'Freedom'));
console.log("hi");
/*
function graphRegion(reg){

}

function graphFactor(fac){
}

rgn.addEventListener("click",graphRegion);
ftr.addEventListener("click",graphFactor);*/
