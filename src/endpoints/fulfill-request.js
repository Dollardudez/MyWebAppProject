//Get request data from the formconst db = require('../src/database');
const db = require('../database');


/** @function createPost()
 * Creates a new post using the supplied form data
 */
function fulfillRequest(req, res) {
  var box_id = req.params.id;
  var request_id = req.params.request_id;
  var request = db.prepare("UPDATE requests SET fulfilled = 1 WHERE id = ?").run(request_id);
 
  if(request.changes !== 1) return serveError(req, res, 500, "Unable to write to database");
  // Redirect to the read page for the post
  res.statusCode = 302;
  res.setHeader("Location", `/box-locations/${box_id}`);
  res.end();
}

module.exports = fulfillRequest;