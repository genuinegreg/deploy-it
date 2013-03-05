
'use strict';

var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');
var ncf = require('nconf');


// ** Load configuration ***********************************************************
// First consider commandline arguments and environment variables, respectively.
ncf.argv().env();

// Load configuration from a user defined file
ncf.file('user', path.join(process.env.HOME, '.dploy/settings.json'));

// Load configuration from a global defined file
ncf.file('global', '/etc/dploy/settings.json');

// Then load configuration from a default file.
ncf.file('default', path.join(__dirname, 'settings.json'));



// ** Create paths ***********************************************************

// check and create upload path
var uploadPath = ncf.get('paths:upload');
if (!fs.exists(uploadPath)) {
    mkdirp.sync(uploadPath);
}

// check and create unzip path
var unzipPath = ncf.get('paths:unzip');
if (!fs.exists(unzipPath)) {
    mkdirp.sync(unzipPath);
}

//check and create data path
var dataPath = ncf.get('paths:data');
if (!fs.exists(dataPath)) {
    mkdirp.sync(dataPath);
}


module.exports = ncf;