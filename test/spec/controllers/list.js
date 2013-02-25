'use strict';

describe('Controller: ListCtrl', function () {

    // load the controller's module
    beforeEach(module('dployApp'));

    var ListCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller) {
        scope = {};
        ListCtrl = $controller('ListCtrl', {
            $scope:scope
        });
    }));

//    it('should attach a list of awesomeThings to the scope', function () {
//        expect(scope.awesomeThings.length).toBe(3);
//    });
});
