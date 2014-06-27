'use strict';

describe('Controller: IframeCtrl', function () {

  // load the controller's module
  beforeEach(module('ozpWebtopApp'));

  var IframeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.frame = {}
    scope.frame.url = 'http://localhost:9000/test.html'
    IframeCtrl = $controller('IframeController', {
      $scope: scope
    });
  }));

  it('should put a trusted URL in the scope', function () {
    expect(scope.frame.trustedUrl).not.toBeNull();
  });
});
