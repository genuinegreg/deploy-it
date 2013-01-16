'use strict';

describe('Controller: UploadCtrl', function() {

  // load the controller's module
  beforeEach(module('deployitApp'));

  var UploadCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    UploadCtrl = $controller('UploadCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
