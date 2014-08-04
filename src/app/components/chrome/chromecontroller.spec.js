'use strict';

describe('Controller: ChromeController', function () {

  // load the controller's module
  beforeEach(module('ozpWebtopApp'));

  var scope, ctrl, $location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _$location_) {
    $location = _$location_;
    // Set dummy location
    $location.path('/grid');
    scope = $rootScope.$new();
    ctrl = $controller('ChromeController', { $scope: scope });
  }));

  it('should $scope.isGrid to true when in a grid view', function () {
    expect(scope.isGrid).toBeTruthy();
  });
});