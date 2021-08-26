const templates = require('../templates');

module.exports = function(req, res) {
  var loggedIn = req.session && true;
  var username = loggedIn ? req.session.user.first + " " + req.session.user.last : "Guest";
  if (typeof loggedIn === 'undefined') {
    loggedIn = false;
  }
  var navBar = templates['navbar.html']({user: username, LoggedIn: loggedIn.toString(), IsNavIndex: "not-index-page" });
  var form = templates["signin.html"]({
    errorMessage: ""
  });
  var html = templates["layout.html"]({
    title: "Sign In",
    navbar: navBar,
    content: form
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}
