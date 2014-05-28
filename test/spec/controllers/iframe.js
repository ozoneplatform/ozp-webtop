'use strict';

describe('Controller: IframeCtrl', function () {

  // load the controller's module
  beforeEach(module('ozpWebtopApp'));

  var IframeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IframeCtrl = $controller('IframeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
