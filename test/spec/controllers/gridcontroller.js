'use strict';

describe('Controller: GridcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('ozpWebtopApp'));

  var GridcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GridcontrollerCtrl = $controller('GridcontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
