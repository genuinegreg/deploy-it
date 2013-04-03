'use strict';

// deps
var express = require('express');
var i18n = require('i18n');
require('./lib/response');

// routes
var uploadRoute = require('./routes/upload');
var apiRoute = require('./routes/api');

// middleware
var middleware = require('./lib/middleware');

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

app.configure(function () {

    app.set('port', ncf.get('server:port'));

    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.use(express.favicon());
});

app.configure('development', function () {

    if (!ncf.get('logger:disable')) {
        app.use(express.logger('dev'));
    }
    app.use(express['static']('../app/'));
});

app.configure('production', function () {

    if (!ncf.get('logger:disable')) {
        app.use(express.logger(':req[X-Real-IP] - - [:date] \':method :url HTTP/:http-version\' :status :res[content-length] \':referrer\' \':user-agent\''));
    }
    app.use(express['static']('../dist/'));
});

app.configure(function () {

    // dploy middlewares
    app.use(middleware.cors);
    app.use(middleware.checkRequestHeaders);

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

app.configure('development', function () {
    app.use(express.errorHandler());
});


/**
 * Install page
 */
app.get(/^\/((?:[0-9a-z]{8})+)$/, function (req, res) {

    res.render('download', {
        staticUrl: ncf.get('urls:static'),
        hash: req.params[0],
        version: '1.0',
        minos: '5.1',
        size: '2.8mb',
        bundleid: 'com.awesome.app',
        profileExpiration: '12/08/2014',
        uploadDate: '20/02/2013'
    });
});

/**
 * Apis
 */
app.post('/app.json/upload', uploadRoute.upload);
app.get('/app.json/list', apiRoute.appList);
app.get('/app.json/info/:id', apiRoute.appInfo);

//app.get('user.json/identity/:hash', apiRoute.getIdentity);
app.post('/user.json/signin', apiRoute.signin);
app.post('/user.json/login', apiRoute.login);
app.post('/user.json/logout', apiRoute.logout);

exports.app = app;
