'use strict';

var client = exports.client = require('restify').createJsonClient({
    version: '*',
    url: 'http://localhost:3005'
});

require('../lib/db');
var mongoose = require('mongoose');

exports.dropDb = function (cb) {
    mongoose.connection.db.dropDatabase(function (err) {
        if (err) {
            throw err;
        }
        cb();
    });
};


exports.signin = function (username, password, callback) {
    client.post('/user.json/signin', {username: username, password: password}, function (err, req, res, data) {
        callback(err, data);
    });
};

exports.login = function (credential, callback) {
    client.post('/user.json/login', credential, function (err, req, res, data) {
        callback(err, data);
    });
};

exports.logout = function (sessionid, callback) {
    client.post('/user.json/logout', {sessionid: sessionid}, function (err, req, res, data) {
        callback(err, data);
    });
};