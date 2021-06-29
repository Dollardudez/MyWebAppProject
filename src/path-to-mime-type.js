const path = require('path');

/** @function pathToMimeType 
 * Converts the supplied file path string to 
 * the corresponding MIME-TYPE 
 * @param {string} path - the file path
 * @returns {string} the corresponding MIME-TYPE
 */
function pathToMimeType(filePath) {
  // Get the extension
  var extension = path.extname(filePath);
  // Return the MIME type
  switch(extension) {
    case ".html": 
      console.log("html");
      return "text/html";
    case ".css":
      console.log("css");
      return "text/css";
    case ".js":
      console.log("js");
      return "text/javascript";
    case ".json":
      return "application/json";
    case ".mov":
      return "video/quicktime";
    case ".mp4":
      return "video/mp4";
    default:
      return "application/octet-stream";
  }
}

module.exports = pathToMimeType;