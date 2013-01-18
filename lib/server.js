//  ____             _             ___ _
// |  _ \  ___ _ __ | | ___  _   _|_ _| |_
// | | | |/ _ \ '_ \| |/ _ \| | | || || __|
// | |_| |  __/ |_) | | (_) | |_| || || |_
// |____/ \___| .__/|_|\___/ \__, |___|\__|
//            |_|            |___/

"use strict";

var express = require('express');
var fineuploaderExpressMiddleware = require('fineuploader-express-middleware');

var app = express()
    .use(express.favicon('dist/favicon.ico'))
    .use(express.logger('dev'))
    .use(function(req, res, next) {
        req.pause();
        console.log('set Access-Control');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, cache-control');
        req.resume();
        next();
    })
    .use(express['static']('dist/index.html'))
    .use(express['static']('dist', {maxAge: 1000*60*60*24*30*10}))
    // .use(express.bodyParser())
    // .use(fineuploaderExpressMiddleware({ uploadDir: '/tmp ' }));
    .use('/api/upload', require('./fineuploader.node').fineuploader);

// app.post('/api/upload', function(req, res, next) {
//     console.log('plop', req.files);
//     res.end();
// });

// app.all('/api/upload', function(req, res) {
//     res.end();
// });

exports.deployit = app;