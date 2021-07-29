
function parseCookie(req, res, next){
    req.cookies = [];
    var cookieString = req.headers.cookie;
    var pairStrings = cookieString.split(" ");
    pairStrings.forEach(function(pairString){
      var pair = pairString.split("=");
      var key = pair[0].trim().replace(/[,;]$/,'');;
      var value = pair[1].trim().replace(/[,;]$/,'');;
      req.cookies[key] = value;
    });  
  next();
}

module.exports = parseCookie;