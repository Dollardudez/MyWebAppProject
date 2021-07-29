const templates = require('../templates');
const db = require('../database');

function indexPage(req, res) {
    // Create session
  var loggedIn = req.session && true;
  
  var username = loggedIn ? req.session.user.first + " " + req.session.user.last : "Guest";
  if (typeof loggedIn === 'undefined') {
    loggedIn = false;
  }
  
  var navBar = templates['navbar.html']({user: username, LoggedIn: loggedIn.toString()  });
  var indexHtml = templates['index.html']();
  var title = "Index";
  var html = templates['layout.html']({content: indexHtml, navbar: navBar});
  
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}
module.exports = indexPage;