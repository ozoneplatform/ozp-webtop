'use strict';


describe('Controller: GridCtrl', function () {

  // load the controller's module
  beforeEach(module('ozpWebtop.dashboardView.grid'));

  var GridcontrollerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, models) {
    scope = $rootScope.$new();

    GridcontrollerCtrl = $controller('GridCtrl', {
      $scope: scope,
      models: models
    });
  }));

  it('should attach grid data to the scope', function () {
    //scope.$apply();
    expect(scope.apps).not.toBeNull();
  });
});
