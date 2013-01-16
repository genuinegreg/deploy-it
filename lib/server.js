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
    .use(express['static']('dist', {maxAge: 1000*60*60*24*30*10}))
    .use(express.bodyParser())
    .use(function(req, res){
        res.end('hello world\n');
    });

exports.deployit = app;