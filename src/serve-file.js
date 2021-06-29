const fs = require('fs');
const path = require('path');
const pathToMimeType = require('./path-to-mime-type');


/** @module serveFile 
 * Provides a function for serving files in the public 
 * directory matching the pathname in the req.url 
 * If not found, serves a 404 status code.
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function serveFile(req, res) {
  var pathname = new URL(req.url, 'http://localhost').pathname;
  var filePath = path.join('static', pathname);
  fs.readFile(filePath, function(err, body){
    if(err) {
      console.error(err);
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end();
      return;
    }
    res.setHeader("Content-Length", body.length);
    res.setHeader("Content-Type", pathToMimeType(filePath));
    res.end(body, "utf8");
  });
}



module.exports = serveFile;