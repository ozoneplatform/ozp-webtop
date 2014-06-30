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
        /*
        WorkspaceState.getStateFile('tiles').then(function (data) {
            $scope.grid = data.tiles;
        });
        */

        $scope.grid = [{
                sizeX: 2,
                sizeY: 1,
                row: 0,
                col: 0,
                name: "Shrubbery"
            }, {
                sizeX: 2,
                sizeY: 2,
                row: 0,
                col: 2,
                name: "Foo"
            }, {
                sizeX: 2,
                sizeY: 1,
                row: 2,
                col: 1,
                name: "Grid"
            }, {
                sizeX: 1,
                sizeY: 1,
                row: 2,
                col: 3,
                name: "Bar"
            }];

        $scope.gridOptions =  {
            columns: 6, // the width of the grid, in columns
            pushing: true, // whether to push other items out of the way on move or resize
            floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
            width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
            colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
            rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
            margins: [5, 5], // the pixel distance between each widget
            isMobile: false, // stacks the grid items if true
            minColumns: 1, // the minimum columns the grid must have
            minRows: 5, // the minimum height of the grid, in rows
            maxRows: 100,
            resizable: {
               enabled: true,
               handles: 'n, e, s, w, ne, se, sw, nw',
               start: function(event, uiWidget, $element) {}, // optional callback fired when resize is started,
               resize: function(event, uiWidget, $element) {}, // optional callback fired when item is resized,
               stop: function(event, uiWidget, $element) {} // optional callback fired when item is finished resizing
            }
        };

    });
