//Get all boxes from database
//Turn that array into a JSON string, then we will serve that JSON string

//Set content type = "application/json"

const templates = require('../templates');
const db = require('../database');

/** @function showPost 
 * Serves the specified post as a resonse.  The post id should be in req.params.id
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function boxLocations(req, res) {
  var boxes = db.prepare("SELECT * FROM boxes;").all();
  var boxesJSON = JSON.stringify(boxes);

  // Serve the JSON
  res.setHeader('Content-Type', "application/json");
  res.setHeader('Content-Length', boxesJSON.length);
  res.end(boxesJSON);
}

module.exports = boxLocations;