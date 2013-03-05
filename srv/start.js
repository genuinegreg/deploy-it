'use strict';


// dependencies
var http = require('http');

// require app
var app = require('./app.js').app;


// start server
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.settings.env);
});