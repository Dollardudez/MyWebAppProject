const querystring = require('querystring');
const serveError = require('../serve-error.js');

/** @function loadBody 
 * Loads and parses the request body, attaching it as a JavaScript object 
 * to the `req` parameter
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 * @param {function} next - a callback to trigger after the body has loaded
 */
function loadBody(req, res, next) {
  var chunks = [];
  
  // listen for data events
  req.on('data', (chunk) => {
    chunks.push(chunk);
  });
  
  // listen for end events
  req.on('end', () => {
    var data = Buffer.concat(chunks);
    var encoding = req.headers['content-type'];
    switch(encoding.split(';')[0]) {
      case 'application/x-www-form-urlencoded':
        req.body = querystring.parse(data.toString());
        console.log(req.body);
        next();
        break;
      case 'multipart/form-data':
         try {
           var match = /boundary=(.+)$/.exec(req.headers["content-type"]);
           var boundary = match[1];
           req.body = parseMultipart(data, boundary);
           next();
         } catch(err) {
           serveError(req, res, 422, err);
         }
        break;
      case 'text/plain':
        req.body = data.toString();
        next();
        break;
      case 'application/json':
        try {
          req.body = JSON.parse(data.toString());
          next();
        } catch(err) {
          serveError(req, res, 400, err);
        }
        break
      default:
        serveError(req, res, 501, `Body Content-Type ${encoding} not supported`);
    }
  });
  
  // listen for error events
  req.on('error', (err) => {
    serveError(req, res, 400, err);
  });
}

module.exports = loadBody;


/** @function splitContentParts
 * Splits a multipart body into the individual content
 * parts using the supplied boundary bytes.
 * @param {Buffer} buffer - the multipart body to split
 * @param {String} boundary - the bytes that separate content parts in the buffer
 * @returns {Buffer[]} contentParts  - the separated content parts as a buffer array
 */
function splitContentParts(buffer, boundary) {
  var parts = [];
  var boundaryBytes = '--' + boundary;
  var start = buffer.indexOf(boundaryBytes) + boundaryBytes.length;
  var end = buffer.indexOf(boundaryBytes, start);
  // invariant: the bytes between start and end
  // in buffer compose a content part. The value of
  // end must therefore be greater than start,
  // and both must fall between [0,buffer.length]
  while(end != -1) {
    parts.push(buffer.slice(start, end - 2));
    start = end + boundaryBytes.length;
    end = buffer.indexOf(boundaryBytes, start);
  }     
  return parts;
}

/** @function parseContentPart 
 * @param {contentBuffer} content - the content part to parse 
 * @returns {object} an object with head and body properties
 */
function parseContentPart(contentBuffer) {
  const separator = Buffer.from([0x0D,0x0A,0x0D,0x0A]);
  var index = contentBuffer.indexOf(separator);
  var head = contentBuffer.slice(0, index).toString();
  var body = contentBuffer.slice(index + 4);
  var nameMatch = /name="([^"]+)"/.exec(head);
  var filenameMatch = /filename="([^"]+)"/.exec(head);
  if(filenameMatch) {
    // content part is a file input field
    var contentTypeMatch = /Content-Type:\s?(\S+)/.exec(head);
    var contentType = contentTypeMatch && contentTypeMatch[1] ? contentTypeMatch[1] : 'application/octet-stream'
    return { 
      [nameMatch[1]]: {
        filename: filenameMatch[1],
        contentType: contentTypeMatch[1],
        data: body
      }
    };
  } else {
    // content part is a non-file input field
    return {[nameMatch[1]]: body.toString()};    
  }
}

/** @function parseMultipart
 * Parses a buffer encoded using `multipart/form-data` encoding and 
 * returns it as an object of key/value pairs
 * @param {Buffer} buffer - the buffer of multipart data 
 * @param {string} boundary - the boundary bytes separating the parts 
 * @return {object} the field data as a JavaScript object
 */
function parseMultipart(buffer, boundary) {
  // TODO: Parse the multipart buffer and return its input data as an object  
  var body = {};
  var partBuffers = splitContentParts(buffer, boundary);
  partBuffers.forEach(partBuffer => {
    var inputData = parseContentPart(partBuffer);
    Object.assign(body, inputData);
  });
  return body;
}