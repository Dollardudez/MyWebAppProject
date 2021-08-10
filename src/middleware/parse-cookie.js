
function parseCookie(req, res, next){
    req.cookies = [];
    var cookieString = req.headers.cookie;
    try{
      var pairStrings = cookieString.split(" ");
      pairStrings.forEach(function(pairString){
        var pair = pairString.split("=");
        var key = pair[0].trim().replace(/[,;]$/,'');;
        var value = pair[1].trim().replace(/[,;]$/,'');;
        req.cookies[key] = value;
      }); 
    }
    catch(e){}
     
  next();
}

module.exports = parseCookie;