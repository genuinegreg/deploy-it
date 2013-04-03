'use strict';

// load config
var ncf = require('../etc/nconfLoader');

// require deps
var mmh = require('murmurhash3');
var crypto = require('crypto');


// get hash salt
var salt = ncf.get('hash:salt');


function seed(value, order) {
    if (value === undefined || value === null || value === '') {
        if (order === undefined) {
            order = 2;
        }
        var ss = [];
        ss.push(Date.now());
        for (var i = 0; i < order; i++) {
            ss.push(Math.random());
        }
        return ss.join('::');
    }
    else {
        return value;
    }
}


exports.mmhSync = function mmhSync(value) {
    return mmh.murmur32HexSync(
        seed(value, 1)
    );
};

exports.mmh128Sync = function mmh128Sync(value) {
    return mmh.murmur128HexSync(
        seed(value, 3)
    );
};

exports.sha512Sync = function (value) {
    var shasum = crypto.createHash('sha512');
    shasum.update(salt);
    shasum.update(seed(value, 6));
    return shasum.digest('hex');
};

exports.sha256Sync = function (value) {
    var shasum = crypto.createHash('sha256');
    shasum.update(salt);
    shasum.update(seed(value, 3));
    return shasum.digest('hex');
};
