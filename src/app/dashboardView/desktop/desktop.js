'use strict';

angular.module('ozpWebtopApp.dashboardView')
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
 * @param dashboardApi dashboard data
 * @param marketplaceApi marketplace listings data
 * @param dashboardChangeMonitor notify when dashboard changes
 * @param userSettingsApi user preferences data
 * @namespace dashboardView
 */
  .controller('DesktopCtrl', function ($scope, $rootScope, $location,
                                       dashboardApi, marketplaceApi,
                                       dashboardChangeMonitor,
                                       userSettingsApi) {

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
     * @property dashBarHidden Flag indicating whether the dashboard toolbar
     * is hidden
     * @type {boolean}
     */
    $scope.dashBarHidden = false;

    /**
     * @property appBarHidden Flag indicating whether the application toolbar
     * is hidden
     * @type {boolean}
     */
    $scope.appBarHidden = false;

    /**
     * @property apps Applications in the marketplace
     * TODO: only need the data for apps user has favorited
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

    $scope.$on('userSettings-change', function() {
      handleUserSettingsChange();
    });

    $scope.$on('dashboard-change', function() {
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
     * Handler invoked when a userSettings-change event is received
     *
     * @method handleUserSettingsChange
     */
    function handleUserSettingsChange() {
      userSettingsApi.getUserSettings().then(function(settings) {
        if (settings.isDashboardHidden === true) {
          $scope.dashBarHidden = true;
        } else {
          $scope.dashBarHidden = false;
        }

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
     * Handler invoked when a dashboard-change event is received
     *
     * @method dashboardChangeHandler
     */
    function dashboardChangeHandler() {
      /* isminimized */
      dashboardApi.getDashboards().then(function(dashboards) {
        var apiDash = {};
        for (var ii=0; ii < dashboards.length; ii++) {
          if (dashboards[ii].id === dashboardChangeMonitor.dashboardId) {
            apiDash = dashboards[ii];
          }
        }
        for (var z in apiDash.frames){
          for (var y in $scope.frames){
            if ((apiDash.frames[z].appId === $scope.frames[y].appId) && (apiDash.frames[z].isMinimized !== $scope.frames[y].isMinimized)) {
              $scope.frames[y].isMinimized = apiDash.frames[z].isMinimized;
              //
            }
            if((apiDash.frames[z].appId === $scope.frames[y].appId) && (apiDash.frames[z].isMaximized !== $scope.frames[y].isMaximized)) {
              $scope.frames[y].isMaximized = apiDash.frames[z].isMaximized;
              //
            }
          }
        }

        /* end isminimized */
        if ($scope.frames.length !== apiDash.frames.length){

          /* Make an array of old frames and new frames */
          var oldFrames = [],
              newFrames = [];
          for(var i in $scope.frames){
            oldFrames.push($scope.frames[i].appId);
          }

          for (var j in apiDash.frames){
            newFrames.push(apiDash.frames[j].appId);
          }

          /* return just the differences between oldFrames and new Frames */
          Array.prototype.diff = function(a) {
            return this.filter(function(i) {return a.indexOf(i) < 0;});
          };
          // add or remove new frames without reloading the entire scope
          // if there are items in the currentScope that are not in the updated
          // scope from the service, remove theme here
          if (oldFrames.diff(newFrames).length > 0){
            for (var a = 0; a < $scope.frames.length; a++){
              // if the removed frame is present, splice it out of the local
              // scope
              if ($scope.frames[a].appId === oldFrames.diff(newFrames)[0]){
                $scope.frames.splice(a, 1);
              }
            }
          }
          // if there are new frames for this dashboard on the services that are
          // not in the local scope
          if (newFrames.diff(oldFrames).length > 0){

            // for item in the dashboardApi on the current Dashboard
            for (var b = 0; b < apiDash.frames.length; b++){

              // if the item from the dashboard api matches the new frame we
              // found in this view
              if (apiDash.frames[b].appId === newFrames.diff(oldFrames)[0]){

                // push that frame to the local scope. since the changes are
                // automatically binded with the view, no refresh
                $scope.frames.push(
                  apiDash.frames[b]
                );
                // update the frame size so it fits inside its little widget
                // boundary
                // $scope.updateGridFrameSize(apiDash.frames[b].id);
                // now quickly merge my local scope for frames with the
                // marketplace api to get important stuff on local scope like
                // url, image, name, etc
                dashboardApi.mergeApplicationData($scope.frames, $scope.apps);
              }
            }
          }
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    }

    /**
     * Update the active dashboard and broadcast dashboard-change on
     * completion
     *
     * @method updateDashboard
     */
    function updateDashboard() {
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

      // $scope.activeFrames = $scope.currentDashboard.frames;
      $rootScope.$broadcast('dashboard-change');
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