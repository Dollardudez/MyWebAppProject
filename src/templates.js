const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

/** @module templates 
 * This module exports a map of template names to functions used to render Embedded JavaScript Templates found in the templates directory of the project.
 */
var templates = {};

var files = fs.readdirSync('src/templates');
files.forEach(file => {
  // Compile the template file and add it to templates
  const templateString = fs.readFileSync(path.join('src/templates', file), {encoding: "utf8"});
  templates[path.basename(file, '.ejs')] = ejs.compile(templateString);
});

module.exports = templates;