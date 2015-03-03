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

  var desktopcontrollerCtrl, scope, dashboardApi, marketplaceApi;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _dashboardApi_, _marketplaceApi_) {
    scope = $rootScope.$new();
    dashboardApi = _dashboardApi_;
    marketplaceApi = _marketplaceApi_;

    // create example dashboards
    dashboardApi.createExampleDashboards().then(function() {
    });

    $rootScope.$apply();

    desktopcontrollerCtrl = $controller('DesktopCtrl', {
      $scope: scope,
      dashboardApi: dashboardApi,
      marketplaceApi: marketplaceApi
    });

  }));

  xit('should attach icon and frame data to the scope', function () {
    expect(scope.frames).not.toBeNull();
    expect(scope.icons).not.toBeNull();
  });
});
