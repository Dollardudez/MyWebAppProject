var myUls = document.getElementsByClassName("loggedIn");
var myUl = myUls[0];

if(myUl.id === "true"){
  var signInOrOut = document.createElement("li");
  myUl.appendChild(signInOrOut);
  var myAnchor = document.createElement("a");
  myAnchor.innerHTML = "Log Out";
  myAnchor.href = "/logout";
  signInOrOut.appendChild(myAnchor);
}
else{
  var signInOrOut = document.createElement("li");
  myUl.appendChild(signInOrOut);
  var myAnchor = document.createElement("a");
  myAnchor.innerHTML = "Sign In";
  myAnchor.href = "/signin";
  signInOrOut.appendChild(myAnchor);
  var signInOrOut2 = document.createElement("li");
  myUl.appendChild(signInOrOut2);
  var myAnchor2 = document.createElement("a");
  myAnchor2.innerHTML = "Sign Up";
  myAnchor2.href = "/signup";
  signInOrOut2.appendChild(myAnchor2);
}