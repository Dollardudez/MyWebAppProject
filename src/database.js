const Database = require('better-sqlite3');

/** @module database 
 * Provides access to the better-sqlite3 database object 
 * for the project.
 */
module.exports = new Database('./db/community-chest.sqlite3');