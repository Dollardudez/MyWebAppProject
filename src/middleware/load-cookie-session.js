function loadCookieSession(req, res, next){
  var sessionCookie = req.cookies.session;
  var sessionJSON = decodeURIComponent(sessionCookie);
  try{
    var session = JSON.parse(sessionJSON);
    req.session = session;
  }
  catch(err){
    //console.log(err);
  }
  next();
}

module.exports = loadCookieSession;