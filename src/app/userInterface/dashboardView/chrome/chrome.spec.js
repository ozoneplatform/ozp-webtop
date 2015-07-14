'use strict';

describe('Controller: ChromeCtrl', function () {

  // load the controller's module
  beforeEach(module('ozpWebtop.dashboardView.chrome'));

  var scope, ctrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {

    scope = $rootScope.$new();
    ctrl = $controller('ChromeCtrl', { $scope: scope });
    if(!$rootScope.$$phase) { $rootScope.$apply(); }
  }));

  xit('should minimize a frame', function () {
    // TODO: Minimize a frame and test that it is done
  });

  xit('should maximize a frame', function () {
    // TODO: Maximize a frame and ensure it is done
  });
});