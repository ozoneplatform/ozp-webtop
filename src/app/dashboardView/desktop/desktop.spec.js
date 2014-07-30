'use strict';

angular.module('ozpWebtopApp').factory('WorkspaceState', function($q) {
  return {
    getStateFile : function() {
      var state = { 'frames' : [], 'icons' : [] };
      return $q.when(state);
    }
  };
});

describe('Controller: DesktopController', function () {

  // load the controller's module
  beforeEach(module('ozpWebtopApp'));

  var desktopcontrollerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _WorkspaceState_) {
    scope = $rootScope.$new();
    desktopcontrollerCtrl = $controller('DesktopController', {
      $scope: scope,
      WorkspaceState: _WorkspaceState_
    });
  }));

  it('should attach icon and frame data to the scope', function () {
    expect(scope.frames).not.toBeNull();
    expect(scope.icons).not.toBeNull();
  });
});
