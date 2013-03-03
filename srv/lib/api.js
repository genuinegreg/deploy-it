'use strict';

var hash = require('./hash');
var db = require('./db');


/**
 * @name SigninResponse
 * @param err db errors
 * @param account newly created account or null if username already exists
 */

/**
 * Create new account
 * @param {String} username username
 * @param {String} password password
 * @param {SigninResponse} callback callback fucntion
 */
exports.signin = function (username, password, callback) {

    db.Account.findOne(
        {'users._id': username},
        function (err, account) {
            // check db errors
            if (err) {
                callback(err);
                return;
            }

            if (account !== null && account !== undefined) {
                callback();
                return;
            }

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

            newAccount.save(callback);


        });
};


/**
 * @name LoginResponse
 * @param {Error} err db errors
 * @param {SessionId} sessionid sessionid object or null if wrrong credential are used
 */

/**
 * Try to login
 * @param {String} username
 * @param {String} password
 * @param {LoginResponse} callback
 */
exports.login = function (username, password, callback) {
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
                callback();
                return;
            }

            var newSessionid = new db.SessionId({
                _id: hash.sha256Sync(),
                account: account
            });

            newSessionid.save(function (err, sessionid) {

                if (err !== undefined && err !== null && err.code === 11000) {
                    console.log('sessionId exist');
                    exports.login(username, password, callback);
                    return;
                }

                callback(err, sessionid);
            });
        }
    );
};

/**
 * @name LogoutResponse
 * @param {Error} err db errors
 * @param {SessionId} sessionid revoked session id or null if the sessionid string doe'nt exist
 */

/**
 * Revoke a sessionId
 * @param {String} sessionid
 * @param callback
 */
exports.logout = function (sessionid, callback) {
    db.SessionId.findByIdAndRemove(sessionid, callback);
};


exports.checkSessionid = function (sessionid, callback) {
    db.SessionId.findByIdAndUpdate(
        sessionid,
        {
            update: Date.now()
        },
        callback
    );
};

