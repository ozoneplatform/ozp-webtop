'use strict';

describe('Controller: ChromeCtrl', function () {

  // load the controller's module
  beforeEach(module('ozpWebtop.dashboardView.chrome'));

  var scope, ctrl, $location, dashboardSwitchedEvent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _$location_,
                             _dashboardSwitchedEvent_) {
    $location = _$location_;

    // Set dummy location
    $location.path('/grid/0');
    dashboardSwitchedEvent = _dashboardSwitchedEvent_;
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

  it('should respond to a dashboardSwitchedEvent event', function () {
    var dashboardChange = { layout: 'foo' };
    scope.$broadcast(dashboardSwitchedEvent, dashboardChange);
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