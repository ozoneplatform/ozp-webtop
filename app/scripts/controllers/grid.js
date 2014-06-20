'use strict';

/**
 *
 */
angular.module('ozpWebtopApp.controllers')

    .controller('GridController', function ($scope, WorkspaceState) {

        // GET the state of the grid
        WorkspaceState.getStateFile('tiles').then(function (data) {
            $scope.grid = data.tiles;
        });

    });
