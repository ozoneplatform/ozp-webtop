'use strict';

describe('Service: myWorkspace', function () {

  // load the service's module
  beforeEach(module('ozpWebtopApp'));

  // instantiate service
  var myWorkspace;
  beforeEach(inject(function (_myWorkspace_) {
    myWorkspace = _myWorkspace_;
  }));

  it('should do something', function () {
    expect(!!myWorkspace).toBe(true);
  });

});
