(function () {

    'use strict';

    angular.module('dployApp').factory('dployUpload', ['apiUrl', function (apiUrl) {

        var checks = {
            formData: !!window.FormData,
            progress: 'uploadRoute' in new XMLHttpRequest()
        };

        // Public API here
        return {

            formdata: checks.formData,
            progress: checks.progress,

            sendFile: function (files, callback) {


                var formData = checks.formData ? new FormData() : undefined;

                if (files.length < 1) {
                    console.log('Error : no file');
                    return;
                }


                // now post a new XHR request
                if (formData) {
                    console.log('prepare upload');

                    formData.append('file', files[0]);

                    var upReq = $.ajax({
                        type: 'POST',
                        url: apiUrl + '/app.json/upload',
                        data: formData,
                        processData: false,
                        contentType: false,
                        xhr: function () {

                            var xhr = new XMLHttpRequest();

                            //Upload progress
                            if (xhr.upload) {
                                xhr.upload.addEventListener('progress', function (evt) {
                                    if (evt.lengthComputable) {
                                        var percentComplete = (evt.loaded / evt.total) * 100;
                                        percentComplete = (percentComplete <= 100 && percentComplete >= 0) ? percentComplete : 0;
                                        callback(parseInt(percentComplete, 10), undefined);
                                    }
                                }, false);
                            }


                            return xhr;
                        }
                    });

                    upReq.done(function (data) {
                        callback(undefined, data.hash);
                    });

                    upReq.fail(function () {
                        // FIXME: better upload error handling
                        window.alert('upload failed, sorry.');
                    });

                }
            }
        };
    }]);


})();