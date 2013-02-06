'use strict';

dployApp.controller('MainCtrl', ['$scope', '$document', function ($scope, $document) {

    var holder = document.getElementById('dropZone'),
        tests = {
            filereader:typeof FileReader !== 'undefined',
            dnd:'draggable' in document.createElement('span'),
            formdata:!!window.FormData,
            progress:"upload" in new XMLHttpRequest()
        },
        support = {
            filereader:document.getElementById('filereader'),
            formdata:document.getElementById('formdata'),
            progress:document.getElementById('progress')
        },
        acceptedTypes = {
            'image/png':true,
            'image/jpeg':true,
            'image/gif':true
        },
        progress = document.getElementById('uploadprogress'),
        fileupload = document.getElementById('upload');

    "filereader formdata progress".split(' ').forEach(function (api) {
        if (tests[api] === false) {
            support[api].className = 'fail';
        } else {
            // FFS. I could have done el.hidden = true, but IE doesn't support
            // hidden, so I tried to create a polyfill that would extend the
            // Element.prototype, but then IE10 doesn't even give me access
            // to the Element object. Brilliant.
            support[api].className = 'hidden';
        }
    });


    function readfiles(files) {
//        debugger;
        var formData = tests.formdata ? new FormData() : null;

        if (files.length < 1) {
            console.log('Error : no file');
            return;
        }


        // now post a new XHR request
        if (tests.formdata) {

            formData.append('file', files[0]);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', conf.http.host + 'upload');
            xhr.onload = function () {
                progress.value = progress.innerHTML = 100;
            };

            if (tests.progress) {
                xhr.upload.onprogress = function (event) {
                    if (event.lengthComputable) {
                        var complete = (event.loaded / event.total * 100 | 0);
                        progress.value = progress.innerHTML = complete;
                    }
                }
            }


            // handle server response
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    var result = JSON.parse(xhr.responseText);
                    console.log(conf.http.host + result.hash);
                }
            }


            xhr.send(formData);

        }
    }

    if (tests.dnd) {
        holder.ondragover = function () {
            this.className = 'hover';
            return false;
        };
        holder.ondragend = function () {
            this.className = '';
            return false;
        };
        holder.ondrop = function (e) {
            this.className = '';
            e.preventDefault();

            var files = e.dataTransfer.files;

            if (files.length !== 1) {
                console.log('Upload just ONE file.');
                return;
            }

            readfiles(e.dataTransfer.files);
        }
    } else {
        fileupload.className = 'hidden';
        fileupload.querySelector('input').onchange = function () {
            readfiles(this.files);
        };
    }
}]);

