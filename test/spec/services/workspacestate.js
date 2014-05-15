'use strict';

describe('Service: Workspacestate', function () {

  // load the service's module
  beforeEach(module('ozpWebtopApp'));

  // instantiate service
  var Workspacestate;
  beforeEach(inject(function (_Workspacestate_) {
    Workspacestate = _Workspacestate_;
  }));

  it('should do something', function () {
    expect(!!Workspacestate).toBe(true);
  });

});
