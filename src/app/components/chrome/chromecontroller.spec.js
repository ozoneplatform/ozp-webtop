'use strict';

describe('Controller: ChromeCtrl', function () {

  // load the controller's module
  beforeEach(module('ozpWebtopApp'));

  var scope, ctrl, $location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _$location_) {
    $location = _$location_;

    // Set dummy location
    $location.path('/grid/0');
    scope = $rootScope.$new();
    ctrl = $controller('ChromeCtrl', { $scope: scope });
    scope.$apply();
  }));

  it('should set $scope.isGrid to true when in a grid view', function () {
    expect(scope.isGrid).toBeTruthy();
  });

  it('should set $scope.isGrid to false when not in a grid view', function () {
    $location.path('/desktop/0');
    scope.$apply();
    expect(scope.isGrid).toBeFalsy();
  });

  it('should respond to a "dashboardChange" event', function () {
    var dashboardChange = { layout: 'foo' };
    scope.$broadcast('dashboardChange', dashboardChange);
    scope.$apply();
    expect(scope.isGrid).toBeFalsy();
  });

  xit('should minimize a frame', function () {
    // TODO: Minimize a frame and test that it is done
  });

  xit('should maximize a frame', function () {
    // TODO: Maximize a frame and ensure it is done
  });
});