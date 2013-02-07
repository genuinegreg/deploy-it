'use strict';

describe('Service: dployUpload', function () {

  // load the service's module
  beforeEach(module('dployApp'));

  // instantiate service
  var dployUpload;
  beforeEach(inject(function(_dployUpload_) {
    dployUpload = _dployUpload_;
  }));

  it('should do something', function () {
    expect(!!dployUpload).toBe(true);
  });

});
