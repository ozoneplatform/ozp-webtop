'use strict';

/**
 * Controller managing the frames in the grid layout
 *
 * ngtype: controller
 *
 * @namespace dashboardView
 * @class GridCtrl
 * @constructor
 * @param {Object} $scope an Angular scope
 * @param {Object} $rootScope the Angular root scope
 * @param {Object} $location the Angular location service
 * @param {Object} $interval the Angular interval service
 * @param {Object} dashboardApi the API for dashboard information
 * @param {Object} marketplaceApi the API for marketplace application
 * information
 * @param {Object} dashboardChangeMonitor the service that monitors dashboard
 * changes
 * @param {Object} userSettingsApi the API for user settings
 * @param {Object} windowSizeWatcher service that notifies on window size
 * changes
 * @param {String} deviceSizeChangedEvent event name
 * @param {String} windowSizeChangedEvent event name
 * @param {String} dashboardStateChangedEvent event name
 * @param {String} toolbarVisibilityChangedEvent event name
 * @param {String} gridFrameSizeChangeEvent event name
 */
angular.module('ozpWebtopApp.dashboardView')

.controller('GridCtrl', function ($scope, $rootScope, $location,
                                  $interval, dashboardApi, marketplaceApi,
                                  dashboardChangeMonitor, userSettingsApi,
                                  windowSizeWatcher, deviceSizeChangedEvent,
                                  windowSizeChangedEvent,
                                  dashboardStateChangedEvent,
                                  toolbarVisibilityChangedEvent,
                                  gridFrameSizeChangeEvent) {

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                            $scope properties
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * @property deviceSize Current screen size (xs, sm, md, lg)
     * @type {string}
     */
    $scope.deviceSize = '';

    /**
     * @property dashboards User's dashboards
     * @type {Array}
     */
    $scope.dashboards = [];

    /**
     * @property frames Frames (widgets/apps) on the current dashboard
     * @type {Array}
     */
    $scope.frames = [];

    /**
     * @property apps Applications in the marketplace
     * TODO: only need the apps the user has favorited
     * @type {Array}
     */
    $scope.apps = [];

    /**
     * @property appBarHidden Flag indicating whether the application toolbar
     * is hidden
     * @type {boolean}
     */
    $scope.appBarHidden = false;

    /**
     * @property activeFrames TODO clean this up
     * @type {Array}
     */
    $scope.activeFrames = [];

    /**
     * @property dashboard Current dashboard
     * @type {{}}
     */
    $scope.dashboard = {};

    /**
     * @property dashboardId Current dashboardId
     * TODO: duplicate info?
     * @type {string}
     */
    $scope.dashboardId = '';

    /**
     * @property intervalPromise promise returned by $interval (keep track of it
     * so it can be canceled)
     */
    var intervalPromise;

    /**
     * @property gridOptions Configuration options for Gridster
     * TODO: make these available to other components somehow
     * @type {Object}
     */
    $scope.gridOptions =  {
      // the width of the grid, in columns
      columns: 6,
      // whether to push other items out of the way on move or resize
      pushing: true,
      // whether to automatically float items up so they stack (you can
      // temporarily disable if you are adding unsorted items with ng-repeat)
      floating: true,
      // can be an integer or 'auto'. 'auto' scales gridster to be the full
      // width of its containing element
      width: 'auto',
      // can be an integer or 'auto'.  'auto' uses the pixel width of the
      // element divided by 'columns'
      colWidth: 'auto',
      // can be an integer or 'match'.  Match uses the colWidth, giving you
      // square widgets.
      rowHeight: 'match',
      // the pixel distance between each widget
      margins: [20, 20],
      // don't apply margins to outside of grid
      outerMargin: false,
      // stacks the grid items if true
      isMobile: false,
      // the minimum columns the grid must have
      minColumns: 1,
      // the minimum height of the grid, in rows
      minRows: 1,
      maxRows: 10,
      resizable: {
        enabled: true,
        handles: 'n, e, s, w, ne, se, sw, nw',
        start: function(event, uiWidget) {
          handleGridsterResizeStart(uiWidget);
        }, // optional callback fired when resize is started,
        resize: function(/*event, uiWidget, $element */) {
        }, // optional callback fired when item is resized,
        stop: function(event, uiWidget){
          handleGridsterResizeStop(uiWidget);
        } // optional callback fired when item is finished resizing
      },
      draggable: {
        // whether dragging items is supported
        enabled: true,
        // optional selector for resize handle
        handle: 'div.ozp-chrome, div.ozp-chrome > .chrome-icon, ' +
          'div.ozp-chrome > .chrome-name',
        // optional callback fired when drag is started,
        start: function(/*event, uiWidget, $element*/) {},
        // optional callback fired when item is moved,
        drag: function(/*event, uiWidget, $element*/) {},
        stop: function(/*event, uiWidget, $element*/) {
          $scope.updateAllFramesAfterChange();
        } // optional callback fired when item is finished dragging
      }
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                           initialization
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // Detect window resize events
    windowSizeWatcher.run();

    // receive notification when the current dashboard changes (via URL)
    dashboardChangeMonitor.run();

    // initialize device size
    $scope.deviceSize = windowSizeWatcher.getCurrentSize();
    if ($scope.deviceSize === 'lg') {
      $scope.deviceSize = 'md';
      console.log('size changed from lg to md');
    }

    // retrieve the user's dashboards
    if(!$scope.dashboards){
      dashboardApi.getDashboards().then(function(dashboards) {
        $scope.dashboards = dashboards;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    }

    // get application data
    marketplaceApi.getAllApps().then(function(apps) {
      $scope.apps = apps;
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });

    // Initialize grid columns based on screen size
    if (windowSizeWatcher.getCurrentSize() === 'sm') {
      $scope.gridOptions.columns = 3;
    }

    // notified each time the window is resized, but only want to redraw when
    // user has finished resizing (or at least as few times as possible)
    $scope.$on(windowSizeChangedEvent, function() {
      handleWindowPxSizeChange();
    });

    // notified whenever the screen size changes past device size boundaries
    // as defined by Bootstrap (xs, sm, md, lg)
    $scope.$on(deviceSizeChangedEvent, function(event, value) {
      handleDeviceSizeChange(value);
    });

    // current dashboard changed
    $scope.$on(dashboardStateChangedEvent, function() {
      handleDashboardChange();
    });

    // user settings have changed
    $scope.$on(toolbarVisibilityChangedEvent, function() {
      handleToolbarVisibilityChange();
    });

    // TODO: Originally tried sending broadcast events from
    // dashboardChangeMonitor, but that did not work out - led to lots of
    // problems such as the desktop and grid controllers not being
    // loaded/unloaded properly. So instead, we'll just reach into the internal
    // state of the dashboardChangeMonitor to get this info and use $watch on
    // $location.path to trigger the update. To see what happens, just
    // uncomment the console.logs in $on.(...) in grid.js and desktop.js
    $scope.$watch(function() {
      return $location.path();
    }, function() {
      $scope.reloadDashboard().then(function() {
        // dashboard reloaded
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                          methods
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Handle start event resizing a widget on Gridster
     *
     * @method handleGridsterResizeStart
     * @param uiWidget Gridster widget
     */
    function handleGridsterResizeStart(uiWidget) {
      // reduce the size of the frame when resizing is started so that
      // gridster behaves itself
      console.debug(uiWidget);
      // TODO will probably need a workaround for ie9
      (uiWidget.element).css('pointer-events','none');
      var frameId = uiWidget.element.context.id;
      for (var i=0; i < $scope.frames.length; i++) {
        if ($scope.frames[i].id === frameId) {
          // trying to do something smarter here didn't work out well - be
          // sure to perform ample testing if these values are changed
          $scope.frames[i].gridLayout.width = 100;
          $scope.frames[i].gridLayout.height = 100;

          $rootScope.$broadcast(gridFrameSizeChangeEvent, {
            'frameId': frameId,
            'height': 100,
            'width': 100
          });
        }
      }
    }

    /**
     * Handle stop event when resizing Gridster widget
     *
     * @method handleGridsterResizeStop
     * @param uiWidget
     */
    function handleGridsterResizeStop(uiWidget) {
      // TODO will probably need a workaround for ie9
      (uiWidget.element).css('pointer-events','auto');
      $scope.updateAllFramesAfterChange();
    }

    /**
     * Handler for windowSizeChangedEvent (each time the window size
     * changes, even by a single pixel)
     *
     * Cancels the existing $interval promise and creates a new one to update
     * all frames in 200ms
     *
     * @method handleWindowSizeChange
     */
    function handleWindowPxSizeChange() {
      $interval.cancel(intervalPromise);
      intervalPromise = $interval($scope.updateAllFramesAfterChange, 200, 1);
    }

    /**
     * Handles the deviceSizeChangedEvent, which occurs whenever the
     * screen size changes device sizes (as defined by Bootstrap)
     *
     * @method handleDeviceSizeChange
     * @param {Object} value value.deviceSize is one of 'xs', 'sm', 'md', or
     * 'lg'
     */
    function handleDeviceSizeChange(value) {
      if (value.deviceSize === 'sm') {
        $scope.deviceSize = value.deviceSize;
        $scope.gridOptions.columns = 3;
        $scope.updateAllFramesAfterChange();
      } else if (value.deviceSize === 'md') {
          $scope.deviceSize = value.deviceSize;
          $scope.gridOptions.columns = 6;
          $scope.updateAllFramesAfterChange();
      } else if (value.deviceSize === 'lg') {
          $scope.deviceSize = 'md'; // TODO: for now, md == lg
          $scope.gridOptions.columns = 6;
          $scope.updateAllFramesAfterChange();
      }
    }

    /**
     * Handle the dashboardStateChangedEvent
     *
     * @method handleDashboardChange
     */
    function handleDashboardChange() {
      // Make an array of old frames and new frames
      var newFrames = [];
      var oldFrames = [];
      var currentDashboard = dashboardChangeMonitor.dashboardId;

      dashboardApi.getDashboards().then(function(dashboards) {
        $scope.dashboards = dashboards;
        if ($scope.frames !== $scope.dashboards[currentDashboard].frames) {
          for (var i=0; i < $scope.frames.length; i++) {
            oldFrames.push($scope.frames[i].id);
          }
          for (var j=0; j < $scope.dashboards[currentDashboard].frames.length;
               j++) {
            newFrames.push($scope.dashboards[currentDashboard].frames[j].id);
          }

          // return just the differences between oldFrames and new Frames
          Array.prototype.diff = function(a) {
            // this
            return this.filter(function(i) {return a.indexOf(i) < 0;});
          };

          // add or remove new frames without reloading the entire scope
          // if there are items in the currentScope that are not in the updated
          // scope from the service, remove theme here
          if (oldFrames.diff(newFrames).length > 0) {
            for (var a=0; a < $scope.frames.length; a++) {
              // if the removed frame is present, splice it out of the local
              // scope
              if ($scope.frames[a].id === oldFrames.diff(newFrames)[0]) {
                $scope.frames.splice(a, 1);
              }
            }
          }
          //if there are new frames for this dashboard on the services that are
          // not in the local scope
          if (newFrames.diff(oldFrames).length > 0) {
            // if the item from the dashboard api matches the new frame we found
            // in this view
            dashboardApi.getDashboardById(dashboardChangeMonitor.dashboardId).then(function(dashboard) {
              // TODO: for loop with async call inside, not good
              for (var c=0; c < dashboard.frames.length; c++) {
                if (dashboard.frames[c].id === newFrames.diff(oldFrames)[0]) {
                  // push that frame to the local scope. since the changes are
                  // automatically bound with the view, no refresh required
                  $scope.frames.push(dashboard.frames[c]);
                  // update the frame size so it fits inside its little widget
                  // boundary
                  // TODO: this might not behave as expected
                  $scope.updateDashboardFramePx(dashboard.frames[c].id);
                  // now quickly merge my local scope for frames with the
                  // marketplace api to get important stuff on local scope
                  // like url, image, name, etc
                  dashboardApi.mergeApplicationData($scope.frames, $scope.apps);
                }
              }
            }).catch(function (error) {
              console.log('should not have happened: ' + error);
            });
          }
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    }

    /**
     * Handle the toolbarVisibilityChangedEvent
     *
     * @method handleToolbarVisibilityChange
     */
    function handleToolbarVisibilityChange() {
      userSettingsApi.getUserSettings().then(function(settings) {
        if (settings.isAppboardHidden === true) {
          $scope.appBarHidden = true;
        } else {
          $scope.appBarHidden = false;
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    }

    /**
     *
     * Calculates the size of a frame, saves it, and sends a
     * gridFrameSizeChangeEvent event
     *
     * @method updateDashboardFramePx
     * @param {String} frameId Id of the frame to update
     * @returns {Promise} fulfilled with boolean true if frame was updated
     *                    successfully
     */
    $scope.updateDashboardFramePx = function(frameId) {
      // the dimensions reported by uiWidget are wrong - use custom function
      // to calculate new size (pixels)
      var widgetSize = $scope.updateLocalGridFrameSize(frameId);
      // save the changes
      if (!$scope.deviceSize) {
        console.log('WARNING: device size is undefined, setting to sm as ' +
          'default');
        $scope.deviceSize = 'sm';
      }
      return dashboardApi.updateFrameSizeOnGrid(widgetSize.id,
        $scope.deviceSize, widgetSize.width,
        widgetSize.height).then(function(update) {
          if (!update) {
            console.log('Error updating framesize on grid');
          }

          $rootScope.$broadcast(gridFrameSizeChangeEvent, {
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
     *
     * @method reloadDashboard
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

        // Merge application data (app name, icons, descriptions, url, etc)
        // with dashboard app data
        dashboardApi.mergeApplicationData($scope.frames, $scope.apps);

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
     *
     * @method updateFrameAfterChange
     * @param {Object} frame The frame to update
     * @returns {Promise} Promise fulfilled with the frame id that was updated
     */
    $scope.updateFrameAfterChange = function(frame) {
      // save the basic grid settings
      return dashboardApi.updateGridFrame(frame.id, frame.gridLayout).then(function(frameId) {
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
     *
     * @method updateAllFramesAfterChange
     * @returns {Promise} Promise fulfilled with TODO
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

    /**
     * Calculates the size in pixels for a given frame
     * Necessary because the built-in angular-gridster method that calculates a
     * grid tile's size after resizing does not yield the correct results.
     *
     * Notes:
     * - hard-coded value of gridster container padding
     * - accesses $scope.gridOptions
     *
     * @method calculateGridFrameSize
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
      var sizeX = frame.gridLayout[$scope.deviceSize].sizeX;
      var sizeY = frame.gridLayout[$scope.deviceSize].sizeY;
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
     * @method updateLocalGridFrameSize
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
