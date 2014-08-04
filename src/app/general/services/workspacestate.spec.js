'use strict';

describe('Service: Workspacestate', function () {
  // load the service's module
  beforeEach(module('ozpWebtopApp'));

  // instantiate service
  var WorkspaceState;
  beforeEach(inject(function (_WorkspaceState_) {
    WorkspaceState = _WorkspaceState_;
  }));

  it('workspace should be truthy', function () {
    expect(!!WorkspaceState).toBeTruthy();
  });
});
