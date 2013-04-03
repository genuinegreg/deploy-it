'use strict';


var api = require('../lib/api/api');

// var ncf = require('../etc/nconfLoader');


exports.appList = function (req, res) {

    res.respond([
        {
            name: 'MyApp',
            upload: new Date(2013, 1, 12, 15, 32, 0),
            version: 5,
            hash: '654321',
            download: 6
        },
        {
            name: 'OtherApp',
            upload: new Date(2013, 0, 29, 14, 10),
            version: 1,
            hash: '123456',
            download: 15
        },
        {
            name: 'SomeApp',
            upload: new Date(2013, 1, 19, 9, 59),
            version: 16,
            hash: 'abc54d',
            download: 46
        }
    ]);

};

exports.appInfo = function (req, res) {
    res.respond(undefined, 500);
};
exports.signin = function signin(req, res) {

    if (req.body.username === undefined) {
        return res.respond(new Error('username undefiend'), 400);
    }

    if (req.body.password === undefined) {
        return res.respond(new Error('password undefined'), 400);

    }

    api.signin(req.body.username, req.body.password,
        function (err, account) {

            if (err) {
                return res.respond(undefined, 500);
            }

            if (account === null || account === undefined) {
                return res.respond(new Error('Username already in use'), 400);
            }

            res.respond('OK');
        });

};

exports.login = function (req, res) {

    var username = req.body.username,
        password = req.body.password;

    if (username === undefined || username === '') {
        return res.respond('username undefiend', 400);
    }

    if (password === undefined || password === '') {
        return res.respond('password undefined', 400);
    }


    api.login(username, password, undefined, function (err, sessionid) {

        if (err) {
            return res.respond(undefined, 500);
        }

        if (sessionid === null || sessionid === undefined) {
            return res.respond('Wrong usernae or password', 400);
        }

        res.respond({
            sessionid: sessionid
        }, 200);
    });
};


exports.logout = function (req, res) {

    var params = req.body;

    if (params.sessionid === undefined) {
        return res.respond('sessionid undefined', 400);
    }


    api.logout(params.sessionid, function (err) {
        if (err) {
            return res.respond(undefined, 400);
        }

        res.respond('ok', 200);
    });
};
