'use strict';

angular.module('ozpWebtopApp').factory('WorkspaceState', function($q) {
    return {
        getStateFile : function() {
            var tiles = { 'tiles' : [] };
            return $q.when(tiles);
        }
    };
});

describe('Controller: GridcontrollerCtrl', function () {

    // load the controller's module
    beforeEach(module('ozpWebtopApp'));

    var GridcontrollerCtrl,
    scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _WorkspaceState_) {
        scope = $rootScope.$new();
        GridcontrollerCtrl = $controller('GridController', {
            $scope: scope,
            WorkspaceState: _WorkspaceState_
        });
    }));

    it('should attach grid data to the scope', function () {
        expect(scope.grid).not.toBeNull();
    });
});
