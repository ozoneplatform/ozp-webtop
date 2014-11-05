'use strict';

/**
 * The application toolbar in the Webtop.
 *
 * @module ozpWebtop.appToolbar
 * @requires ui.router
 * @requires ui.bootstrap
 * @requires ozpWebtop.models.dashboard
 * @requires ozp.common.windowSizeWatcher
 * @requires ozpWebtop.models.marketplace
 * @requires ozpWebtop.models.userSettings
 * @requires ozpWebtop.addApplicationsModal
 * @requires ozpWebtop.services.dashboardChangeMonitor
 * @requires ozp.common.windowSizeWatcher
 */
angular.module('ozpWebtop.appToolbar', ['ui.router', 'ui.bootstrap',
  'ozpWebtop.models.dashboard', 'ozpWebtop.models.marketplace',
  'ozpWebtop.models.userSettings',
  'ozpWebtop.addApplicationsModal',
  'ozpWebtop.services.dashboardChangeMonitor',
  'ozp.common.windowSizeWatcher']);

/**
 * Application toolbar on the bottom of Webtop. Contains a menu for adding
 * favorited apps to the dashboard and shows names/icons for all apps
 * currently on the dashboard. Clicking on the app name/icon buttons in the
 * toolbar results in the application being shown or hidden from the dashboard
 * view (in desktop layout)
 *
 * dashboard selector
 * buttons to switch between grid and desktop layouts
 *
 * ngtype: controller
 *
 * @namespace appToolbar
 * @class ApplicationToolbarCtrl
 * @constructor
 * @param $scope $scope service
 * @param $rootScope $rootScope service
 * @param $state $state service
 * @param $modal $modal service from ui.bootstrap
 * @param marketplaceApi Application data model
 * @param dashbaordApi Dashboard data model
 * @param dashboardChangeMonitor Notify when dashboard changes
 * @param userSettingsApi User settings data model
 * @param windowSizeWatcher Notify when window size changes
 * @param deviceSizeChangedEvent event name
 * @param dashboardStateChangedEvent event name
 * @param dashboardSwitchedEvent event name
 * @param fullScreenModeToggleEvent event name
 */
angular.module( 'ozpWebtop.appToolbar')
  .controller('ApplicationToolbarCtrl', function($scope, $rootScope, $state,
                                                 $modal,
                                                 marketplaceApi, dashboardApi,
                                                 dashboardChangeMonitor,
                                                 userSettingsApi,
                                                 windowSizeWatcher,
                                                 deviceSizeChangedEvent,
                                                 dashboardStateChangedEvent,
                                                 dashboardSwitchedEvent,
                                                 fullScreenModeToggleEvent,
                                                 userPreferencesUpdatedEvent) {


    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                            $scope properties
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /**
     * @property dashboardNameLength Max length of dashboard name, based on
     * current screen size
     * @type {String}
     */
    $scope.dashboardNameLength = 0;

    /**
     * @property dashboards Dashboards for current user
     * @type {Array}
     */
    $scope.dashboards = [];

    /**
     * @property Dashboard layout (grid or desktop)
     * @type {string}
     */
    $scope.layout = 'grid';

    /**
     * @property currentDashboard Current active dashboard
     * @type {string}
     */
    $scope.currentDashboard = '';

    /**
     * @property dashboardId Current dashboard id
     * @type {string}
     */
    $scope.dashboardId = '';

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
     * @property $scope.fullScreenMode Flag indicating if the toolbar is hidden or
     *  not
     * @type {boolean}
     */
    $scope.fullScreenMode = false;
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
    $scope.fullScreenMode = false;

    // get all apps in the marketplace
    // TODO: just need the apps current user has favorited
    marketplaceApi.getAllApps().then(function(apps) {
      $scope.apps = apps;
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });

    // get dashboards for current user
    dashboardApi.getDashboards().then(function(dashboards) {
      $scope.dashboards = dashboards;
      // default board is 0
      // TODO: Load last board that was used
      if (dashboards) {
        $scope.currentDashboard = $scope.dashboards[0];
      } else {
        console.log('WARNING: No dashboards found');
      }
      // default layout is grid
      $scope.layout = 'grid';
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });

    $scope.$on(deviceSizeChangedEvent, function(event, value) {
      $scope.handleWindowSizeChange(value);
    });

    $scope.$on(dashboardStateChangedEvent, function() {
      $scope.updateApps();
    });

    $scope.$on(dashboardSwitchedEvent, function(event, dashboardChange) {
      $scope.handleDashboardChange(dashboardChange);
    });

    $scope.$on(userPreferencesUpdatedEvent, function() {
      handleUserSettingsChange();
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                          methods
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Handler invoked when user settings event is fired
     *
     * @method handleUserSettingsChange
     */
    function handleUserSettingsChange() {
      dashboardApi.getDashboards().then(function(dashboards) {
        $scope.dashboards = dashboards;
        dashboardApi.getDashboardById($scope.dashboardId).then(function(dashboard) {
          if (dashboard) {
            $scope.currentDashboard = dashboard;
          } else {
            console.log('WARNING: Dashboard ' + $scope.dashboardId + ' no longer exists');
          }
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    }

    /**
     * Handle the deviceSizeChangedEvent
     *
     * Update $scope.maxAppsDisplayed and invoke $scope.setPinnedApps()
     * @method handleWindowSizeChange
     * @param value Data from deviceSizeChangedEvent
     */
    $scope.handleWindowSizeChange = function(value) {
      if (value.deviceSize === 'sm') {
        $scope.maxAppsDisplayed = 6;
        $scope.setPinnedApps();
      } else if (value.deviceSize === 'md') {
        $scope.maxAppsDisplayed = 10;
        $scope.setPinnedApps();
      } else if (value.deviceSize === 'lg') {
        $scope.maxAppsDisplayed = 15;
        $scope.setPinnedApps();
      }

      if (value.deviceSize === 'sm') {
        $scope.dashboardNameLength = 9;
      } else if (value.deviceSize === 'md') {
          $scope.dashboardNameLength = 28;
      } else if (value.deviceSize === 'lg') {
          $scope.dashboardNameLength = 48;
      }
    };

    /**
     * Handle the dashboardSwitchedEvent
     *
     * Set $scope.currentDashboardId and invoke updateApps()
     * Update current dashboard and layout
     *
     * @method handleDashboardChange
     * @param dashboardChange
     */
    $scope.handleDashboardChange = function(dashboardChange) {
      if($scope.currentDashboardId !== dashboardChange.dashboardId){
        $scope.currentDashboardId = dashboardChange.dashboardId;
      }
      $scope.layout = dashboardChange.layout;
      $scope.dashboardId = dashboardChange.dashboardId;

      dashboardApi.getDashboardById($scope.dashboardId).then(function(dashboard) {
        $scope.currentDashboard = dashboard;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });

      $scope.updateApps();
    };

    /**
     * Set the current dashboard
     * @method setCurrentDashboard
     * @param board Current dashboard
     */
    $scope.setCurrentDashboard = function(board) {
      $scope.currentDashboard = board;
    };

    /**
     * Use a grid layout
     * @method useGridLayout
     */
    $scope.useGridLayout = function() {
      $scope.layout = 'grid';
    };

    /**
     * Use a desktop layout
     * @method useDesktopLayout
     */
    $scope.useDesktopLayout = function() {
      $scope.layout = 'desktop';
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
        $rootScope.$broadcast(dashboardStateChangedEvent);
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
     };

    /**
     * Show or hide the application toolbar
     *
     * If successful, broadcasts a fullScreenModeToggleEvent
     *
     * @method toggleFullScreenMode
     */
    $scope.toggleFullScreenMode = function() {
      var fullScreenVal = false;
      // TODO: bug??
      if ((!$scope.fullScreenMode) || ($scope.fullScreenMode = false)) {
        fullScreenVal = true;
      }
      $scope.fullScreenMode = fullScreenVal;
      userSettingsApi.updateUserSettingByKey('fullScreenMode', fullScreenVal).then(function(resp) {
        if (resp) {
          $rootScope.$broadcast(fullScreenModeToggleEvent, {'fullScreenMode': fullScreenVal});
        } else {
          console.log('ERROR failed to update fullScreenMode in user ' +
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

    /**
     * Opens the Add Application modal dialog
     *
     * @method openApplicationsModal
     */
    $scope.openApplicationsModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'addApplicationsModal/addApplicationsModal.tpl.html',
        controller: 'AddApplicationsModalInstanceCtrl',
        windowClass: 'app-modal-window',
        scope: $rootScope,
        resolve: {
          apps: function() {
            return $scope.apps;
          }
        }
      });

      /**
       * Add an application to a dashboard
       *
       * @method addAppToDashboard
       * @param app The application to add
       * @param dashboardId The dashboard to add the application to
       * @returns {*}
       */
      function addAppToDashboard(app, dashboardId) {
        // check if the app is already on the current dashboard
        return dashboardApi.isAppOnDashboard(dashboardId, app.id).then(function (isOnDashboard) {
          if (isOnDashboard && app.uiHints.singleton) {
            console.log('WARNING: Only one instance of ' + app.name + ' may be on your dashboard');
          } else {
            // TODO: use message broadcast to get grid max rows and grid max cols
            return dashboardApi.createFrame(dashboardId, app.id, 25).then(function (response) {
              return response;
            }).catch(function (error) {
              console.log('should not have happened: ' + error);
            });
          }
        }).catch(function (error) {
          console.log('should not have happened: ' + error);
        });
      }

      modalInstance.result.then(function (response) {
        var dashboardId;
        if (response.useNewDashboard) {
          // create a new dashboard
          // TODO: is this randomly generated name ok?
          var random_integer = Math.floor((Math.random()+0.10)*101);
          var name = 'Dashboard ' + random_integer.toString();
          dashboardApi.createDashboard(name).then(function() {
            // now get this dashboard id
            dashboardApi.getDashboards().then(function(dashboards) {
              for (var i=0; i < dashboards.length; i++) {
                if (dashboards[i].name === name) {
                  dashboardId = dashboards[i].id;
                }
              }

              // add the apps to the newly minted dashboard
              response.appsToOpen.reduce(function (previous, current) {
                return previous.then(function () {
                  var promise = addAppToDashboard(current, dashboardId);
                  return promise;
                }).catch(function (error) {
                  console.log('should not have happened: ' + error);
                });
              }, Promise.resolve()).then(function () {
                // all apps added to dashboard
                $rootScope.$broadcast(userPreferencesUpdatedEvent);
                // redirect user to new dashboard (grid view by default)
                $state.go('grid', {'dashboardId': dashboardId});
              });
            });
          });
        } else {
          dashboardId = $scope.currentDashboardId;
          response.appsToOpen.reduce(function (previous, current) {
            return previous.then(function () {
              var promise = addAppToDashboard(current, dashboardId);
              return promise;
            }).catch(function (error) {
              console.log('should not have happened: ' + error);
            });
          }, Promise.resolve()).then(function () {
              // all apps added to dashboard
            $rootScope.$broadcast(dashboardStateChangedEvent);
          });
        }

      });
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
angular.module( 'ozpWebtop.appToolbar')
    .directive('appToolbar',function(){
    return {
        restrict: 'E',
        templateUrl: 'appToolbar/appToolbar.tpl.html'
    };
});
