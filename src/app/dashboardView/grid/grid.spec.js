'use strict';


describe('Controller: GridcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('ozpWebtopApp'));

  var GridcontrollerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _dashboardApi_, _marketplaceApi_) {
    scope = $rootScope.$new();

    GridcontrollerCtrl = $controller('GridController', {
      $scope: scope,
      dashboardApi: _dashboardApi_,
      marketplaceApi: _marketplaceApi_
    });
  }));

  it('should attach grid data to the scope', function () {
    expect(scope.apps).not.toBeNull();
  });
});
