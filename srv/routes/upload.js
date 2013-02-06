"use strict";


var mmh = require('murmurhash3');
var path = require('path');
var fs = require('fs');
var conf = require('../etc/config.json');

var uploadHandler = require('../lib/upload');

// UPLOAD ROUTES

exports.upload = function upload(req, res) {

    if (req.files === undefined) {
        res.send(500, 'Error : no file');
        res.end();
    }

    if (req.files.file instanceof Array) {
        res.send(500, 'Error: multiple files upload are not allowed');
        res.end();
    }

//    console.log('file :', req.files.file);
//    console.log('file name :', req.files.file.name);
//    console.log('file path :', req.files.file.path);
//    console.log('file mime :', req.files.file.mime);
//
//    var hash = mmh.murmur32HexSync(new Date() + 'plop');
//
//
//    fs.renameSync(req.files.file.path, path.join(conf.paths.data, hash));
//
//    console.log('hash : ' + hash);

    uploadHandler.handle(req.files.file, function (err, hash) {
        if (err !== undefined) {
            console.log(err);
            res.send(500, 'Error');
            res.end();
        }

        res.json({
            hash:hash
        });
        res.end();

    })


};


// DOWNLAOD ROUTES

exports.downloadHtml = function downloadHtml(req, res) {
    res.render('download/html', {hash:req.param('hash')});
};

exports.downloadPlist = function downloadHtml(req, res) {
    res.render('download/plist', {hash:req.param('hash')});
};

exports.downloadIpa = function downloadHtml(req, res) {
    res.send(path.join(conf.paths.data, req.param('hash') + '.ipa'));
};