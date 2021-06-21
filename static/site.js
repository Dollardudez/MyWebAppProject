var boxArray = [];
const mapdiv = document.getElementById("MapDiv");
fetch('static/box-locations.json')
.then(response => response.json())
.then(data => {
  for(let i = 0; i < data.length; i++){
    boxArray[i] = data[i];
    let name = boxArray[i].name;
    let lat = boxArray[i].lat;
    let lng = boxArray[i].lng;
    console.log(boxArray[i].name);
    mapdiv.appendChild(CreateElement(name, `https://open.mapquestapi.com/staticmap/v5/map?key=bHFGwnYDpeEqGPgYbqqmHBr7LuInUuNZ&locations=${lat},${lng}&size=200,200@2x`)); 
  }
  
});

function CreateElement(name, url) {
  var img = document.createElement('img');
  img.src = url;
  img.className = "Map";
  img.innerHTML = name;
  return img;
}

window.onload = function() {
  let mapdiv = document.getElementById("MapDiv");
  for(let i = 0; i < boxArray.length; i++){
    let name = boxArray[i].name;
    let lat = boxArray[i].lat;
    let lng = boxArray[i].lng;
    console.log(boxArray[i].name);
    //mapdiv.appendChild(CreateElement(name, `https://open.mapquestapi.com/staticmap/v5/map?key=bHFGwnYDpeEqGPgYbqqmHBr7LuInUuNZ&locations=${lat},${lng}&size=200,200@2x`)); 
  }
}
