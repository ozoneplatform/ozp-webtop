'use strict';

/**
 * GridController retrieves the state of a number of tiles and binds it to an Angular scope.
 *
 * @namespace controllers
 * @class GridController
 * @constructor
 */
angular.module('ozpWebtopApp.dashboardView')

.controller('GridController', function ($scope, WorkspaceState) {

  // GET the state of the grid
  WorkspaceState.getStateFile('tiles').then(function (data) {
    $scope.grid = data.tiles;
  });

  $scope.customItemMap = {
    sizeX: 'item.sizex',
    sizeY: 'item.sizey',
    row: 'item.row',
    col: 'item.col'
  };

  $scope.gridOptions =  {
    columns: 6, // the width of the grid, in columns
    pushing: true, // whether to push other items out of the way on move or resize
    floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
    width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
    colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
    //rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
    margins: [5, 5], // the pixel distance between each widget
    isMobile: false, // stacks the grid items if true
    minColumns: 1, // the minimum columns the grid must have
    minRows: 1, // the minimum height of the grid, in rows
    maxRows: 10,
    resizable: {
      enabled: true,
      handles: 'n, e, s, w, ne, se, sw, nw',
      // TODO: breaking jshint
      start: function(/*event, uiWidget, $element*/) {}, // optional callback fired when resize is started,
      resize: function(/*event, uiWidget, $element*/) {
        console.log(event);
        console.log(/*uiWidget*/);
        console.log(/*$element*/);
      }, // optional callback fired when item is resized,
      stop: function(/*event, uiWidget, $element*/) {} // optional callback fired when item is finished resizing
    },
    draggable: {
      enabled: true, // whether dragging items is supported
      handle: 'div.ozp-chrome, div.ozp-chrome > .chrome-icon, div.ozp-chrome > .chrome-name', // optional selector for resize handle
      start: function(/*event, uiWidget, $element*/) {}, // optional callback fired when drag is started,
      drag: function(/*event, uiWidget, $element*/) {}, // optional callback fired when item is moved,
      stop: function(/*event, uiWidget, $element*/) {} // optional callback fired when item is finished dragging
    }
  };

});
