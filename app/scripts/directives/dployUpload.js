(function () {
    'use strict';

    dployApp.directive('dployUpload', ['dployUpload', function (dployUpload) {
        return {
            templateUrl:'scripts/directives/dployUpload.html',
            restrict:'A',
            replace:true,
            link:function postLink(scope, element, attrs) {

                scope.progress = '0%';

                //FIXME: Use ModernizR for browser feature check.

                var tests = {
                    filereader:typeof FileReader !== 'undefined',
                    dnd:'draggable' in document.createElement('span'),
                    formdata:!!window.FormData,
                    progress:"upload" in new XMLHttpRequest()
                };

                var supportAlert = {
                    filereader:element.find('.filereaderalert'),
                    formdata:element.find('.formdataalert'),
                    progress:element.find('.progressalert')
                };

                if (tests.filereader) {
                    supportAlert.filereader.addClass('hide');
                }
                else {
                    supportAlert.filereader.addClass('fail');
                }
                if (tests.formdata) {
                    supportAlert.formdata.addClass('hide');
                }
                else {
                    supportAlert.formdata.addClass('fail');
                }
                if (tests.progress) {
                    supportAlert.progress.addClass('hide');
                }
                else {
                    supportAlert.progress.addClass('fail');
                }

                if (tests.dnd) {

                    console.log('dnd ok, init dnd events...');
                    $(document).bind('dragover', function () {
                        element.addClass('in');
                        return false;
                    });
                    element.bind('dragend', function () {
                        element.removeClass('in');
                        return false;
                    });
                    element.bind('drop', function (e) {
                        element.removeClass('in');



                        var animation = element.children('#animation');
                        animation.toggleClass('animated');
                        animation.toggleClass('hover');


                        e.preventDefault();

                        console.log('target : ' + e.target);

                        console.log(e);

                        var files = e.originalEvent.dataTransfer.files;

                        if (files.length !== 1) {
                            console.log('Upload just ONE file.');
                            return;
                        }

                        console.log('send files...');

                        dployUpload.upload(files, function(progress, hash) {

                            console.log('[progress:' + progress + ' , hash:' + hash + ']');

                            if (progress !== undefined) {
                                console.log('update scope.progress to ' + progress);
                                scope.progress = progress + '%';

                                // FIXME: use scope to update progress indead of doing a new jquery request
                                element.find('.airplane > h4').text('Uploading... ' + progress + '%');

                            }

                            if (hash !== undefined) {
                                scope.hash = hash;
                                element.find('.airplane > h5 > a').text('http://dploy.io/' + hash);
                                element.find('.airplane > h5 > a').attr('href', 'http://dploy.io/' + hash);
                                element.find('.airplane > h5').removeClass('hide');
                            }
                        });
                    });
                }
                else {

                    // FIXME: fix dnd support warning.
                    window.alert('No drag and drop !');
                }


            }
        };
    }]);

})();