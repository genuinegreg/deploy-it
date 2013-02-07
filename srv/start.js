"use strict";


var conf = require("./etc/config.json");
var app = require('./app.js').app;
var http = require('http');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');


if (!fs.exists(conf.paths.upload)) {
    mkdirp.sync(conf.paths.upload);
}
if (!fs.exists(conf.paths.unzip)) {
    mkdirp.sync(conf.paths.unzip);
}
if (!fs.exists(conf.paths.data)) {
    mkdirp.sync(conf.paths.data);
}


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});