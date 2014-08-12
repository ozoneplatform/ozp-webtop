'use strict';

/**
 * GridController retrieves the state of a number of tiles and binds it to an Angular scope.
 *
 * @namespace controllers
 * @class GridController
 * @constructor
 */
angular.module('ozpWebtopApp.dashboardView')

.controller('GridController', function ($scope, $rootScope, dashboardApi, marketplaceApi) {

  // Get state of the dashboard grid
  $scope.dashboards = dashboardApi.getAllDashboards().dashboards;

  // TODO: get this index from the URL
  var dashboardIndex = '0';
    for (var i=0; i < $scope.dashboards.length; i++) {
      if ($scope.dashboards[i].index.toString() === dashboardIndex) {
        $scope.currentDashboard = $scope.dashboards[i];
        $scope.currentDashboardIndex = $scope.currentDashboard.index;
        console.log('loading dashboard ' + dashboardIndex);
        $scope.apps = $scope.currentDashboard.apps;
        console.log('reloading GridCtrl for dashboard ' + $scope.currentDashboard);

        // get app data
        // TODO: There should be a method in Marketplace to get only my apps
        var allApps = marketplaceApi.getAllApps();
        for (i = 0; i < allApps.length; i++) {
          // check if this app is on our dashboard
          for (var j = 0; j < $scope.apps.length; j++) {
            if ($scope.apps[j].uuid === allApps[i].uuid) {
              // if it is, then get all relevant info
              $scope.apps[j].icon = allApps[i].icon;
              $scope.apps[j].url = allApps[i].url;
              $scope.apps[j].name = allApps[i].name;
              $scope.apps[j].shortDescription = allApps[i].shortDescription;
            }
          }
        }

        $scope.customItemMap = {
          sizeX: 'item.gridLayout.sizex',
          sizeY: 'item.gridLayout.sizey',
          row: 'item.gridLayout.row',
          col: 'item.gridLayout.col'
        };
      }
    }

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
        // console.log(event);
        // console.log(uiWidget);
        // console.log(/*$element*/);
      }, // optional callback fired when item is resized,
      // stop: function(/*event, uiWidget, $element*/) {
      stop: function(event, uiWidget, $element){
        console.log(event);
        console.log(uiWidget);
        console.log($element);
      } // optional callback fired when item is finished resizing
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
