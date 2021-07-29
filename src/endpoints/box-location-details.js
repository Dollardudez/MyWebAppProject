const templates = require('../templates');
const db = require('../database');

function boxDetails(req, res) {
    // Create session
  var loggedIn = req.session && true;
  var username = loggedIn ? req.session.user.first + " " + req.session.user.last : "Guest";
  if (typeof loggedIn === 'undefined') {
    loggedIn = false;
  }
  const id = parseInt(req.params.id, 10);
  
  var box = db.prepare(`SELECT * FROM boxes 
                        WHERE id = ?`).get(id);
  
  var requests = db.prepare(`SELECT * FROM requests 
              WHERE box_id = ?`).all(id);
  
  var users = db.prepare(`SELECT * FROM requests 
              WHERE box_id = ?`).all(id); 
  
  var name = box?.name;
  var lat = box?.lat;
  var lng = box?.lng;
  
  
  var requestList = templates['request-list.html']({requests : requests});
  var navBar = templates['navbar.html']({user: username, LoggedIn: loggedIn.toString() });
  
  if(loggedIn){
    var requestForm = templates['request-form.html']({id : id});
    var boxHtml = templates['box.html']({name : name, lat : lat, lng : lng, requestForm: requestForm, requestList: requestList});
  }
  else{
    var prompt = templates['signin-prompt.html']();
    var boxHtml = templates['box.html']({name : name, lat : lat, lng : lng, requestForm: prompt, requestList: requestList});
  }
  var title = name;
  var html = templates['layout.html']({content: boxHtml, navbar: navBar});
  console.log(req.cookies);
  
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}
module.exports = boxDetails;