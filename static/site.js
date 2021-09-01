

var html = document.getElementById("MapDiv");
var boxArray = [];
const mapdiv = document.getElementById("MapDiv");
fetch('box-locations.json')
.then(response => response.json())
.then(data => {
  for(let i = 0; i < data.length; i++){
    boxArray[i] = data[i];
    let id = boxArray[i].id;
    let name = boxArray[i].name;
    let lat = boxArray[i].lat;
    let lng = boxArray[i].lng;
    var myIMGDiv = document.createElement('div');
    myIMGDiv.className = "EachMapDiv";
    mapdiv.appendChild(myIMGDiv);
    
    var p = document.createElement('p');
    p.className = "Name";
    p.innerHTML = name;
    var myMap = myIMGDiv.appendChild(p);
    
    var aTag = CreateCardLink(id);
    myIMGDiv.appendChild(aTag);

    aTag.appendChild(CreateMapCard(name, `https://open.mapquestapi.com/staticmap/v5/map?key=bHFGwnYDpeEqGPgYbqqmHBr7LuInUuNZ&locations=${lat},${lng}&size=200,200@2x`)); 
    }

});

function CreateMapCard(name, url) {
  var img = document.createElement('img');
  img.src = url;
  img.className = "Map";
  img.innerHTML = name;
  return img;
}

function CreateCardLink(id) {
  var aTag = document.createElement('a');
  var url = `/box-locations/${id}`;
  aTag.href= url;
  return aTag;
}

