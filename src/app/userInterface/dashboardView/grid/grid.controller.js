'use strict';

/**
 * Grid layout main controller
 *
 * @module ozpWebtop.dashboardView.grid
 * @requires ozp.common.windowSizeWatcher
 * @requires ozpWebtop.constants
 * @requires ozpWebtop.models
 *
 */
angular.module('ozpWebtop.dashboardView.grid', [
  'ozp.common.windowSizeWatcher', 'ozpWebtop.constants',
  'ozpWebtop.models']);

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
 * @param {Object} $interval the Angular interval service
 * @param {Object} $q the Angular q service
 * @param {Object} $timeout the Angular timeout service
 * @param {Object} models the API for dashboard information
 * @param {Object} windowSizeWatcher service that notifies on window size
 * changes
 * @param {String} deviceSizeChangedEvent event name
 * @param {String} windowSizeChangedEvent event name
 * @param {String} dashboardStateChangedEvent event name
 * @param {String} fullScreenModeToggleEvent event name
 * @param {String} highlightFrameOnGridLayoutEvent event name
 */
angular.module('ozpWebtop.dashboardView.grid')

.controller('GridCtrl', function ($scope, $rootScope,
                                  $interval, $q, $timeout, $log, $sce, models,
                                  windowSizeWatcher, deviceSizeChangedEvent,
                                  windowSizeChangedEvent,
                                  dashboardStateChangedEvent,
                                  fullScreenModeToggleEvent,
                                  highlightFrameOnGridLayoutEvent,
                                  initialDataReceivedEvent,
                                  removeFramesOnDeleteEvent) {

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                            $scope properties
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * @property deviceSize Current screen size (xs, sm, md, lg)
     * @type {string}
     */
    $scope.deviceSize = '';

    /**
     * @property frames Frames (widgets/apps) on the current dashboard
     * @type {Array}
     */
    $scope.frames = [];

    /**
     * @property apps Applications in the marketplace
     * @type {Array}
     */
    $scope.apps = [];

    /**
     * @property fullScreenMode Flag for full screen mode
     * @type {boolean}
     */
    $scope.fullScreenMode = false;

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

    var initialized = false;

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
      margins: [5, 5],
      // don't apply margins to outside of grid
      outerMargin: true,
      // stacks the grid items if true
      isMobile: false,
      // the minimum columns the grid must have
      minColumns: 1,
      // the minimum height of the grid, in rows
      minRows: 1,
      maxRows: 25,
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

    // initialize device size
    $scope.deviceSize = windowSizeWatcher.getCurrentSize();
    if ($scope.deviceSize === 'lg') {
      $scope.deviceSize = 'md';
      $log.debug('size changed from lg to md');
    }

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
    $scope.$on(dashboardStateChangedEvent, function(event, value) {
      if (value.dashboardId === $scope.dashboardId && value.layout === 'grid') {
        $scope.handleDashboardChange();
      }
    });

    // user settings have changed
    $scope.$on(fullScreenModeToggleEvent, function(event, data) {
      $scope.fullScreenMode = data.fullScreenMode;
    });

    // an app's icon was clicked in the app toolbar. highlight (toggle
    // highlighting for this frame and scroll page so it's visible
    $scope.$on(highlightFrameOnGridLayoutEvent, function(event, data) {
      for (var i=0; i < $scope.frames.length; i++) {
        if ($scope.frames[i].id === data.frameId) {
          if (!$scope.frames[i].highlighted) {
            $scope.frames[i].highlighted = true;
            // TODO: use of global variable instead of $window service (which
            // didn't work on the scrollTop method), and modification of the
            // DOM from a controller is naughty
            var top = angular.element('#' + data.frameId).offset().top;
            $(window).scrollTop(top - 70);
            $timeout(removeFrameHighlight, 500);
            $scope.frameIndexToUnhighlight = i;
          } else {
            $scope.frames[i].highlighted = false;
          }
        }
      }
    });

    // Cycles through all frames in the dashboard and drives their url's to about:blank to free up resources
    // and remove IWC bus connections.
    $scope.$on(removeFramesOnDeleteEvent,function(event,data){
       if($scope.dashboardId === data.dashboardId){
           for(var i=0; i<$scope.frames.length;i++){
               $scope.frames[i].trustedUrl = $sce.trustAsResourceUrl('about:blank');
           }
           //let the frame's unload events trigger, then remove them.
           $timeout(function(){
               $scope.frames = [];
           },25);
       }
    });

    function removeFrameHighlight () {
      $scope.frames[$scope.frameIndexToUnhighlight].highlighted = false;
    }

    $scope.$on('$stateChangeSuccess',
      function(event, toState, toParams/*, fromState, fromParams*/){
        $scope.handleStateChangeSuccess(event, toState, toParams);
      }
    );

    $scope.handleStateChangeSuccess = function(event, toState, toParams) {
      if (!models.dataCached()) {
        $log.warn('GridCtrl: delaying call to handleStateChangeSuccess by 500ms - no data yet');
        $scope.handleStateChangeSuccessInterval = $interval(function() {
          $scope.handleStateChangeSuccess(event, toState, toParams);
        }, 500, 1);
        return;
      }
      if ($scope.handleStateChangeSuccessInterval) {
        $interval.cancel($scope.handleStateChangeSuccessInterval);
      }

      var layoutType = '';
      if (toState.name.indexOf('grid-sticky') > -1) {
        layoutType = 'grid';
      } else if (toState.name.indexOf('desktop-sticky') > -1) {
        layoutType = 'desktop';
      } else {
        return;
      }
      if (layoutType !== 'grid') {
        return;
      }
      if (initialized && toParams.dashboardId === $scope.dashboardId) {
        // if widgets were added to this dashboard in desktop layout, those
        // same widgets need to be added to this layout as well
        $scope.handleDashboardChange();
        return;
      }
      if (initialized && toParams.dashboardId !== $scope.dashboardId) {
        return;
      }
      $scope.dashboardId = toParams.dashboardId;
      models.setCurrentDashboard($scope.dashboardId);

      $scope.reloadDashboard();
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                          methods
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    function initializeData() {
      if (!models.dataCached()) {
        $log.warn('GridCtrl: delaying initialization by 500ms - no data yet');
        $scope.initInterval = $interval(function() {
          initializeData();
        }, 500, 1);
        return;
      }
      $scope.apps = models.getApplicationData();
    }

    initializeData();

    /**
     * Handle start event resizing a widget on Gridster
     *
     * @method handleGridsterResizeStart
     * @param uiWidget Gridster widget
     */
    function handleGridsterResizeStart(uiWidget) {
      // reduce the size of the frame when resizing is started so that
      // gridster behaves itself
      // TODO will probably need a workaround for ie9
      (uiWidget.element).css('pointer-events','none');
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
    $scope.handleDashboardChange = function() {
      if (!models.dataCached()) {
        $log.warn('GridCtrl: delaying call to handleDashboardChange by 500ms - no data yet');
        $scope.handleDashboardChangeInterval = $interval(function() {
          $scope.handleDashboardChange();
        }, 500, 1);
        return;
      }
      if ($scope.handleDashboardChangeInterval) {
        $interval.cancel($scope.handleDashboardChangeInterval);
      }
      var dashboard = models.getDashboardById($scope.dashboardId);
      if ($scope.frames === dashboard.frames) {
        return;
      }

      // save the original frames for use later on
      var originalFrames = $scope.frames.slice();

      // remove old frames from the view
      var originalFramesCopy = originalFrames.slice();

      //Push the iframe to about:blank to let the frame handle its unload
      var asyncRemoveFrame = function(i){
        $scope.frames[i].trustedUrl = $sce.trustAsResourceUrl('about:blank');
        $timeout(function(){
          $scope.frames.splice(i,1);
        },25);
      };

      for (var i=0; i < originalFramesCopy.length; i++) {
        var removeFrame = true;
        for (var j=0; j < dashboard.frames.length; j++) {
          if (originalFramesCopy[i].id === dashboard.frames[j].id) {
            removeFrame = false;
          }
        }
        if (removeFrame) {
          asyncRemoveFrame(i);
        }
      }

      // Make a list of frames to add to the view
      var framesToAdd = [];
      for (var k=0; k < dashboard.frames.length; k++) {
        var addFrame = true;
        for (var l=0; l < originalFrames.length; l++) {
          if (dashboard.frames[k].id === originalFrames[l].id) {
            angular.merge($scope.frames[l], dashboard.frames[k]);
            addFrame = false;
          }
        }
        if (addFrame) {
          framesToAdd.push(dashboard.frames[k]);
        }
      }

      if (framesToAdd.length > 0) {
        var updateNewFrames = function (frame) {
          // push that frame to the local scope. since the changes are
          // automatically bound with the view, no refresh required
          $scope.frames.push(frame);
          // now merge my local scope for frames with the
          // marketplace api to get important stuff on local scope
          // like url, image, name, etc
          models.mergeApplicationData($scope.frames);
        };

        // add the frames
        for (var m=0; m < framesToAdd.length; m++) {
          updateNewFrames(framesToAdd[m]);
        }
        // reloadDashboard completed
        $timeout(function() {$log.debug('$timeout to apply scope');}, 50);
      }
    };

    /**
     * Reloads the current dashboard
     *
     * @method reloadDashboard
     * @returns true if dashboard was found
     */
    $scope.reloadDashboard = function() {
      var dashboard = models.getDashboardById($scope.dashboardId);
      if (!dashboard) {
        $log.warn('Dashboard changed, but dashboard does not exist');
        return;
      }
      $scope.dashboard = dashboard;
      // Get frames on this dashboard
      $scope.frames = $scope.dashboard.frames;

      // Merge application data (app name, icons, descriptions, url, etc)
      // with dashboard app data
      models.mergeApplicationData($scope.frames);
      initialized = true;
    };

    /**
     * Update a single frame after a change (move or resize) has occurred
     *
     * @method updateFrameAfterChange
     * @param {Object} frame The frame to update
     * @returns {String} frame id that was updated
     */
    $scope.updateFrameAfterChange = function(frame) {
      // save the basic grid settings
      var frameId = models.updateGridFrame(frame.id, frame.gridLayout);
      if (!frameId) {
        $log.error('ERROR: could not update grid frame');
        return;
      }
      return frameId;
    };

    /**
     * Update all frames after the user finishes moving or resizing a frame
     *
     * @method updateAllFramesAfterChange
     * @returns {}
     */
    $scope.updateAllFramesAfterChange = function() {
      var frames = $scope.frames;
      for (var i=0; i < frames.length; i++) {
        $scope.updateFrameAfterChange(frames[i]);
      }
    };
});
