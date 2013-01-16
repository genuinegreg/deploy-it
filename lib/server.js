//  ____             _             ___ _
// |  _ \  ___ _ __ | | ___  _   _|_ _| |_
// | | | |/ _ \ '_ \| |/ _ \| | | || || __|
// | |_| |  __/ |_) | | (_) | |_| || || |_
// |____/ \___| .__/|_|\___/ \__, |___|\__|
//            |_|            |___/

"use strict";

var express = require('express');

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
    .use(express['static']('dist', {maxAge: 1000*60*60*24*30*10}))
    .use('/api/upload', require('./fineuploader.node').fineuploader);



exports.deployit = app;