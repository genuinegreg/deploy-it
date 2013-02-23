'use strict';

// deps
var express = require('express');
var upload = require('./routes/upload');
var apiJson = require('./routes/api');
var http = require('http');
var i18n = require('i18n');

var conf = require('./etc/config.json');

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

    app.set('port', process.env.PORT || conf.http.port);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.use(express.favicon());
});

app.configure('development', function() {
    app.use(express.logger('dev'));
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
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
    app.use(express['static'](conf.paths.data, {
        maxAge: 1000 * 60 * 60 * 24 * 30 * 10
    }));

    app.use(express.bodyParser({
        uploadDir: conf.paths.upload
    }));
    app.use(express.methodOverride());

    // using 'accept-language' header to guess language settings
    app.use(i18n.init);
    app.use(app.router);
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

app.get('/view/main', function(req, res, next) {
    res.render('main');
});

/**
 * Upload handler
 */
 app.post('/upload', upload.upload);
 app.all('/upload', function(req, res) {
    res.end();
});

//app.post('/json', )

/**
 * Download handlers
 */
 app.get('/:hash', upload.downloadHtml);


 exports.app = app;
