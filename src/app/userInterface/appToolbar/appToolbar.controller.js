'use strict';

/**
 * The application toolbar in the Webtop.
 *
 * @module ozpWebtop.appToolbar
 * @requires ui.router
 * @requires ui.bootstrap
 * @requires ozpWebtop.models
 * @requires ozp.common.windowSizeWatcher
 * @requires ozpWebtop.addApplicationsModal
 * @requires ozpWebtop.createDashboardModal
 * @requires ozpWebtop.editDashboardModal
 * @requires ozp.common.windowSizeWatcher
 */
angular.module('ozpWebtop.appToolbar', [
  'ui.router',
  'ui.bootstrap',
  'ozpWebtop.models',
  'ozpWebtop.addApplicationsModal',
  'ozpWebtop.createDashboardModal',
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
 * @param models webtop data model
 * @param windowSizeWatcher Notify when window size changes
 * @param maxStickyBoards max number of dashboards
 * @param deviceSizeChangedEvent event name
 * @param dashboardStateChangedEvent event name
 * @param fullScreenModeToggleEvent event name
 * @param highlightFrameOnGridLayoutEvent event name
 */
angular.module( 'ozpWebtop.appToolbar')
  .controller('ApplicationToolbarCtrl', function($scope, $rootScope, $state,
                                                 $modal, $interval, $window,
                                                 $log, models,
                                                 windowSizeWatcher,
                                                 maxStickyBoards,
                                                 deviceSizeChangedEvent,
                                                 dashboardStateChangedEvent,
                                                 fullScreenModeToggleEvent,
                                                 highlightFrameOnGridLayoutEvent,
                                                 removeFramesOnDeleteEvent,
                                                 tooltipDelay, dashboardMaxWidgets) {


    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                            $scope properties
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * @property toolTipDelay length of time to delay showing tooltips on hover
     * @type number
     */
    $scope.toolTipDelay = tooltipDelay;

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
    $scope.dashboardNameLength = 16;

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
    /**
     * @property $scope.maxStickyBoards For number of dashboards user can have
     * @type {number}
     */
    $scope.maxStickyBoards = maxStickyBoards;

    /**
     * @property $scope.maxAppsDisplayed For number of apps user can have
     * @type {number}
     */
    $scope.maxAppsDisplayed = dashboardMaxWidgets;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                           initialization
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // activate the window size watcher so we receive notification when the
    // window size changes
    windowSizeWatcher.run();

    // toolbar is not hidden by default
    $scope.fullScreenMode = false;

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

    function initializeData() {
      if (!models.dataCached()) {
        $log.warn('ApplicationToolbarCtrl: delaying initialization by 500ms - no data yet');
        $scope.initInterval = $interval(function() {
          initializeData();
        }, 500, 1);
        return;
      }
      $scope.apps = models.getApplicationData();
    }


    initializeData();

    /**
     * Handle state change
     *
     *
     * @method handleStateChange
     */
    $scope.handleStateChange= function(dashboardId, dashboardLayout) {
      // get dashboards
      if (!models.dataCached()) {
        $log.warn('ApplicationToolbarCtrl: delaying call to handleStateChange by 500ms - no data yet');
        $scope.handleStateChangeInterval = $interval(function() {
          $scope.handleStateChange(dashboardId, dashboardLayout);
        }, 500, 1);
        return;
      }
      if ($scope.handleStateChangeInterval) {
        $interval.cancel($scope.handleStateChangeInterval);
      }
      var dashboards = models.getDashboards();
      $scope.dashboards = dashboards;
      for (var i=0; i < dashboards.length; i++) {
        if (dashboards[i].id === dashboardId) {
          $scope.currentDashboard = dashboards[i];
        }
      }
      if (!$scope.currentDashboard) {
        $log.warn('WARNING: No dashboards found');
      }

      if ($scope.currentDashboard.layout !== dashboardLayout) {
        $log.debug('dashboard layout mismatch, changing state');
        $state.go('dashboardview.' +
          $scope.currentDashboard.layout + '-sticky-' +
          $scope.currentDashboard.stickyIndex, {
          'dashboardId': $scope.currentDashboard.id});
      }
      $scope.updateApps();
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
      if (!models.dataCached()) {
        $log.warn('ApplicationToolbarCtrl: delaying call to updateApps by 500ms - no data yet');
        $scope.updateAppsInterval = $interval($scope.updateApps, 500, 1);
        return;
      }
      if ($scope.updateAppsInterval) {
        $interval.cancel($scope.updateAppsInterval);
      }

      var dashboards = models.getDashboards();
      $scope.dashboards = dashboards;
      for (var i=0; i < dashboards.length; i++) {
        if (dashboards[i].id === $scope.currentDashboard.id) {
          $scope.currentDashboard = dashboards[i];
          $scope.frames = angular.copy(dashboards[i].frames);
          models.mergeApplicationData($scope.frames);
          $scope.setPinnedApps();
        }
      }
    };

    /**
     * Maximize (or show) a frame that was previously minimized (hidden)
     * @method maximizeFrame
     * @param {Object} e The application to maximize/show
     */
     $scope.maximizeFrame = function(e) {
       if ($scope.currentDashboard.layout === 'grid') {
         $log.debug('sending highlight msg for frame ' + e.id);
         $rootScope.$broadcast(highlightFrameOnGridLayoutEvent, {'frameId': e.id});
       }
       else {
         models.toggleFrameKey(e.id, 'isMinimized');
         $rootScope.$broadcast(dashboardStateChangedEvent, {
           'dashboardId': $scope.currentDashboard.id, 'layout': 'desktop'});
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
      $rootScope.$broadcast(fullScreenModeToggleEvent, {'fullScreenMode': fullScreenVal});
      var resp = models.updateUserSettingByKey('fullScreenMode', fullScreenVal);
      if (resp) {
        // TODO: fix this
        //$rootScope.$broadcast(fullScreenModeToggleEvent, {'fullScreenMode': fullScreenVal});
      } else {
        $log.error('ERROR failed to update fullScreenMode in user ' +
          'settings');
      }
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
      models.cascadeWindows($scope.currentDashboard.id, origin, frameSize);
      // send dashboard state change msg
      $rootScope.$broadcast(dashboardStateChangedEvent, {
         'dashboardId': $scope.currentDashboard.id, 'layout': 'desktop'});
    };

    /**
     * Opens the Add Application modal dialog
     *
     * @method openApplicationsModal
     */
    $scope.openApplicationsModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'userInterface/addApplicationsModal/addApplicationsModal.tpl.html',
        controller: 'AddApplicationsModalInstanceCtrl',
        windowClass: 'app-modal-window-large',
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
        var isOnDashboard = models.isAppOnDashboard(dashboardId, app.id);
        if (isOnDashboard && app.singleton) {
          $log.warn('WARNING: Only one instance of ' + app.name + ' may be on your dashboard');
        } else {
          // TODO: use message broadcast to get grid max rows and grid max cols
          return models.createFrame(dashboardId, app.id);
        }
      }

      modalInstance.result.then(function (response) {
        var dashboardId;
        var stickyIndex;
        if (response.useNewDashboard) {
          // make sure max # of dashboards hasn't been hit
          if ($scope.dashboards.length >= maxStickyBoards) {
            var msg = 'ERROR: Max number of dashboards reached';
            $log.error(msg);
            alert(msg);
            return;
          }
          // create a new dashboard
          // TODO: is this randomly generated name ok?
          var random_integer = Math.floor((Math.random()+0.10)*101);
          var newDashboard = {};
          newDashboard.name = 'Dashboard ' + random_integer.toString();
          models.createDashboard(newDashboard);
          // now get this dashboard id
          var dashboards = models.getDashboards();
          for (var i=0; i < dashboards.length; i++) {
            if (dashboards[i].name === newDashboard.name) {
              dashboardId = dashboards[i].id;
              stickyIndex = dashboards[i].stickyIndex;
            }
          }

          // add the apps to the newly minted dashboard
          for (var a=0; a < response.appsToOpen.length; a++) {
            addAppToDashboard(response.appsToOpen[a], dashboardId);
          }
          // all apps added to dashboard
          // redirect user to new dashboard (grid view by default)
          $state.go('dashboardview.grid-sticky-' + stickyIndex, {
            'dashboardId': dashboardId});
        } else {
          for (var b=0; b < response.appsToOpen.length; b++) {
            addAppToDashboard(response.appsToOpen[b], $scope.currentDashboard.id);
          }
          // all apps added to dashboard
          // current dashboard id and layout hasn't changed, so just reload
          // the applications
          $log.debug('issuing dashboardStateChangedEvent');
          $rootScope.$broadcast(dashboardStateChangedEvent, {
            'dashboardId': $scope.currentDashboard.id,
            'layout': $scope.currentDashboard.layout});
        }

      });
    };

      /**
       * Edit dashboard
       *
       * @method openEditDashboardModal
       * @param board the changed board object
       * @returns {*}
       */

       $scope.openEditDashboardModal = function(board) {
         $scope.board = board;
         $scope.modalInstanceType = 'edit';
         var modalInstance = $modal.open({
           templateUrl: 'userInterface/editDashboardModal/editDashboardModal.tpl.html',
           controller: 'EditDashboardModalInstanceCtrl',
           windowClass: 'app-modal-window-large',
           scope: $scope,
           resolve: {
             dashboard: function() {
               return $scope.board;
             }
           }
         });

         modalInstance.result.then(function (response) {
           // declare dashboard object here to be used in the loop
           var dashboard;
           for (var i=0; i < $scope.dashboards.length; i++) {

             // if the dashboard id's match up
             if ($scope.dashboards[i].id === response.id) {
               // changes the drop-up text
               $scope.dashboards[i].name = response.name;
               if($scope.dashboards[i].layout !== response.layout){ //if dashboard layout not the same as the response layout
                 //set the local scope layout to change, this allows the icon to update
                 $scope.dashboards[i].layout = response.layout;

                 // save the dashboard to the backend
                 dashboard = models.updateDashboard($scope.dashboards[i]);
                 // get the sticky index from the backend
                 $scope.dashboards[i].stickyIndex = dashboard.stickyIndex;

                 // if the current dashboard = the response dashboard, update the state (tears down dom)
                 if($scope.currentDashboard.id === dashboard.id){
                   //stuff
                   $rootScope.$broadcast(dashboardStateChangedEvent, {
                     'dashboardId': dashboard.id,
                     'layout': $scope.dashboards[i].layout});
                   $state.go('dashboardview.' + $scope.dashboards[i].layout + '-sticky-' +
                     $scope.dashboards[i].stickyIndex, {dashboardId: dashboard.id});
                 }
               }
             }
           }
         });
       };

    $scope.openNewDashboardModal = function() {
      if($scope.dashboards.length < maxStickyBoards){
        $scope.modalInstanceType = 'new';
        var modalInstance = $modal.open({
          templateUrl: 'userInterface/createDashboardModal/createDashboardModal.tpl.html',
          controller: 'CreateDashboardModalInstanceCtrl',
          windowClass: 'app-modal-window-large',
          scope: $scope,
          resolve: {
            dashboard: function() {
              return $scope;
            }
          }
        });

        modalInstance.result.then(function (response) {
          // reload current dashboard if the layout type changed (this state
          // change will be ignored if the dashboard id and layout haven't
          // changed)
          var dashboardId, stickyIndex;
          models.createDashboard(response);
          // now get this dashboard id
          var dashboards = models.getDashboards();
          for (var i=0; i < dashboards.length; i++) {
            if (dashboards[i].name === response.name) {
              dashboardId = dashboards[i].id;
              stickyIndex = dashboards[i].stickyIndex;
            }
          }
          $state.go('dashboardview.' + response.layout + '-sticky-' + stickyIndex, {dashboardId: dashboardId});

          // update the dashboard name if that changed
          $rootScope.$broadcast(dashboardStateChangedEvent, {
            'dashboardId': dashboardId,
            'layout': response.layout
          });
        });
      }
      else{
        // $window.confirm('Too many dashboards, your limit it ' + maxStickyBoards);
        alert('You cannot create more dashboards, current limit is ' + maxStickyBoards);
      }
    };

    /**
      * @method openHelpModal
      * @param board the changed board object
      * @returns {*}
      */
    $scope.openDeleteDashboardModal = function(board) {
      $scope.board = board;
      $scope.board.shit = 'cats';
      var modalInstance = $modal.open({
        templateUrl: 'userInterface/deleteDashboardModal/deleteDashboardModal.tpl.html',
        controller: 'deleteDashboardModalCtrl',
        windowClass: 'app-modal-window-large',
        scope: $scope,
        resolve: {
          dashboard: function() {
            return $scope.response;
          }
        }
      });

      modalInstance.result.then(function (response) {
          if (response === 'delete') {
            // Notify the grid controller to remove its widgets.
            $rootScope.$broadcast(removeFramesOnDeleteEvent, {'dashboardId': board.id});
            models.removeDashboard(board.id);
            // redirect user to their first board
            $scope.dashboards = models.getDashboards();
            //if currentDashboard equals the daashboard being deleted's id:
            console.log('booger', $scope.currentDashboard);
            console.log('booger2', board.id);
            if($scope.currentDashboard.id === board.id){
              console.log('deleting dashboard!!!!!!');
              // redirect user to their first board
              $state.go('dashboardview.' + $scope.dashboards[0].layout + '-sticky-' +
                $scope.dashboards[0].stickyIndex, {'dashboardId': $scope.dashboards[0].id});
            }
          }
      });
    };
  });
