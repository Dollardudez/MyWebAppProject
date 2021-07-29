console.log("Hi");
var myUls = document.getElementsByClassName("loggedIn");
var myUl = myUls[0];
var signInOrOut = document.createElement("li");
myUl.appendChild(signInOrOut);
if(myUl.id === "true"){
  var myAnchor = document.createElement("a");
  myAnchor.innerHTML = "Log Out";
  myAnchor.href = "/logout";
  signInOrOut.appendChild(myAnchor);
}
else{
  var myAnchor = document.createElement("a");
  myAnchor.innerHTML = "Sign In";
  myAnchor.href = "/signin";
  signInOrOut.appendChild(myAnchor);
  var myAnchor2 = document.createElement("a");
  myAnchor2.innerHTML = "Sign Up";
  myAnchor2.href = "/signup";
  signInOrOut.appendChild(myAnchor2);
}

console.log()