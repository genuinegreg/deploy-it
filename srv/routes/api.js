'use strict';


var api = require('../lib/api');

// var ncf = require('../etc/nconfLoader');


exports.appList = function appList(req, res) {
    res.respond(undefined, 500);

};

exports.appInfo = function appInfo(req, res) {
    res.respond(undefined, 500);
};
exports.signin = function signin(req, res) {

    if (req.body.username === undefined) {
        res.respond(new Error('username undefiend'), 400);
        return;
    }

    if (req.body.password === undefined) {
        res.respond(new Error('password undefined'), 400);
        return;
    }

    api.signin(req.body.username, req.body.password,
        function (err, account) {

            if (err) {
                res.respond(undefined, 500);
                return;
            }

            if (account === null || account === undefined) {
                res.respond(new Error('Username already in use'), 400);
                return;
            }

            res.respond('OK');
        });

};

exports.login = function login(req, res) {

    var username = req.body.username,
        password = req.body.password;

    if (username === undefined || username === '') {
        res.respond('username undefiend', 400);
        return;
    }

    if (password === undefined || password === '') {
        res.respond('password undefined', 400);
        return;
    }


    api.login(username, password, function (err, sessionid) {

        if (err) {
            res.respond(undefined, 500);
            return;
        }

        if (sessionid === null || sessionid === undefined) {
            res.respond('Wrong usernae or password', 400);
            return;
        }

        res.respond({
            sessionid: sessionid
        }, 200);
    });
};


exports.logout = function login(req, res) {

    var params = req.body;

    if (params.sessionid === undefined) {
        res.respond('sessionid undefined', 400);
    }


    api.logout(params.sessionid, function (err) {
        if (err) {
            res.respond(undefined, 400);
        }

        res.respond('ok', 200);
    });
};
