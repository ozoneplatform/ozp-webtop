'use strict';

/**
 * GridController retrieves the state of a number of tiles and binds it to an Angular scope.
 *
 * @namespace controllers
 * @class GridController
 * @constructor
 */
angular.module('ozpWebtopApp.dashboardView')

.controller('GridController', function ($scope, $rootScope, $location, dashboardApi, marketplaceApi, dashboardChangeMonitor) {

  // Get state of the dashboard grid
  $scope.dashboards = dashboardApi.getAllDashboards().dashboards;

  dashboardChangeMonitor.run();
  $scope.$on('dashboardChange', function(event, data) {
    console.log('current dashboard: ' + data.dashboardIndex);
    $scope.currentDashboardIndex = data.dashboardIndex;
    // console.log('grid.js received dashboard change msg: ' + JSON.stringify(data));
  });

  // TODO: Originally tried sending broadcast events from dashboardChangeMonitor,
  // but that did not work out - led to lots of problems such as the desktop
  // and grid controllers not being loaded/unloaded properly. So instead, we'll
  // just reach into the internal state of the dashboardChangeMonitor to get
  // this info and use $watch on $location.path to trigger the update. To
  // see what happens, just uncomment the console.logs in $on.(...) in
  // grid.js and desktop.js
  $scope.$watch(function() {
    return $location.path();
  }, function() {
    updateDashboard();
  });

  function updateDashboard() {
    // Get the dashboard index
    var dashboardIndex = dashboardChangeMonitor.dashboardIndex;

    for (var i=0; i < $scope.dashboards.length; i++) {
      if ($scope.dashboards[i].index.toString() === dashboardIndex) {
        $scope.currentDashboard = $scope.dashboards[i];
        $scope.currentDashboardIndex = $scope.currentDashboard.index;
        $scope.apps = $scope.currentDashboard.apps;

        // TODO: There should be a method in Marketplace to get only my apps
        var allApps = marketplaceApi.getAllApps();
        // Merge application data (app name, icons, descriptions, url, etc)
        // with dashboard app data
        dashboardApi.mergeApplicationData($scope.apps, allApps);

        // update pixel size of apps
        for (var j=0; j < $scope.apps.length; j++) {
          $scope.updateWidgetPixelSize($scope.apps[j].uuid);
        }

        $scope.customItemMap = {
          sizeX: 'item.gridLayout.sizeX',
          sizeY: 'item.gridLayout.sizeY',
          row: 'item.gridLayout.row',
          col: 'item.gridLayout.col'
        };
      }
    }
    $rootScope.activeFrames = $scope.apps;
  }

  $scope.$watch('apps', function(apps){
    // This will be invoked every time a widget is resized (as the cursor
    // moves, not just once when the mouse button is released). So each time
    // a widget is 'temporarily' resized, this dashboardApi call is made for
    // each app on the dashboard.
    // TODO: This could be a performance issue
    console.log('apps changed');
    for (var j=0; j < apps.length; j++) {
      dashboardApi.updateCurrentDashboardGrid($scope.currentDashboardIndex,
        apps[j].uuid, apps[j].gridLayout.row, apps[j].gridLayout.col,
        apps[j].gridLayout.sizeX, apps[j].gridLayout.sizeY);
    }
  }, true);

  // TODO: broadcast a message with these grid options so other components
  // have access to the information


  $scope.gridOptions =  {
    columns: 6, // the width of the grid, in columns
    pushing: true, // whether to push other items out of the way on move or resize
    floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
    width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
    colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
    rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
    margins: [20, 20], // the pixel distance between each widget
    outerMargin: false, // from angular-gridster example
    isMobile: false, // stacks the grid items if true
    minColumns: 1, // the minimum columns the grid must have
    minRows: 1, // the minimum height of the grid, in rows
    maxRows: 10,
    resizable: {
      enabled: true,
      handles: 'n, e, s, w, ne, se, sw, nw',
      start: function(event, uiWidget) {
        var appUuid = uiWidget.element.context.id;
        for (var i=0; i < $scope.apps.length; i++) {
          if ($scope.apps[i].uuid === appUuid) {
            $scope.apps[i].gridLayout.width = 100;
            $scope.apps[i].gridLayout.height = 100;
          }
        }
      }, // optional callback fired when resize is started,
      resize: function(/*event, uiWidget, $element */) {
      }, // optional callback fired when item is resized,
      stop: function(event, uiWidget){
        // The dimensions reported by uiWidget are wrong - use custom function
        // to calculate new size
        var appUuid = uiWidget.element.context.id;
        var widgetSize = $scope.updateWidgetPixelSize(appUuid);

        // send the message so the app can adjust their contents appropriately
        $rootScope.$broadcast('gridSizeChanged', {
          'height': widgetSize.height,
          'width': widgetSize.width
        });
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

  // necessary because the built-in angular-gridster method that calculates a
  // grid tile's size after resizing does not yield the correct result
  $scope.calculateWidgetSize = function(appUuid) {
    console.log('detected resize for app ' + appUuid);
    // padding on left and right sides of container
    var gridsterContainerPadding = 15;
    var cols = $scope.gridOptions.columns;
    var windowWidth = window.innerWidth;
    var colMargin = $scope.gridOptions.margins[0];
    var totalWorkingWidth = windowWidth - 2*gridsterContainerPadding - (cols-1)*colMargin;
    var baseWidgetWidth = totalWorkingWidth/cols;
    // assume row margins and height are same as for columns
    var baseWidgetHeight = baseWidgetWidth;

    var appInfo = dashboardApi.getAppInfo($scope.currentDashboardIndex, appUuid);
    var sizeX = appInfo.gridLayout.sizeX;
    var sizeY = appInfo.gridLayout.sizeY;
    var widgetWidth = baseWidgetWidth * sizeX + (colMargin*(sizeX-1));
    var widgetHeight = baseWidgetHeight * sizeY + (colMargin*(sizeY-1));
    console.log('Manually calculated widget height: ' + widgetHeight + ', width: ' + widgetWidth);
    return {
      'height': widgetHeight,
      'width': widgetWidth
    };
  };

  $scope.updateWidgetPixelSize = function(appUuid) {
    var widgetSize = $scope.calculateWidgetSize(appUuid);
      // update this widget's state to save its size
      dashboardApi.updateAppSize($scope.currentDashboardIndex, appUuid, widgetSize.width, widgetSize.height);
      for (var i=0; i < $scope.apps.length; i++) {
        if ($scope.apps[i].uuid === appUuid) {
          $scope.apps[i].gridLayout.width = widgetSize.width - 10;  // for good measure
          $scope.apps[i].gridLayout.height = widgetSize.height - 30;  // minus height of chrome
          return widgetSize;

        }
      }
  };

});
