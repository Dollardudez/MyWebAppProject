const templates = require('../templates');
const db = require('../database');

function boxDetails(req, res) {

  const id = parseInt(req.params.id, 10);
  
  var box = db.prepare(`SELECT * FROM boxes 
                        WHERE id = ?`).get(id);
  
  var requests = db.prepare(`SELECT * FROM requests 
              WHERE box_id = ?`).all(id);
  
  console.log(id);
  var requestList = templates['request-list.html']({requests : requests});
  var navBar = templates['navbar.html']();
  var requestForm = templates['request-form.html']({id : box.id});
  var boxHtml = templates['box.html']({name : box.name, lat : box.lat, lng : box.lng, requestForm: requestForm, requestList: requestList});
  var title = box.name;
  var html = templates['layout.html']({content: boxHtml, navbar: navBar});
  
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}
module.exports = boxDetails;