'use strict';

/**
 * GridController retrieves the state of a number of tiles and binds it to an
 * Angular scope.
 *
 * @namespace dashboardView
 * @class GridController
 * @constructor
 * @param {Object} $scope an Angular scope
 * @param {Object} $rootScope the Angular root scope
 * @param {Object} $location the Angular location service
 * @param {Object} dashboardApi the API for dashboard information
 * @param {Object} marketplaceApi the API for marketplace application information
 * @param {Object} dashboardChangeMonitor the service that monitors dashboard changes
 */
angular.module('ozpWebtopApp.dashboardView')

.controller('GridController', function ($scope, $rootScope, $location,
                                        dashboardApi, marketplaceApi,
                                        dashboardChangeMonitor, userSettingsApi) {

    if(!$scope.dashboards){
      dashboardApi.getDashboards().then(function(dashboards) {
        $scope.dashboards = dashboards;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    }
    dashboardChangeMonitor.run();

    // The applications/widgets on the grid view
    $scope.frames = $scope.dashboards[0].frames;  // to make tests happy

    // Make an array of old frames and new frames
    $scope.newFrames = [];
    $scope.oldFrames = [];

    $scope.$on('dashboard-change', function() {
      var currentDashboard = dashboardChangeMonitor.dashboardId;

      dashboardApi.getDashboards().then(function(dashboards) {
        $scope.dashboards = dashboards;
        if ($scope.frames !== $scope.dashboards[currentDashboard].frames) {
          for (var i=0; i < $scope.frames.length; i++) {
            $scope.oldFrames.push($scope.frames[i].appId);
          }
          for (var j=0; j < $scope.dashboards[currentDashboard].frames.length; j++) {
            $scope.newFrames.push($scope.dashboards[currentDashboard].frames[j].appId);
          }

          // return just the differences between oldFrames and new Frames
          Array.prototype.diff = function(a) {
            // this
            return this.filter(function(i) {return a.indexOf(i) < 0;});
          };

          // add or remove new frames without reloading the entire scope
          // if there are items in the currentScope that are not in the updated
          // scope from the service, remove theme here
          if ($scope.oldFrames.diff($scope.newFrames).length > 0) {
            for (var a=0; a < $scope.frames.length; a++) {
              // if the removed frame is present, splice it out of the local scope
              if ($scope.frames[a].appId === $scope.oldFrames.diff($scope.newFrames)[0]) {
                $scope.frames.splice(a, 1);
              }
            }
          }
          //if there are new frames for this dashboard on the services that are
          // not in the local scope
          if ($scope.newFrames.diff($scope.oldFrames).length > 0) {
            // for item in the dashboardApi on the current Dashboard
            dashboardApi.getDashboardById(dashboardChangeMonitor.dashboardId).then(function(dashboard) {
              // if the item from the dashboard api matches the new frame we found in
              // this view
              dashboardApi.getDashboardById(dashboardChangeMonitor.dashboardId).then(function(dashboard) {
                // TODO: for loop with async call inside, not good
                for (var c=0; c < dashboard.frames.length; c++) {
                  if (dashboard.frames[c].appId === $scope.newFrames.diff($scope.oldFrames)[0]) {
                    // push that frame to the local scope. since the changes are
                    // automatically bound with the view, no refresh required
                    $scope.frames.push(dashboard.frames[c]);
                    // update the frame size so it fits inside its little widget boundary
                    $scope.updateGridFrameSize(dashboard.frames[c].id).then(function() {
                      // update finished
                    }).catch(function (error) {
                      console.log('should not have happened: ' + error);
                    });
                    // now quickly merge my local scope for frames with the marketplace
                    // api to get important stuff on local scope like url, image, name,
                    // etc
                    dashboardApi.mergeApplicationData($scope.frames, marketplaceApi.getAllApps());
                  }
                }
              }).catch(function (error) {
                console.log('should not have happened: ' + error);
              });
            }).catch(function (error) {
              console.log('should not have happened: ' + error);
            });
          }
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });

    });

    $scope.bringInNewFrames = function(frame) {

    };


    $scope.$on('userSettings-change', function() {
      if (userSettingsApi.getUserSettings().isAppboardHidden === true) {
        $scope.appBarHidden = true;
      }
      else {
        $scope.appBarHidden = false;
      }
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
      $scope.reloadDashboard().then(function() {
        // dashboard reloaded
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    });

    /**
     *
     * Calculates the size of a frame, saves it, and sends a gridSizeChanged
     * message
     *
     * @param {String} frameId Id of the frame to update
     * @returns {Promise} fulfilled with boolean true if frame was updated
     *                    successfully
     */
    $scope.updateDashboardFramePx = function(frameId) {
      // the dimensions reported by uiWidget are wrong - use custom function
      // to calculate new size (pixels)
      var widgetSize = $scope.updateLocalGridFrameSize(frameId);
      // save the changes
      return dashboardApi.updateFrameSizeOnGrid(widgetSize.id, widgetSize.width,
        widgetSize.height).then(function(update) {
          if (!update) {
            console.log('Error updating framesize on grid');
          }

          $rootScope.$broadcast('gridSizeChanged', {
            'frameId': widgetSize.id,
            'height': widgetSize.height,
            'width': widgetSize.width
          });

          // TODO: clean this up
          $rootScope.activeFrames = $scope.frames;

      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    };

    /**
     * Reloads the current dashboard
     * @returns {Promise} Promise fulfilled with Boolean, true if dashboard was
     *                    found
     */
    $scope.reloadDashboard = function() {
      // Get the dashboard
      $scope.dashboardId = dashboardChangeMonitor.dashboardId;
      return dashboardApi.getDashboardById($scope.dashboardId).then(function (dashboard) {
        if (!dashboard) {
          console.log('Dashboard changed, but dashboard does not exist');
          return;
        }
        $scope.dashboard = dashboard;
        // Get frames on this dashboard
        $scope.frames = $scope.dashboard.frames;

        // TODO: There should be a method in Marketplace to get only my apps
        var allApps = marketplaceApi.getAllApps();
        // Merge application data (app name, icons, descriptions, url, etc)
        // with dashboard app data
        dashboardApi.mergeApplicationData($scope.frames, allApps);

        // calculate the size (in px) for each frame and send an update message
        $scope.frames.reduce(function (previous, current) {
          return previous.then(function () {
            var promise = $scope.updateDashboardFramePx(current.id);
            return promise;
          }).catch(function (error) {
            console.log('should not have happened: ' + error);
          });
        }, Promise.resolve()).then(function () {
            // reloadDashboard completed
        });
      }).catch(function (error) {
        console.log('should not have happened: ' + error);
      });
    };

    /**
     * Update a single frame after a change (move or resize) has occurred
     * @param {Object} frame The frame to update
     * @returns {Promise} Promise fulfilled with the frame id that was updated
     */
    $scope.updateFrameAfterChange = function(frame) {
      // save the basic grid settings
      return dashboardApi.updateGridFrame(frame.id, frame.gridLayout.row,
        frame.gridLayout.col, frame.gridLayout.sizeX,
        frame.gridLayout.sizeY).then(function(frameId) {
          if (!frameId) {
            console.log('ERROR: could not update grid frame');
            return;
          }
          return $scope.updateDashboardFramePx(frameId);
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
    };

    /**
     * Update all frames after the user finishes moving or resizing a frame
     */
    $scope.updateAllFramesAfterChange = function() {
      var frames = $scope.frames;
      frames.reduce(function(previous, current) {
      return previous.then(function() {
        var promise = $scope.updateFrameAfterChange(current);
        return promise;
      });
      }, Promise.resolve()).then(function() {
        // finished updating all frames
      });
    };

    // TODO: broadcast a message with these grid options so other components
    // have access to the information

    // Gridster options/configuration
    $scope.gridOptions =  {
      columns: 6, // the width of the grid, in columns
      pushing: true, // whether to push other items out of the way on move or resize
      floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
      width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
      colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
      rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
      margins: [20, 20], // the pixel distance between each widget
      outerMargin: false, // don't apply margins to outside of grid
      isMobile: false, // stacks the grid items if true
      minColumns: 1, // the minimum columns the grid must have
      minRows: 1, // the minimum height of the grid, in rows
      maxRows: 10,
      resizable: {
        enabled: true,
        handles: 'n, e, s, w, ne, se, sw, nw',
        start: function(event, uiWidget) {
          // reduce the size of the frame when resizing is started so that
          // gridster behaves itself
          var frameId = uiWidget.element.context.id;
          for (var i=0; i < $scope.frames.length; i++) {
            if ($scope.frames[i].id === frameId) {
              // trying to do something smarter here didn't work out well - be
              // sure to perform ample testing if these values are changed
              $scope.frames[i].gridLayout.width = 100;
              $scope.frames[i].gridLayout.height = 100;

              $rootScope.$broadcast('gridSizeChanged', {
                'frameId': frameId,
                'height': 100,
                'width': 100
              });
            }
          }
        }, // optional callback fired when resize is started,
        resize: function(/*event, uiWidget, $element */) {
        }, // optional callback fired when item is resized,
        stop: function(/*event, uiWidget*/){
          $scope.updateAllFramesAfterChange();
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

    /**
     * Calculates the size in pixels for a given frame
     * Necessary because the built-in angular-gridster method that calculates a
     * grid tile's size after resizing does not yield the correct results.
     *
     * Notes:
     *  hard-coded value of gridster container padding
     *  accesses $scope.gridOptions
     *
     *
     * @param {Object} frame The frame for which to calculate size
     * @returns {Object} height and width
     */
    $scope.calculateGridFrameSize = function(frame) {
      // determine container properties

      // padding on left and right sides of container
      var gridsterContainerPadding = 15;
      var cols = $scope.gridOptions.columns;
      var windowWidth = window.innerWidth;
      var colMargin = $scope.gridOptions.margins[0];
      var totalWorkingWidth = windowWidth - 2*gridsterContainerPadding -
        (cols-1)*colMargin;
      var baseWidgetWidth = totalWorkingWidth/cols;
      // assume row margins and height are same as for columns
      var baseWidgetHeight = baseWidgetWidth;

      // now take the frame into account
      var sizeX = frame.gridLayout.sizeX;
      var sizeY = frame.gridLayout.sizeY;
      var widgetWidth = baseWidgetWidth * sizeX + (colMargin*(sizeX-1));
      // Make small adjustment to width
      widgetWidth -= 2*sizeX;
      var widgetHeight = baseWidgetHeight * sizeY + (colMargin*(sizeY-1));
      return {
        'height': widgetHeight,
        'width': widgetWidth
      };
    };

    /**
     * Update the widget's pixel size on the grid (this update is local, the
     * data is not persisted to the dashboard api)
     *
     * @param {String} frameId The id of the frame for which to update size
     * @returns {Object} widget size (height and width) and the frame id
     */
    $scope.updateLocalGridFrameSize = function(frameId) {
      for (var i = 0; i < $scope.frames.length; i++) {
        if ($scope.frames[i].id === frameId) {
          var widgetSize = $scope.calculateGridFrameSize($scope.frames[i]);
          widgetSize.width -= 10;   // for good measure
          widgetSize.height -= 30;  // minus height of chrome
          widgetSize.id = frameId;
          $scope.frames[i].gridLayout.width = widgetSize.width;
          $scope.frames[i].gridLayout.height = widgetSize.height;
          return widgetSize;
        }
      }
    };

});
