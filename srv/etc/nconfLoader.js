
'use strict';

var path = require('path');
var ncf = require('nconf');

// First consider commandline arguments and environment variables, respectively.
ncf.argv().env();

// Load configuration from a user defined file
ncf.file('user', path.join(process.env.HOME, '.dploy/settings.json'));

// Load configuration from a global defined file
ncf.file('global', '/etc/dploy/settings.json');

// Then load configuration from a default file.
console.log(path.join(__dirname, 'settings.json'));
ncf.file('default', path.join(__dirname, 'settings.json'));




module.exports = ncf;