'use strict';


describe('Controller: DesktopController', function () {

  // load the controller's module
  beforeEach(module('ozpWebtopApp'));

  var desktopcontrollerCtrl, scope, dashboardApi, marketplaceApi;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _dashboardApi_, _marketplaceApi_) {
    scope = $rootScope.$new();
    dashboardApi = _dashboardApi_;
    marketplaceApi = _marketplaceApi_;

    desktopcontrollerCtrl = $controller('DesktopController', {
      $scope: scope,
      dashboardApi: dashboardApi,
      marketplaceApi: marketplaceApi
    });

  }));

  it('should attach icon and frame data to the scope', function () {
    expect(scope.frames).not.toBeNull();
    expect(scope.icons).not.toBeNull();
  });
});
