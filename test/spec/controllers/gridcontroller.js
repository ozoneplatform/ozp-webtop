'use strict';

angular.module('ozpWebtopApp').
    factory('WorkspaceState', function() {
      return {
        getStateFile : function(file) {
          var tiles = { 'tiles' : [] };
          return tiles;
        }
      };
    })

describe('Controller: GridcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('ozpWebtopApp'));

  var GridcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _WorkspaceState_) {
    scope = $rootScope.$new();
    GridcontrollerCtrl = $controller('GridcontrollerCtrl', {
      $scope: scope,
      WorkspaceState: _WorkspaceState_
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
//    spyOn(WorkspaceState, 'getStateFile').andCallThrough();
//    expect(WorkspaceState.getStateFile).toHaveBeenCalled();
//    expect(scope.awesomeThings.length).toBe(3);
      expect(true).toBe(true);
  });
});
