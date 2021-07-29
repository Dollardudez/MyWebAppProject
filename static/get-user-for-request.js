const db = require('../database');


export function getRequestUser(userId) {
  var user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
  console.log("am i here?");
  return user;
}
var requestId = db.prepare("SELECT * FROM requests WHERE id = ?").get(itemId).id;

export function getRequestId(itemId) {
  var requestId = db.prepare("SELECT * FROM requests WHERE id = ?").get(itemId).id;
  console.log("am i at request?");
  return requestId.id;
}