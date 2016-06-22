'use strict';

const fs = require('fs'),
      path = require('path'),
      files = fs.readdirSync(path.join(__dirname));

let routes = files.filter( value => {
  return value.slice(-3) === '.js' && value !== 'index.js';
});

module.exports = routes.map(route => {
  return require(`./${route}`);
});
