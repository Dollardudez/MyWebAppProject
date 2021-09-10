const templates = require('../templates');

module.exports = function(req, res) {
  console.log("am i here?");
  var loggedIn = req.session && true;
  if(loggedIn && req.session.user.admin === 1){
    var username = loggedIn ? req.session.user.first + " " + req.session.user.last : "Guest";
    if (typeof loggedIn === 'undefined') {
      loggedIn = false;
    }
    var navBar = templates['navbar.html']({user: username, LoggedIn: loggedIn.toString(), IsNavIndex: "not-index-page" });
    var form = templates["create-box.html"]();
    var html = templates["layout.html"]({
      title: "Create Box",
      navbar: navBar,
      content: form
    });
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);
  }
  else{
    var loggedIn = req.session && true;
    var username = loggedIn ? req.session.user.first + " " + req.session.user.last : "Guest";
    if (typeof loggedIn === 'undefined') {
      loggedIn = false;
    }
    var navBar = templates['navbar.html']({user: username, LoggedIn: loggedIn.toString(), IsNavIndex: "not-index-page" });
    var form = templates["message.html"]();
    var html = templates["layout.html"]({
      title: "Create Box",
      navbar: navBar,
      content: form
    });
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);
  }
  
}
