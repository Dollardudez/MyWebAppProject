const templates = require('../templates');

module.exports = function(req, res) {
  var loggedIn = req.session && true;
  var username = loggedIn ? req.session.user.first + " " + req.session.user.last : "Guest";
  if (typeof loggedIn === 'undefined') {
    loggedIn = false;
  }
  var navBar = templates['navbar.html']({user: username, LoggedIn: loggedIn.toString() });
  var form = templates["signup.html"]({
    errorMessage: ""
  });
    // Create session

  console.log(req.cookies);

  var html = templates["layout.html"]({
    title: "Sign Up",
    navbar: navBar,
    content: form
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}