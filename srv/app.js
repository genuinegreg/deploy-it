'use strict';

// deps
var express = require('express');
var http = require('http');
var i18n = require('i18n');

// routes
var uploadRoute = require('./routes/upload');
var apiRoute = require('./routes/api');

// config
var ncf = require('./etc/nconfLoader');

// config i18n
i18n.configure({
    locales: ['en', 'fr']
});


// start server
var app = express();

// config i18n helpers
app.locals({
    __: i18n.__,
    __n: i18n.__n
});

app.configure(function() {

    app.set('port', ncf.get('server:port'));
    app.set('json replacer', '1234');

    app.use(express.favicon());
});

app.configure('development', function() {
    app.use(express.logger('dev'));
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", 'http://paprika.dev:3501');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    app.use(express['static']('../app/'));
});

app.configure('production', function() {
    app.use(express.logger(':req[X-Real-IP] - - [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));
    app.use(express['static']('../dist/'));
});

app.configure(function() {

    // serve static data
    app.use(express['static'](ncf.get('paths:data')));

    app.use(express.bodyParser({
        uploadDir: ncf.get('paths:upload')
    }));
    app.use(express.methodOverride());

    // using 'accept-language' header to guess language settings
    app.use(i18n.init);
    app.use(app.router);
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

/**
 * Upload handler
 */
app.post('/app.json/upload', uploadRoute.upload);
app.get('/app.json/list', apiRoute.appList);
app.get('/app.json/info/:id', apiRoute.appInfo);

app.post('user.json/create', apiRoute.userCreate);
app.post('user.json/login', apiRoute.userLogin);






app.all('/*', function(req, res, next) {
    res.end();
});

exports.app = app;
