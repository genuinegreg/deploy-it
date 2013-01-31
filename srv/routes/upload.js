
"use strict";


var mmh = require('murmurhash3');
var path = require('path');
var fs = require('fs');

// UPLOAD ROUTES

exports.upload = function upload(req, res) {

    if (req.files === undefined) {
        res.send(500, 'Error');
        res.end();
    }

    if (req.files.file instanceof Array) {
        res.send(500, 'Error: multiple files upload are not allowed');
        res.end();
    }

    console.log('file :', req.files.file);
    console.log('file name :', req.files.file.name);
    console.log('file path :', req.files.file.path);
    console.log('file mime :', req.files.file.mime);

    var hash = mmh.murmur32HexSync(new Date() + 'plop');
    console.log('hash : ' + hash);


    res.json({
        hash: hash
    });
    res.end();
};



// DOWNLAOD ROUTES

exports.downloadHtml = function downloadHtml(req, res) {

};

exports.downloadPlist = function downloadHtml(req, res) {

};

exports.downloadIpa = function downloadHtml(req, res) {
    res.send
};