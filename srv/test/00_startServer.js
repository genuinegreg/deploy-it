'use strict';


// dependencies
var http = require('http');

var ncf = require('../etc/nconfLoader');
ncf.set('db:database', 'dploy-test');
ncf.set('logger:disable', true);

var testTools = require('./01_testTools.js');

before(function (done) {
    testTools.dropDb(done);
});


before(function (done) {

    // require app
    var app = require('../app.js').app;

    app.set('port', 3005);

    // start server
    http.createServer(app).listen(app.get('port'), function () {
        done();
    });
});

after(function (done) {
    testTools.dropDb(done);
});