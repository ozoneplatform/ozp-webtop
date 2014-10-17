'use strict';

/**
 * Application toolbar on the bottom of Webtop. Contains a menu for adding
 * favorited apps to the dashboard and shows names/icons for all apps
 * currently on the dashboard. Clicking on the app name/icon buttons in the
 * toolbar results in the application being shown or hidden from the dashboard
 * view (in desktop layout)
 *
 * ngtype: controller
 *
 * @namespace appToolbar
 * @class ApplicationToolbarCtrl
 * @constructor
 * @param $scope $scope service
 * @param $rootScope $rootScope service
 * @param $state $state service
 * @param marketplaceApi Application data model
 * @param dashbaordApi Dashboard data model
 * @param dashboardChangeMonitor Notify when dashboard changes
 * @param userSettingsApi User settings data model
 * @param windowSizeWatcher Notify when window size changes
 */
angular.module( 'ozpWebtopApp.appToolbar')
  .controller('ApplicationToolbarCtrl', function($scope, $rootScope, $state,
                                       marketplaceApi, dashboardApi,
                                       dashboardChangeMonitor, userSettingsApi,
                                       windowSizeWatcher) {


    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                            $scope properties
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /**
     * @property $scope.maxAppsDisplayed The maximum number of apps that can be
     * displayed on the toolbar (based on screen width)
     * @type {Number}
     */
    $scope.maxAppsDisplayed = '';
    /**
     * @property $scope.currentDashboardId The id of the current dashboard
     * @type {string}
     */
    $scope.currentDashboardId = '';
    /**
     * @property $scope.appboardhide Flag indicating if the toolbar is hidden or
     *  not
     * @type {boolean}
     */
    $scope.appboardhide = false;
    /**
     * @property $scope.apps All applications available in the marketplace
     *  TODO: shouldn't need all of the apps, only the ones for current user
     * @type {Array}
     */
    $scope.apps = [];
    /**
     * @property $scope.frames Frames on current dashboard (includes marketplace
     *  data like app name, icons, description, etc)
     * @type {Array}
     */
    $scope.frames = [];
    /**
     * @property $scope.myPinnedApps Applications in current dashboard that are
     *  shown in the application toolbar
     * @type {Array}
     */
    $scope.myPinnedApps = [];
    /**
     * @property $scope.myPinnedAppsFirstDisplayedIndex The index (in
     *  $scope.myPinnedApps) of the first application shown in the application
     *  toolbar to display
     * @type {number}
     */
    $scope.myPinnedAppsFirstDisplayedIndex = 0;
    /**
     * @property $scope.nextAppsVisible Flag for the 'pagination' next arrow
     *  in the toolbar
     * @type {boolean}
     */
    $scope.nextAppsVisible = false;
    /**
     * @property $scope.previousAppsVisible Flag for the 'pagination' previous
     *  arrow in the toolbar
     * @type {boolean}
     */
    $scope.previousAppsVisible = false;
    /**
     * @property $scope.layout The current dashboard layout (grid or desktop)
     * @type {string}
     */
    $scope.layout = '';

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                           initialization
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // activate the window size watcher so we receive notification when the
    // window size changes
    windowSizeWatcher.run();

    // activate the dashboard change monitor so we receive notification when the
    // user's dashboard changes
    dashboardChangeMonitor.run();

    // set the dashboard id
    $scope.currentDashboardId = dashboardChangeMonitor.dashboardId;

    // toolbar is not hidden by default
    // TODO: read saved state to get this value
    $scope.appboardhide = false;

    // get all apps in the marketplace
    // TODO: just need the apps current user has favorited
    marketplaceApi.getAllApps().then(function(apps) {
      $scope.apps = apps;
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });

    $scope.$on('window-size-change', function(event, value) {
      $scope.handleWindowSizeChange(value);
    });

    $scope.$on('dashboard-change', function() {
      $scope.updateApps();
    });

    $scope.$on('dashboardChange', function(event, dashboardChange) {
      $scope.handleDashboardChange(dashboardChange);
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                          methods
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Handle the window-size-change event
     *
     * Update $scope.maxAppsDisplayed and invoke $scope.setPinnedApps()
     * @method handleWindowSizeChange
     * @param value Data from window-size-change event
     */
    $scope.handleWindowSizeChange = function(value) {
      // TODO: need further testing to validate these numbers
      if (value.deviceSize === 'sm') {
        $scope.maxAppsDisplayed = 3;
        $scope.setPinnedApps();
      } else if (value.deviceSize === 'md') {
        $scope.maxAppsDisplayed = 5;
        $scope.setPinnedApps();
      } else if (value.deviceSize === 'lg') {
        $scope.maxAppsDisplayed = 8;
        $scope.setPinnedApps();
      }
    };

    /**
     * Handle the dashboardChange event
     *
     * Set $scope.currentDashboardId and invoke updateApps()
     * @method handleDashboardChange
     * @param dashboardChange
     */
    $scope.handleDashboardChange = function(dashboardChange) {
      if($scope.currentDashboardId !== dashboardChange.dashboardId){
        $scope.currentDashboardId = dashboardChange.dashboardId;
      }
      $scope.updateApps();
    };

    /**
     * Set $scope.myPinnedApps
     *
     * Requires that $scope.frames is set first
     *
     * @method setPinnedApps
     */
    $scope.setPinnedApps = function() {
      if (!$scope.frames) {
        return;
      }
      var totalFrames = $scope.frames.length;
      if (totalFrames > $scope.maxAppsDisplayed) {
        $scope.myPinnedApps = $scope.frames.slice(0, $scope.maxAppsDisplayed);
        $scope.myPinnedAppsFirstDisplayedIndex = 0;
        $scope.nextAppsVisible = true;
        $scope.previousAppsVisible = false;
      } else {
        $scope.myPinnedApps = $scope.frames;
        $scope.nextAppsVisible = false;
        $scope.previousAppsVisible = false;
      }
    };

    /**
     * Update application data in the toolbar (invoked on a dashboard change)
     *
     * @method updateApps
     */
    $scope.updateApps = function() {
      dashboardApi.getDashboards().then(function(dashboards) {
        for (var i=0; i < dashboards.length; i++) {
          if (dashboards[i].id === dashboardChangeMonitor.dashboardId) {
            $scope.frames = dashboards[i].frames;
            dashboardApi.mergeApplicationData($scope.frames, $scope.apps);
            $scope.setPinnedApps();
            $scope.layout = dashboardChangeMonitor.layout;
          }
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    };

    /**
     * Maximize (or show) a frame that was previously minimized (hidden)
     * @method maximizeFrame
     * @param {Object} e The application to maximize/show
     */
     $scope.maximizeFrame = function(e) {
      dashboardApi.toggleFrameKey(e.id, 'isMinimized').then(function() {
        $rootScope.$broadcast('dashboard-change');
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
     };

    /**
     * Attempt to add an application to the dashboard
     *
     * If successful, broadcasts a dashboard-change event
     * @method appClicked
     * @param {Object} app The application to add
     */
    $scope.appClicked = function(app) {
      // check if the app is already on the current dashboard
      dashboardApi.isAppOnDashboard($scope.currentDashboardId, app.id).then(function(isOnDashboard) {
        if (isOnDashboard && app.uiHints.singleton) {
          alert('Only one instance of this application may be on your ' +
            'dashboard');
        } else {
          // add this app to the dashboard
          // TODO: use message broadcast to get grid max rows and grid max cols
          dashboardApi.createFrame($scope.currentDashboardId, app.id, 10).then(function(response) {
            // reload this dashboard
            if (response) {
              // $state.go($state.$current, null, { reload: true });
              $rootScope.$broadcast('dashboard-change');
            }
          }).catch(function(error) {
            console.log('should not have happened: ' + error);
          });
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    };

    /**
     * Show or hide the application toolbar
     *
     * If successful, broadcasts a userSettings-change event
     *
     * @method appboardhider
     */
    $scope.appboardhider = function() {
      var appboardHideVal = false;
      if ((!$scope.appboardhide) || ($scope.appboardhide = false)) {
        appboardHideVal = true;
      }
      $scope.appboardhide = appboardHideVal;
      userSettingsApi.updateUserSettingByKey('isAppboardHidden', appboardHideVal).then(function(resp) {
        if (resp) {
          $rootScope.$broadcast('userSettings-change');
        } else {
          console.log('ERROR failed to update isAppboardHidden in user ' +
            'settings');
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    };

    /**
     * A pagination method to show the previous set of apps currently on the
     * dashboard in the toolbar, if the screen width isn't wide enough to
     * display them all
     * @method previousApps
     */
    $scope.previousApps = function() {
      var start = $scope.myPinnedAppsFirstDisplayedIndex -
        $scope.maxAppsDisplayed;
      var end = start + $scope.maxAppsDisplayed;
      $scope.myPinnedApps = $scope.frames.slice(start, end);
      $scope.myPinnedAppsFirstDisplayedIndex = start;
      if (start > 0) {
        $scope.previousAppsVisible = true;
      } else {
        $scope.previousAppsVisible = false;
      }
      $scope.nextAppsVisible = true;
    };

    /**
     * A pagination method to show the next set of apps currently on the
     * dashboard in the toolbar, if the screen width isn't wide enough to
     * display them all
     *
     * @method nextApps
     */
    $scope.nextApps = function() {
      var start = $scope.myPinnedAppsFirstDisplayedIndex +
        $scope.maxAppsDisplayed;
      var end = start + $scope.maxAppsDisplayed;
      $scope.myPinnedApps = $scope.frames.slice(start, end);
      $scope.myPinnedAppsFirstDisplayedIndex = start;
      if ($scope.frames.length > end) {
        $scope.nextAppsVisible = true;
      } else {
        $scope.nextAppsVisible = false;
      }
      $scope.previousAppsVisible = true;
    };

  });

/**
 * Directive for the application toolbar
 *
 * ngtype: directive
 *
 * @class appToolbar
 * @static
 */
angular.module( 'ozpWebtopApp.appToolbar')
    .directive('appToolbar',function(){
    return {
        restrict: 'E',
        templateUrl: 'appToolbar/appToolbar.tpl.html'
    };
});
