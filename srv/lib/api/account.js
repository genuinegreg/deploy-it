'use strict';

var attempt = require('attempt');
var queue = require('queue-async');

var hash = require('./../hash');
var db = require('./../db');


/**
 * @name CreateAccountResponse
 * @param err db errors
 * @param account newly created account or null if username already exists
 */

/**
 * Create new account
 * @param {String} username username
 * @param {String} password password
 * @param {CreateAccountResponse} callback callback function
 */
exports.create = function (username, password, callback) {

    db.Account.findOne(
        {'users._id': username},
        function (err, account) {
            // check db errors
            if (err) {
                return callback(err);
            }

            // username exists
            if (account !== null && account !== undefined) {
                return callback(new Error('username exists'));
            }

            // define new account

            var newAccount = new db.Account(
                {
                    users: [
                        {
                            _id: username,
                            password: hash.sha512Sync(password)
                        }
                    ]
                }
            );

            // save account and try generate sessionid and auth token
            newAccount.save(callback);


        });
};

/**
 * @name LoginResponse
 * @param {Error} err db errors
 * @param {String} sessionid sessionid object or null if wrrong credential are used
 * @param {String} authToken authToken
 */

/**
 * Try to login
 * @param {String} username
 * @param {String} password
 * @param {Boolean} [persist] generate auth token persist login
 * @param {LoginResponse} callback
 */
exports.login = function (username, password, persist, callback) {

    if (persist instanceof Function) {
        callback = persist;
        persist = false;
    }

    db.Account.findOne(
        {
            'users': {
                '_id': username,
                'password': hash.sha512Sync(password)
            }

        },
        function (err, account) {

            if (err) {
                callback(err);
                return;
            }

            if (account === null || account === undefined) {
                callback(new Error('invalid credential'));
                return;
            }


            if (!persist) {

                // generate session id (5 try)

                attempt(function () {
                        tryGenerateAuthtoken(account, this);
                    },
                    callback);
            }
            else {

                // concurently generate sessionId and Authtoken (5 try each)

                queue(2).
                    defer(
                    attempt,
                    function () {
                        tryGenerateSessionId(account, this);
                    }).
                    defer(
                    attempt,
                    function () {
                        tryGenerateAuthtoken(account, this);
                    }).
                    await(callback);
            }

        }
    );
};


/**
 * @name LoginByAuthTokenResponse
 * @param {Error} err db errors
 * @param {String} sessionid sessionid object or null if wrong credential are used
 * @param {String} authToken authToken
 */

/**
 * Try to login with an AuthToken
 * @param {String} authtoken
 * @param {LoginResponse} callback
 */
exports.loginByAuthToken = function (authtoken, callback) {

    db.AuthToken.findById(authtoken).
        populate('account').
        exec(function (err, authtoken) {

            // check db errors
            if (err) {
                return callback(err);
            }

            // check credential exists
            if (authtoken === null || authtoken === undefined) {
                return callback(new Error('invalid credential'));
            }

            queue(2).
                defer(
                attempt,
                function () {
                    tryGenerateSessionId(authtoken.account, this);
                }).
                defer(
                attempt,
                function () {
                    tryGenerateAuthtoken(authtoken.account, this);
                }).
                await(callback);

        });
}

/**
 * @name LogoutResponse
 * @param {Error} err db errors
 * @param {SessionId} sessionid revoked session id or null if the sessionid string doe'nt exist
 */

/**
 * Revoke a sessionId and authtoken
 * @param {String} sessionid
 * @param callback
 */
exports.logout = function (sessionid, authtoken, callback) {

    if (authtoken instanceof Function) {
        callback = authtoken;
        authtoken = false;
    }

    db.SessionId.findByIdAndRemove(sessionid, callback);

    if (authtoken) {
        db.AuthToken.findByIdAndRemove(authtoken, callback);
    }
};

/**
 * @name CheckSessionidResponse
 * @param {Error} err db errors
 * @param {SessionId} sessionid bject or null if invalid sessionid string is given
 */

/**
 *
 * @param {String} sessionid
 * @param callback
 */
exports.checkSessionid = function (sessionid, callback) {
    db.SessionId.findByIdAndUpdate(
        sessionid,
        {
            update: Date.now()
        },
        callback
    );
};


function tryGenerateSessionId(account, callback) {

    var newSessionid = new db.SessionId({
        _id: hash.sha256Sync(),
        account: account
    });

    newSessionid.save(function (err, sessionid) {
        callback(err, sessionid._id);
    });

}

function tryGenerateAuthtoken(account, callback) {

    var newAuthToken = new db.AuthToken({
        _id: hash.sha512Sync(),
        account: account
    });

    newAuthToken.save(function (err, authtoken) {
        callback(err, authtoken._id);
    });
}

