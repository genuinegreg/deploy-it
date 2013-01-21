'use strict';

// deps
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var i18n = require('i18n');

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

    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // using 'accept-language' header to guess language settings
    app.use(i18n.init);
    app.use(app.router);
    app.use(express['static']('../dist/'));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

// app.get('/', routes.index);
app.get('/users', user.list);

app.get('/view/main', function(req, res, next) {
    res.render('main');
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
