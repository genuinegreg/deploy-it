'use strict';


// config
var ncf = require('../etc/nconfLoader');

exports.checkRequestHeaders = function checkRequestHeaders(req, res, next) {
    if (!req.accepts('application/json')) {
        return res.respond('You must accept content-type application/json', 406);
    }
    if ((req.method === 'PUT' || req.method === 'POST') &&
        (req.header('content-type') !== 'application/json' &&
            (req.header('content-type') === undefined || !req.header('content-type').match(/multipart\/form-data;/)))) {
        return res.respond('You must declare your content-type as application/json or multipart/form-data', 406);
    }
    return next();
};


exports.cors = function cors(req, res, next) {

//    res.header('Origin', ncf.get('urls:static'));
    res.header('Access-Control-Allow-Origin', ncf.get('urls:static'));
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    if (req.method !== 'OPTIONS') {
        next();
        return;
    }
    res.end();
};
