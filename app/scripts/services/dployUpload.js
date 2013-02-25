(function() {

    'use strict';

    dployApp.factory('dployUpload', ['apiUrl', function(apiUrl) {
        // Service logic
        // ...
        var meaningOfLife = 42;

        // Public API here
        return {
            upload: function(files, callback) {

                var tests = {
                    formdata: !!window.FormData,
                    progress: "uploadRoute" in new XMLHttpRequest()
                };
                var formData = tests.formdata ? new FormData() : null;

                if (files.length < 1) {
                    console.log('Error : no file');
                    return;
                }


                // now post a new XHR request
                if (tests.formdata) {

                    formData.append('file', files[0]);

                    var xhr = new XMLHttpRequest();

                    xhr.open('POST', apiUrl + '/app.json/upload');

                    xhr.onload = function(xhr) {
                        var response = JSON.parse(xhr.currentTarget.response);
                        callback(undefined, response.hash);
                    };

                    if (tests.progress) {
                        xhr.upload.onprogress = function(event) {
                            if (event.lengthComputable) {
                                var progress = (event.loaded / event.total * 100);
                                progress = (progress <= 100 && progress >= 0) ? progress : 0;

                                callback(parseInt(progress, 10), undefined);
                            }
                        };
                    }


                    xhr.send(formData);

                }
            }
        };
    }]);


})();