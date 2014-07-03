'use strict';

/**
 * GridController retrieves the state of a number of tiles and binds it to an Angular scope.
 *
 * @namespace controllers
 * @class GridController
 * @constructor
 */
angular.module('ozpWebtopApp.controllers')

    .controller('GridController', function ($scope, WorkspaceState) {

        // GET the state of the grid
        WorkspaceState.getStateFile('tiles').then(function (data) {
            $scope.grid = data.tiles;
        });

    });
