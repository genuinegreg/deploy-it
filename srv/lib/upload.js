"use strict";

var conf = require('../etc/config.json');
var sync = require('synchronize');
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var mmh = require('murmurhash3');

exports.handle = function handle(file, cb) {

    console.log('exec handle');

    sync(fs, 'rename');
    sync(mmh, 'murmur32Hex');

    sync.fiber(
        function () {

            // def vars
            var hash;


            // get hash
            do {
                hash = mmh.murmur32Hex(new Date() + 'plop');
            } while (hash === undefined);

            console.log('Hash : ' + hash);

            // extract file
//            exec()

            // move file
            var renamePath = path.join(conf.paths.data, hash + '.ipa');
            console.log('rename "' + file.path + '" to "' + renamePath + '"...');
//            fs.rename(file.path, renamePath);
            console.log('rename... OK');

        },
        cb);


}