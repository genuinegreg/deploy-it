'use strict';


// dependencies
var http = require('http');
var fs = require('fs');
var mkdirp = require('mkdirp');

// load config
var ncf = require('./etc/nconfLoader');

// require app
var app = require('./app.js').app;


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


// start server
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.settings.env);
});