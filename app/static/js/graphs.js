var rgn = document.getElementById("regionDropdown");
var ftr = document.getElementById("factorDropdown");

function regAvg(reg, fac){
  var total = 0;
  var num = 0;
  var country;
  var name;
  for (country in data){
    name = country['name'];
    if (data[name]['region'] == reg){
      total += country[fac]; //need to find a way to sub in fac
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
