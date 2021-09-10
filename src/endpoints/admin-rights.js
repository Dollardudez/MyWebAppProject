const templates = require('../templates');
const db = require('../database');

  
function adminRights(req, res) {
    // Create session
  var loggedIn = req.session && true;
  if(loggedIn){
      var username = req.session.user.first + " " + req.session.user.last;
      var userId = req.session.user.id;
  }
  else{
      var username = "Guest";
  }
  var username = loggedIn ? req.session.user.first + " " + req.session.user.last : "Guest";
  if (typeof loggedIn === 'undefined') {
    loggedIn = false;
  }  
  
  var boxes = db.prepare(`
    SELECT boxes.id, boxes.name, COUNT(requests.id) as requests
    FROM boxes 
    LEFT JOIN requests ON boxes.id = requests.box_id
    GROUP BY boxes.id;`).all();
  
  console.log(boxes);
  var users = db.prepare(`SELECT * FROM users `).all(); 
  
  var navBar = templates['navbar.html']({user: username, LoggedIn: loggedIn.toString(), IsNavIndex: "not-index-page" });
  var adminTemplate = templates['admin-rights.html']({boxes: boxes, users: users});
  var html = templates['layout.html']({content: adminTemplate, navbar: navBar, IsNavIndex: "not-index-page"});
  
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}
module.exports = adminRights;
  
