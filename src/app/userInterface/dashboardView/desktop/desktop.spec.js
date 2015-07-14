'use strict';


describe('Controller: DesktopCtrl', function () {

    // use IWC for tests?
    beforeEach(function() {
      angular.mock.module('ozpWebtop.constants', function($provide) {
        $provide.constant('useIwc', true);
      });
    });

  // load the controller's module
  beforeEach(module('ozpWebtop.dashboardView.desktop'));

  var desktopcontrollerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, models) {
    scope = $rootScope.$new();

    // TODO: create Webtop data

    $rootScope.$apply();

    desktopcontrollerCtrl = $controller('DesktopCtrl', {
      $scope: scope,
      models: models
    });

  }));

  xit('should attach icon and frame data to the scope', function () {
    expect(scope.frames).not.toBeNull();
    expect(scope.icons).not.toBeNull();
  });
});
