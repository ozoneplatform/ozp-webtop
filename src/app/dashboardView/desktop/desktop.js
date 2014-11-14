'use strict';

/**
 * Desktop layout main controller
 *
 * @module ozpWebtop.dashboardView.desktop
 * @requires ozpWebtop.constants
 * @requires ozpWebtop.services.dashboardChangeMonitor
 * @requires ozpWebtop.models.dashboard
 * @requires ozpWebtop.models.marketplace
 * @requires ozpWebtop.models.userSettings
 */
angular.module('ozpWebtop.dashboardView.desktop', [
  'ozpWebtop.constants', 'ozpWebtop.services.dashboardChangeMonitor',
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
 * @param $location ng $location
 * @param $interval ng $interval
 * @param dashboardApi dashboard data
 * @param marketplaceApi marketplace listings data
 * @param dashboardChangeMonitor notify when dashboard changes
 * @param userSettingsApi user preferences data
 * @param dashboardStateChangedEvent event name
 * @param fullScreenModeToggleEvent event name
 * @namespace dashboardView
 */
  .controller('DesktopCtrl', function ($scope, $rootScope, $location,
                                       $interval,
                                       dashboardApi, marketplaceApi,
                                       dashboardChangeMonitor,
                                       userSettingsApi,
                                       dashboardStateChangedEvent,
                                       fullScreenModeToggleEvent) {

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

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                           initialization
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // register to receive notifications when active dashboard changes
    dashboardChangeMonitor.run();

    // get dashboards
    dashboardApi.getDashboards().then(function(dashboards) {
      if (!dashboards) {
        console.log('No dashboards exist');
        return;
      }
      console.log('re getting dasboards');
      $scope.dashboards = dashboards;

      $scope.frames = $scope.dashboards[0].frames;  // to make tests happy
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });

    // get application listings
    marketplaceApi.getAllApps().then(function(apps) {
      $scope.apps = apps;
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });

    $scope.$on(fullScreenModeToggleEvent, function(event, data) {
      $scope.fullScreenMode = data.fullScreenMode;
    });

    $scope.$on(dashboardStateChangedEvent, function() {
      dashboardChangeHandler();
    });

    // TODO: First tried sending broadcast events from dashboardChangeMonitor,
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

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                          methods
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Handler invoked when a dashboardStateChangedEvent is received
     *
     * @method dashboardChangeHandler
     */
    function dashboardChangeHandler() {
      // app information is retrieved asynchronously from IWC. If the
      // information isn't available yet, try again later
      if ($scope.apps.length === 0) {
        $interval(dashboardChangeHandler, 500, 1);
        return;
      }

      dashboardApi.getDashboardById(dashboardChangeMonitor.dashboardId).then(function(updatedDashboard) {

        // update the isMinimized and isMaximized state
        for (var ii=0; ii < updatedDashboard.frames.length; ii++) {
          for (var jj=0; jj < $scope.frames.length; jj++) {
            if (updatedDashboard.frames[ii].id === $scope.frames[jj].id) {
              $scope.frames[jj].isMinimized = updatedDashboard.frames[ii].isMinimized;
              $scope.frames[jj].isMaximized = updatedDashboard.frames[ii].isMaximized;
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
        dashboardApi.mergeApplicationData($scope.frames, $scope.apps);

      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    }

    /**
     * Update the active dashboard and broadcast dashboardStateChangedEvent on
     * completion
     *
     * @method updateDashboard
     */
    function updateDashboard() {
      // app information is retrieved asynchronously from IWC. If the
      // information isn't available yet, try again later
      if ($scope.apps.length === 0) {
        $interval(updateDashboard, 500, 1);
        return;
      }
      if (!$scope.dashboards) {
        console.log('Dashboard changed, but no dashboards exist');
        return;
      }
      var dashboardId = dashboardChangeMonitor.dashboardId;
      for (var i=0; i < $scope.dashboards.length; i++) {
        if ($scope.dashboards[i].id.toString() === dashboardId) {
          $scope.currentDashboard = $scope.dashboards[i];
          $scope.currentDashboardId = $scope.currentDashboard.id;
          $scope.frames = $scope.currentDashboard.frames;

          // Merge application data (app name, icons, descriptions, url, etc)
          // with dashboard app data
          dashboardApi.mergeApplicationData($scope.frames, $scope.apps);

          $scope.max = {};

          sortFrames();

          for (var k = 0, len = $scope.frames.length; k < len; k++) {
            $scope.frames[k].desktopLayout.zIndex = k;
          }
          $scope.max.zIndex = $scope.frames.length - 1;
        }
      }

      $rootScope.$broadcast(dashboardStateChangedEvent);
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
     * Getter for frame.isMaximized
     *
     * @method isFrameMaximized
     * @param e Frame to get data for
     * @returns {boolean}
     */
    $scope.isFrameMaximized = function(e) {
      for (var i=0; i < $scope.frames.length; i++) {
        if ($scope.frames[i].id === e.id) {
          return $scope.frames[i].isMaximized;
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