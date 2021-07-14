//Get request data from the formconst db = require('../src/database');
const sanitizeHTML = require('sanitize-html');
const db = require('../database');


/** @function createPost()
 * Creates a new post using the supplied form data
 */
function createRequest(req, res) {
  var box_id = req.params.id;
  var request = req.body.content;
  console.log(req.params);
  // Publish the post to the database
  var info = db.prepare("INSERT INTO requests (box_id, request, fulfilled) VALUES (?, ?, ?)").run(box_id, request, 0);
  console.log(req.params);
  // Determine if the write succeeded
  if(info.changes !== 1) return serveError(req, res, 500, "Unable to write to database");
    request = sanitizeHTML(request);
    if(!request) return serveError(req, res, 422, "Empty request encountered");
  // Redirect to the read page for the post
  res.statusCode = 302;
  res.setHeader("Location", `/box-locations/${box_id}`)
  res.end();
}

module.exports = createRequest;