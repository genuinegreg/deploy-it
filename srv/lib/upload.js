'use strict';

var ncf = require('../etc/nconfLoader');
var sync = require('synchronize');
var path = require('path');
var fs = require('fs');
var child = require('child_process');
var mmh = require('murmurhash3');
var plist = require('plist');

exports.handle = function handle(file, cb) {

    sync(fs, 'rename');
    sync(mmh, 'murmur32Hex');
    sync(child, 'exec');

    var hash, bundleIdentifier, bundleVersion, kind, title;


    // set static keys
    bundleVersion = '1.0';
    kind = 'software';

    sync.fiber(

        function () {


            // generate unique hash
            do {
                hash = mmh.murmur32Hex(new Date() + '352b2965');
            } while (hash === undefined);


            // get app title
            try {
                title = file.name.replace('.ipa', '');
            } catch (err) {
                cb(err);
            }


            // extract Info.plist
            try {
                child.exec('unzip ' + file.path + ' */*/Info.plist -d ' + path.join(ncf.get('paths:unzip'), hash));
            } catch (err) {
                cb(err);
            }


            // convert binary plist to xml plist
            try {
                child.exec('plutil -i ' + path.join(ncf.get('paths:unzip'), hash, '*/*/Info.plist') + ' > ' + path.join(ncf.get('paths:unzip'), hash, 'Info_xml.plist'));
            } catch (err) {
                cb(err);
            }


            // extract CFBundleURLName from Info_xml.plist
            try {
                var obj = plist.parseFileSync(path.join(ncf.get('paths:unzip'), hash, 'Info_xml.plist'));
                bundleIdentifier = obj.CFBundleIdentifier;
            } catch (err) {
                cb(err);
            }


            // delete temporary unzip files
            try {
                child.exec('rm -R ' + path.join(ncf.get('paths:unzip'), hash));
            } catch (err) {
                cb(err);
            }


            // move file
            try {
                var renamePath = path.join(ncf.get('paths:data'), hash + '.ipa');
                fs.rename(file.path, renamePath);
            } catch (err) {
                cb(err);
            }

            // create download plist file
            try {
                var plistObj = {
                    'items': [
                        {
                            'assets': [
                                {
                                    'kind': 'software-package',
                                    'url': ncf.get('urls:api') + '/' + hash + '.ipa'
                                }
                            ],
                            metadata: {
                                'bundle-identifier': bundleIdentifier,
                                'bundle-version': bundleVersion,
                                'kind': kind,
                                'title': title
                            }
                        }
                    ]
                };

                var data = plist.build(plistObj);
                fs.writeFileSync(path.join(ncf.get('paths:data'), hash + '.plist'), data);
            } catch (err) {
                cb(err);
            }

        }, function () {
            cb(undefined, hash);
        });


};