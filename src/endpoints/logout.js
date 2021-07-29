function logout(req, res){
  res.setHeader("Set-Cookie", "session=");
  res.redirect("/");
}

module.exports = logout;