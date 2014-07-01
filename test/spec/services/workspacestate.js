'use strict';

describe('Service: Workspacestate', function () {

    // load the service's module
    beforeEach(module('ozpWebtopApp'));

    // instantiate service
    var WorkspaceState;
    beforeEach(inject(function (_WorkspaceState_) {
        WorkspaceState = _WorkspaceState_;
    }));

    it('should do something', function () {
        expect(!!WorkspaceState).toBe(true);
    });

});
