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
 * @requires ozpWebtop.addApplicationsModal
 * @requires ozpWebtop.editDashboardModal
 * @requires ozp.common.windowSizeWatcher
 */
angular.module('ozpWebtop.appToolbar', ['ui.router', 'ui.bootstrap',
  'ozpWebtop.models.dashboard', 'ozpWebtop.models.marketplace',
  'ozpWebtop.models.userSettings',
  'ozpWebtop.addApplicationsModal',
  'ozpWebtop.editDashboardModal',
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
 * @param $interval $interval service from ui.bootstrap
 * @param $window $window service from ui.bootstrap
 * @param marketplaceApi Application data model
 * @param dashbaordApi Dashboard data model
 * @param userSettingsApi User settings data model
 * @param windowSizeWatcher Notify when window size changes
 * @param deviceSizeChangedEvent event name
 * @param dashboardStateChangedEvent event name
 * @param fullScreenModeToggleEvent event name
 * @param highlightFrameOnGridLayoutEvent event name
 */
angular.module( 'ozpWebtop.appToolbar')
  .controller('ApplicationToolbarCtrl', function($scope, $rootScope, $state,
                                                 $modal, $interval, $window,
                                                 marketplaceApi, dashboardApi,
                                                 userSettingsApi,
                                                 windowSizeWatcher,
                                                 deviceSizeChangedEvent,
                                                 dashboardStateChangedEvent,
                                                 fullScreenModeToggleEvent,
                                                 highlightFrameOnGridLayoutEvent) {


    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                            $scope properties
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * @property dashboards Dashboards for current user
     * @type {Array}
     */
    $scope.dashboards = [];

    /**
     * @property currentDashboard Current active dashboard
     * @type {string}
     */
    $scope.currentDashboard = '';

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
     * @property $scope.apps All applications available in the marketplace
     * @type {Array}
     */
    $scope.apps = [];

    /**
     * @property dashboardNameLength Max length of dashboard name, based on
     * current screen size
     * @type {String}
     */
    $scope.dashboardNameLength = 0;

    /**
     * @property $scope.maxAppsDisplayed The maximum number of apps that can be
     * displayed on the toolbar (based on screen width)
     * @type {Number}
     */
    $scope.maxAppsDisplayed = '';

    /**
     * @property $scope.fullScreenMode Flag indicating if the toolbar is hidden or
     *  not
     * @type {boolean}
     */
    $scope.fullScreenMode = false;

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

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                           initialization
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // activate the window size watcher so we receive notification when the
    // window size changes
    windowSizeWatcher.run();

    // toolbar is not hidden by default
    $scope.fullScreenMode = false;

    // get all apps in the marketplace
    marketplaceApi.getAllApps().then(function(apps) {
      $scope.apps = apps;
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });

    $scope.$on(deviceSizeChangedEvent, function(event, value) {
      $scope.handleWindowSizeChange(value);
    });

    $scope.$on(dashboardStateChangedEvent, function() {
      $scope.updateApps();
    });

    $scope.$on('$stateChangeSuccess',
      function(event, toState, toParams/*, fromState, fromParams*/){
        var layoutType = '';
        if (toState.name.indexOf('grid-sticky') > -1) {
          layoutType = 'grid';
        } else if (toState.name.indexOf('desktop-sticky') > -1) {
          layoutType = 'desktop';
        } else {
          return;
        }
        $scope.handleStateChange(toParams.dashboardId, layoutType);
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                          methods
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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
     * Handle state change
     *
     *
     * @method handleStateChange
     */
    $scope.handleStateChange= function(dashboardId, dashboardLayout) {
      // get dashboards
      dashboardApi.getDashboards().then(function(dashboards) {
        $scope.dashboards = dashboards;
        for (var i=0; i < dashboards.length; i++) {
          if (dashboards[i].id === dashboardId) {
            $scope.currentDashboard = dashboards[i];
          }
        }
        if (!$scope.currentDashboard) {
          console.log('WARNING: No dashboards found');
        }

        if ($scope.currentDashboard.layout !== dashboardLayout) {
          console.log('dashboard layout mismatch, changing state');
          $state.go('dashboardview.' +
            $scope.currentDashboard.layout + '-sticky-' +
            $scope.currentDashboard.stickyIndex, {
            'dashboardId': $scope.currentDashboard.id});
        }
        $scope.updateApps();
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    };

    /**
     * Load a dashboard
     * @method loadDashboard
     * @param board Dashboard to load
     */
    $scope.loadDashboard = function(board) {
      $state.go('dashboardview.' + board.layout + '-sticky-' +
            board.stickyIndex, {dashboardId: board.id});
    };

    $scope.isCurrentBoard = function(board) {
      return $scope.currentDashboard.id === board.id;
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
      // app information is retrieved asynchronously from IWC. If the
      // information isn't available yet, try again later
      if ($scope.apps.length === 0) {
        console.log('$scope.apps is empty, retrying later');
        $interval($scope.updateApps, 500, 1);
        return;
      }
      return dashboardApi.getDashboards().then(function(dashboards) {
        $scope.dashboards = dashboards;
        for (var i=0; i < dashboards.length; i++) {
          if (dashboards[i].id === $scope.currentDashboard.id) {
            $scope.currentDashboard = dashboards[i];
            $scope.frames = angular.copy(dashboards[i].frames);
            dashboardApi.mergeApplicationData($scope.frames, $scope.apps);
            $scope.setPinnedApps();
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
       if ($scope.currentDashboard.layout === 'grid') {
         console.log('sending highlight msg for frame ' + e.id);
         $rootScope.$broadcast(highlightFrameOnGridLayoutEvent, {'frameId': e.id});
       }
       else {
         dashboardApi.toggleFrameKey(e.id, 'isMinimized').then(function () {
           $rootScope.$broadcast(dashboardStateChangedEvent, {
             'dashboardId': $scope.currentDashboard.id, 'layout': 'desktop'});
         }).catch(function (error) {
           console.log('should not have happened: ' + error);
         });
       }
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

    $scope.cascadeWindows = function() {
      // reposition each window on the page
      // get the window size and starting position
      // TODO: get this dynamically from screen size
      var origin = {'x': 50, 'y': 80};
      var frameSize = {'x': 800, 'y': 400};
      dashboardApi.cascadeWindows($scope.currentDashboard.id, origin, frameSize).then(function() {
        // send dashboard state change msg
        $rootScope.$broadcast(dashboardStateChangedEvent, {
           'dashboardId': $scope.currentDashboard.id, 'layout': 'desktop'});
      });
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
        var stickyIndex;
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
                  stickyIndex = dashboards[i].stickyIndex;
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
                // redirect user to new dashboard (grid view by default)
                $state.go('dashboardview.grid-sticky-' + stickyIndex, {
                  'dashboardId': dashboardId});
              });
            });
          });
        } else {
          response.appsToOpen.reduce(function (previous, current) {
            return previous.then(function () {
              var promise = addAppToDashboard(current, $scope.currentDashboard.id);
              return promise;
            }).catch(function (error) {
              console.log('should not have happened: ' + error);
            });
          }, Promise.resolve()).then(function () {
              // all apps added to dashboard

            // current dashboard id and layout hasn't changed, so just reload
            // the applications
            $rootScope.$broadcast(dashboardStateChangedEvent, {
              'dashboardId': $scope.currentDashboard.id,
              'layout': $scope.currentDashboard.layout});
          });
        }

      });
    };

    $scope.openEditDashboardModal = function() {
        var modalInstance = $modal.open({
        templateUrl: 'editDashboardModal/editDashboardModal.tpl.html',
        controller: 'EditDashboardModalInstanceCtrl',
        windowClass: 'app-modal-window',
        scope: $rootScope,
        resolve: {
          dashboard: function() {
            return $scope.currentDashboard;
          }
        }
        });

        modalInstance.result.then(function (response) {
          // reload current dashboard if the layout type changed (this state
          // change will be ignored if the dashboard id and layout haven't
          // changed)
          $state.go('dashboardview.' + response.layout + '-sticky-' +
            response.stickyIndex, {dashboardId: response.id});

          // update the dashboard name if that changed
          if (response.name !== $scope.currentDashboard.name) {
            $rootScope.$broadcast(dashboardStateChangedEvent, {
              'dashboardId': $scope.currentDashboard.id,
              'layout': $scope.currentDashboard.layout});
          }
        });
      };

    $scope.openDeleteDashboardModal = function(board) {
      if ($scope.dashboards.length === 1) {
        console.log('ERROR: You may not delete your last dashboard');
        return;
      } else {
        console.log('dashboards remaining: ' + $scope.dashboards.length);
      }
      var msg = 'Are you sure you want to delete dashboard ' +
          board.name + '? This action cannot be undone';
      if ($window.confirm(msg)) {
        dashboardApi.removeDashboard(board.id).then(function() {
          // redirect user to their first board
          dashboardApi.getDashboards().then(function(dashboards) {
            $state.go('dashboardview.' +
            dashboards[0].layout + '-sticky-' +
            dashboards[0].stickyIndex, {
            'dashboardId': dashboards[0].id});
          });
        });
      }
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
