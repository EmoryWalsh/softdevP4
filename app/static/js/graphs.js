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

/*
function graphRegion(reg){

}

function graphFactor(fac){
}

rgn.addEventListener("click",graphRegion);
ftr.addEventListener("click",graphFactor);*/
