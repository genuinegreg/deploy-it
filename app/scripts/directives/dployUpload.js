(function () {
    'use strict';

    angular.module('dployApp').directive('dployUpload', ['dployUpload', '$document', 'apiUrl', function (dployUpload, $document, apiUrl) {

        function postLink(scope, element) {
            scope.progress = '0%';
            scope.hash = false;

            // FIXME: Use ModernizR for browser feature check.
            var tests = {
                filereader: typeof FileReader !== 'undefined',
                dnd: 'draggable' in document.createElement('span'),
                formdata: !!window.FormData,
                progress: 'uploadRoute' in new XMLHttpRequest()
            };

            var supportAlert = {
                filereader: element.find('.filereaderalert'),
                formdata: element.find('.formdataalert'),
                progress: element.find('.progressalert')
            };

            if (tests.filereader) {
                supportAlert.filereader.addClass('hide');
            } else {
                supportAlert.filereader.addClass('fail');
            }
            if (tests.formdata) {
                supportAlert.formdata.addClass('hide');
            } else {
                supportAlert.formdata.addClass('fail');
            }
            if (tests.progress) {
                supportAlert.progress.addClass('hide');
            } else {
                supportAlert.progress.addClass('fail');
            }

            if (tests.dnd) {

                console.log('dnd ok, init dnd events...');
                $document.bind('dragover', function () {
                    element.addClass('in');
                    return false;
                });

                var endDrag = function () {
                    element.removeClass('in');
                    return false;
                };
                $document.bind('dragleave', endDrag);
                $document.bind('dragend', endDrag);
                $document.bind('drop', function (e) {
                    // prevent dnd default
                    e.preventDefault();

                    // if drop is not in dropzone elements
                    if ($(e.target).closest(element).length < 1) {
                        return false;
                    }

                    // update css
                    element.removeClass('in');
                    element.addClass('uploading');

                    // get droped files
                    var files = e.originalEvent.dataTransfer.files;

                    // ugly hack to prevent multiupload
                    if (files.length !== 1) {
                        console.log('Upload just ONE file.');
                        // FIXME: alert use when he's droping multiple files
                        return;
                    }


                    // upload with dployUplaod service
                    dployUpload.upload(files, function (progress, hash) {

                        // update progress info
                        if (progress !== undefined) {
                            console.log('update scope.progress to ' + progress);
                            scope.progress = progress;
                            scope.$digest();
                        }

                        // display download link
                        if (hash !== undefined) {

                            scope.hash = hash;
                            scope.link = apiUrl + '/' + hash;
                            scope.$digest();

                            var inputDl = element.find('.build_link');

                            inputDl.focus();
                            inputDl.select();

                            element.addClass('finished');
                        }
                    });
                });
            } else {

                // FIXME: fix dnd support warning.
                window.alert('No drag and drop !');
            }
        }

        return {
            templateUrl: 'scripts/directives/dployUpload.html',
            restrict: 'A',
            replace: true,
            // scope: {},
            transclude: true,
            link: postLink
        };
    }]);

})();