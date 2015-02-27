'use strict';

/**
 * Desktop layout main controller
 *
 * @module ozpWebtop.dashboardView.desktop
 * @requires ozpWebtop.constants
 * @requires ozpWebtop.models.dashboard
 * @requires ozpWebtop.models.marketplace
 * @requires ozpWebtop.models.userSettings
 */
angular.module('ozpWebtop.dashboardView.desktop', [
  'ozpWebtop.constants',
  'ozpWebtop.models.dashboard', 'ozpWebtop.models.marketplace',
  'ozpWebtop.models.userSettings']);

angular.module('ozpWebtop.dashboardView.desktop')
/**
 * Controller for managing apps/widgets in desktop layout on a dashboard
 *
 * ngtype: controller
 *
 * @class DesktopCtrl
 * @constructor
 * @param $scope ng $scope
 * @param $rootScope ng $rootScope
 * @param $interval ng $interval
 * @param dashboardApi dashboard data
 * @param userSettingsApi user preferences data
 * @param dashboardStateChangedEvent event name
 * @param fullScreenModeToggleEvent event name
 * @namespace dashboardView
 */
  .controller('DesktopCtrl', function ($scope, $rootScope,
                                       $interval, $log,
                                       dashboardApi,
                                       userSettingsApi,
                                       dashboardStateChangedEvent,
                                       fullScreenModeToggleEvent,
                                       initialDataReceivedEvent) {

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                            $scope properties
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * @property dashboards User's dashboards
     * @type {Array}
     */
    $scope.dashboards = [];

    /**
     * @property frames Frames on the dashboard (widget instances)
     * @type {Array}
     */
    $scope.frames = [];

    /**
     * @property fullScreenMode Flag indicating whether the toolbars are hidden
     * @type {boolean}
     */
    $scope.fullScreenMode = false;

    /**
     * @property apps Applications in the marketplace
     * @type {Array}
     */
    $scope.apps = [];

    /**
     * @property currentDashboard Active dashboard
     * @type {string}
     */
    $scope.currentDashboard = '';

    /**
     * @property currentDashboardId Active dashboard id
     * @type {string}
     */
    $scope.currentDashboardId = '';

    /**
     * @property max TODO define this
     * @type {{}}
     */
    $scope.max = {};

    /**
     * @property initialization flag
     * @type {boolean}
     */
    var initialized = false;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                           initialization
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    $scope.$on(initialDataReceivedEvent, function() {
      $scope.apps = dashboardApi._applicationData;
      dashboardApi.getDashboardData().then(function(dashboardData) {
        $scope.dashboards = dashboardData.dashboards;
        $scope.frames = $scope.dashboards[0].frames;  // to make tests happy
        $scope.ready = true;
      });
      //$scope.frames = $scope.dashboards[0].frames;  // to make tests happy
    });

    $scope.$on(fullScreenModeToggleEvent, function(event, data) {
      $scope.fullScreenMode = data.fullScreenMode;
    });

    $scope.$on(dashboardStateChangedEvent, function(event, value) {
      if (value.dashboardId === $scope.currentDashboardId && value.layout === 'desktop') {
        dashboardChangeHandler();
      }
    });

    $scope.$on('$stateChangeSuccess',
      function(event, toState, toParams/*, fromState, fromParams*/){
        stateChangeSuccessHandler(event, toState, toParams);
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                          methods
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    function stateChangeSuccessHandler(event, toState, toParams) {
      if (!$scope.ready) {
        $log.warn('DesktopCtrl: delaying call to stateChangeSuccessHandler by 500ms - no data yet');
        $scope.handleStateChangeSuccessInterval = $interval(function() {
          stateChangeSuccessHandler(event, toState, toParams);
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
      if (layoutType !== 'desktop') {
        return;
      }
      if (initialized && toParams.dashboardId === $scope.currentDashboardId) {
        // if widgets were added to this dashboard in grid layout, those
        // same widgets need to be added to this layout as well
        dashboardChangeHandler();
        return;
      }
      if (initialized && toParams.dashboardId !== $scope.currentDashboardId) {
        return;
      }
      $scope.currentDashboardId = toParams.dashboardId;
      reloadDashboard();
      initialized = true;
    }

    /**
     * Handler invoked when a dashboardStateChangedEvent is received
     *
     * @method dashboardChangeHandler
     */
    function dashboardChangeHandler() {
      if (!$scope.ready) {
        $log.warn('DesktopCtrl: delaying call to dashboardChangeHandler by 500ms - no data yet');
        $scope.dashboardChangeHandlerInterval = $interval(function() {
          dashboardChangeHandler();
        }, 500, 1);
        return;
      }
      if ($scope.dashboardChangeHandlerInterval) {
        $interval.cancel($scope.dashboardChangeHandlerInterval);
      }

      dashboardApi.getDashboardById($scope.currentDashboardId).then(function(updatedDashboard) {

        // update the isMinimized and isMaximized state
        for (var ii=0; ii < updatedDashboard.frames.length; ii++) {
          for (var jj=0; jj < $scope.frames.length; jj++) {
            if (updatedDashboard.frames[ii].id === $scope.frames[jj].id) {
              $scope.frames[jj].isMinimized = updatedDashboard.frames[ii].isMinimized;
              $scope.frames[jj].isMaximized = updatedDashboard.frames[ii].isMaximized;

              // also update the positioning
              // TODO: this logic is odd for a reason - do not change without
              // careful testing
              if ($scope.frames[jj].desktopLayout.top !== updatedDashboard.frames[ii].desktopLayout.top) {
                $scope.frames[jj].desktopLayout.top =  updatedDashboard.frames[ii].desktopLayout.top;

              } else {
                $scope.frames[jj].desktopLayout.top =  updatedDashboard.frames[ii].desktopLayout.top + 1;
              }

              $scope.frames[jj].desktopLayout.zIndex = updatedDashboard.frames[ii].desktopLayout.zIndex;
              $scope.frames[jj].desktopLayout.left = updatedDashboard.frames[ii].desktopLayout.left;
              $scope.frames[jj].desktopLayout.width = updatedDashboard.frames[ii].desktopLayout.width;
              $scope.frames[jj].desktopLayout.height = updatedDashboard.frames[ii].desktopLayout.height;
            }
          }
        }

        if ($scope.frames.length === updatedDashboard.frames.length) {
          return;
        }

        // save the original frames for use later on
        var originalFrames = $scope.frames.slice();

        // remove old frames from the view
        var originalFramesCopy = originalFrames.slice();
        for (var i=0; i < originalFramesCopy.length; i++) {
          var removeFrame = true;
          for (var j=0; j < updatedDashboard.frames.length; j++) {
            if (originalFramesCopy[i].id === updatedDashboard.frames[j].id) {
              removeFrame = false;
            }
          }
          if (removeFrame) {
            $scope.frames.splice(i,1);
          }
        }

        // Add new frames to the view
        for (var k=0; k < updatedDashboard.frames.length; k++) {
          var addFrame = true;
          for (var l=0; l < originalFrames.length; l++) {
            if (updatedDashboard.frames[k].id === originalFrames[l].id) {
              addFrame = false;
            }
          }
          if (addFrame) {
            $scope.frames.push(updatedDashboard.frames[k]);
          }
        }
        dashboardApi.mergeApplicationData($scope.frames);

      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    }

    /**
     * Reload this dashboard
     *
     * @method reloadDashboard
     */
    function reloadDashboard() {
      // app information is retrieved asynchronously from IWC. If the
      // information isn't available yet, try again later
      if (!$scope.ready) {
        $log.warn('DesktopCtrl: delaying call to reloadDashboard by 500ms - no data yet');
        $scope.reloadDashboardInterval = $interval(function() {
          reloadDashboard();
        }, 500, 1);
        return;
      }
      if ($scope.reloadDashboardInterval) {
        $interval.cancel($scope.reloadDashboardInterval);
      }
      if (!$scope.dashboards) {
        $log.warn('Dashboard changed, but no dashboards exist');
        return;
      }
      for (var i=0; i < $scope.dashboards.length; i++) {
        if ($scope.dashboards[i].id.toString() === $scope.currentDashboardId) {
          $scope.currentDashboard = $scope.dashboards[i];
          $scope.currentDashboardId = $scope.currentDashboard.id;
          $scope.frames = $scope.currentDashboard.frames;

          // Merge application data (app name, icons, descriptions, url, etc)
          // with dashboard app data
          dashboardApi.mergeApplicationData($scope.frames);

          $scope.max = {};

          sortFrames();

          for (var k = 0, len = $scope.frames.length; k < len; k++) {
            $scope.frames[k].desktopLayout.zIndex = k;
          }
          $scope.max.zIndex = $scope.frames.length - 1;
        }
      }
      $rootScope.$broadcast(dashboardStateChangedEvent, {
        'dashboardId': $scope.currentDashboardId, 'layout': 'desktop'});
    }

    /**
     * Getter for frame.isMinimized
     *
     * @method isFrameMinimized
     * @param e Frame to get data for
     * @returns {boolean}
     */
    $scope.isFrameMinimized = function(e) {
      for (var i=0; i < $scope.frames.length; i++) {
        if ($scope.frames[i].id === e.id) {
          return $scope.frames[i].isMinimized;
        }
      }
    };

    /**
     * Sort the zIndex of all frames
     *
     * @method sortFrames
     */
    function sortFrames() {
      $scope.frames.sort(function(a, b) {
        return ((a.desktopLayout.zIndex < b.desktopLayout.zIndex) ? -1 :
          ((a.desktopLayout.zIndex > b.desktopLayout.zIndex) ? 1 : 0));
      });
    }
  });