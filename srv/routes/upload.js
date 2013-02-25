"use strict";


var path = require('path');
var ncf = require('../etc/nconfLoader');

var uploadHandler = require('../lib/upload');

// UPLOAD ROUTES
exports.upload = function upload(req, res) {

    if(req.files === undefined) {
        res.send(500, 'Error : no file');
        res.end();
    }

    if(req.files.file instanceof Array) {
        res.send(500, 'Error: multiple files upload are not allowed');
        res.end();
    }

    uploadHandler.handle(req.files.file, function(err, hash) {
        if(err !== undefined) {
            console.log(err);
            res.send(500, 'Error');
            res.end();
        }

        res.json({
            hash: hash
        });
        res.end();

    });
};


// DOWNLAOD ROUTES
exports.downloadPlist = function downloadHtml(req, res) {
    res.render('download/plist', {
        hash: req.param('hash')
    });
};

exports.downloadIpa = function downloadHtml(req, res) {
    res.send(path.join(ncf.get('paths:data'), req.param('hash') + '.ipa'));
};