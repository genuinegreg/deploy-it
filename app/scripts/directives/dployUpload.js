'use strict';

dployApp.directive('dployUpload', function () {
    return {
        templateUrl:'scripts/directives/dployUpload.html',
        restrict:'A',
        replace: true,
        link:function postLink(scope, element, attrs) {
            console.log(scope);
            console.log(element[0]);
            console.log(attrs);
        }
    };
});
