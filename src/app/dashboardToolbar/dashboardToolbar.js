'use strict';

/**
 * The dashboard toolbar component shown in the Webtop.
 *
 * @module ozpWebtop.dashboardToolbar
 * @requires ozp.common.windowSizeWatcher
 * @requires ozpWebtop.models.dashboard
 * @requires ozpWebtop.models.userSettings
 * @requires ozpWebtop.services.dashboardChangeMonitor
 */
angular.module('ozpWebtop.dashboardToolbar', [ 'ozp.common.windowSizeWatcher',
  'ozpWebtop.models.dashboard',
  'ozpWebtop.models.userSettings',
  'ozpWebtop.services.dashboardChangeMonitor']);

var dashboardApp = angular.module( 'ozpWebtop.dashboardToolbar')
/**
 * Controller for dashboard toolbar located at the top of Webtop
 *
 * Includes:
 * - menu with links to other OZP resources
 * - dashboard selector
 * - buttons to switch between grid and desktop layouts
 * - notifications (TODO)
 * - zulu clock
 * - username button with dropdown to access user preferences, help, and logout
 *
 * The toolbar can also be hidden by clicking on a button
 *
 * ngtype: controller
 *
 * @class DashboardToolbarCtrl
 * @constructor
 * @param $scope ng $scope
 * @param $rootScope ng $rootScope
 * @param $interval ng $interval
 * @param dashboardApi dashboard data
 * @param dashboardChangeMonitor notify when dashboard changes
 * @param userSettingsApi user preferences data
 * @param windowSizeWatcher notify when window size changes
 * @param deviceSizeChangedEvent event name
 * @param dashboardSwitchedEvent event name
 * @param toolbarVisibilityChangedEvent event name
 * @param userPreferencesUpdatedEvent event name
 * @param launchUserPreferencesModalEvent event name
 * @namespace dashboardToolbar
 *
 */
.controller('DashboardToolbarCtrl',
  function($scope, $rootScope, $interval, dashboardApi, dashboardChangeMonitor,
           userSettingsApi, windowSizeWatcher, deviceSizeChangedEvent,
           dashboardSwitchedEvent, toolbarVisibilityChangedEvent,
           userPreferencesUpdatedEvent, launchUserPreferencesModalEvent) {

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
     * @property usernameLength Max length of username, based on
     * current screen size
     * @type {Number}
     */
    $scope.usernameLength = 0;

    /**
     * @property dashboards Dashboards for current user
     * @type {Array}
     */
    $scope.dashboards = [];

    /**
     * @property dashbaordhide Flag indicating if dashboard toolbar is hidden
     * @type {boolean}
     */
    $scope.dashboardhide = false;

    /**
     * @property currentDashboard Current active dashboard
     * @type {string}
     */
    $scope.currentDashboard = '';

    /**
     * @property Dashboard layout (grid or desktop)
     * @type {string}
     */
    $scope.layout = 'grid';

    /**
     * @property user Current user's username
     * @type {string}
     */
    $scope.user = '';

    /**
     * @property dashboardId Current dashboard id
     * @type {string}
     */
    $scope.dashboardId = '';

    /**
     * @property messages Messages for current user TBD
     * @type {Array}
     */
    $scope.messages = {
      'unread': 0,
      'messages': [
        {
          'subject': 'Photo Editing Tools',
          'message': 'Daryl just shared a dashboard with you! ' +
          'Click to add it to your webtop.'
        },
        {
          'subject': 'Math Tools',
          'message': 'Kay just shared a dashboard with you! It has some great' +
            ' things!'
        }
      ]
    };

    /**
     * @property zuluTime Current time (zulu)
     * @type {string}
     */
    $scope.zuluTime = '';

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                           initialization
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // invoked in initialization so the method must be declared first
    /**
     * Update the zulu clock
     * @method getZuluTime
     * @returns {string} Zulu time formatted as 03:08
     */
    $scope.getZuluTime = function() {
      var d = new Date();
      var hours = d.getUTCHours().toString();
      if (hours.length === 1) {
        hours = '0' + hours;
      }
      var minutes = d.getUTCMinutes().toString();
      if (minutes.length === 1) {
        minutes = '0' + minutes;
      }
      return hours + ':' + minutes;
    };

    // register for notifications when window size changes
    windowSizeWatcher.run();

    // register to receive notifications if dashboard layout changes
    dashboardChangeMonitor.run();

    // get dashboards for current user
    dashboardApi.getDashboards().then(function(dashboards) {
      $scope.dashboards = dashboards;
      //default dashboardToolbar is not hidden
      $scope.dashboardhide = false;
      // default board is 0
      // TODO: Load last board that was used
      if (dashboards) {
        $scope.currentDashboard = $scope.dashboards[0];
      } else {
        console.log('WARNING: No dashboards found');
      }
      // default layout is grid
      $scope.layout = 'grid';
      dashboardApi.getDashboardData().then(function(dashboardData) {
        $scope.user = dashboardData.user;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });

    // initialize zulu time
    $scope.zuluTime = $scope.getZuluTime();

    // update the clock every minute
    $interval(function() {
      $scope.zuluTime = $scope.getZuluTime();
    }, 1000);

    $scope.$on(deviceSizeChangedEvent, function(event, value) {
      handleDeviceSizeChange(value);
    });

    $scope.$on(dashboardSwitchedEvent, function(event, dashboardChange) {
      handleDashboardChange(dashboardChange);
    });

    $scope.$on(userPreferencesUpdatedEvent, function() {
      handleUserSettingsChange();
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                          methods
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Handler invoked when window size changes across device size boundaries
     * as defined by Bootstrap
     *
     * @method handleDeviceSizeChange
     * @param value value.deviceSize is one of 'xs', 'sm', 'md', or 'lg'
     */
    function handleDeviceSizeChange(value) {
      if (value.deviceSize === 'sm') {
        $scope.dashboardNameLength = 9;
        $scope.usernameLength = 9;
      } else if (value.deviceSize === 'md') {
          $scope.dashboardNameLength = 28;
          $scope.usernameLength = 12;
      } else if (value.deviceSize === 'lg') {
          $scope.dashboardNameLength = 48;
          $scope.usernameLength = 12;
      }
    }

    /**
     * Handler invoked when dashboard change event occurs
     *
     * @method handleDashboardChange
     * @param dashboardChange contains dashboardId and layout of dashboard
     */
    function handleDashboardChange(dashboardChange) {
      $scope.layout = dashboardChange.layout;
      $scope.dashboardId = dashboardChange.dashboardId;

      //only change local scopes user if the dashboard api user changes
      dashboardApi.getDashboardData().then(function(dashboardData) {
        if ($scope.user !== dashboardData.user) {
          $scope.user = dashboardData.user;
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });

      dashboardApi.getDashboardById($scope.dashboardId).then(function(dashboard) {
        $scope.currentDashboard = dashboard;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    }

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
     * Launch the user preferences modal dialog
     *
     * Sends launchUserPreferencesModalEvent
     *
     * @method launchSettingsModal
     */
    $scope.launchSettingsModal = function() {
      $rootScope.$broadcast(launchUserPreferencesModalEvent, {
        launch: 'true'
      });
    };

    /**
     * Toggle the state of the toolbar (shown vs hidden)
     *
     * @method dashboardhider
     */
    $scope.dashboardhider = function() {
      var hideToolbar = false;
      if ((!$scope.dashboardhide) || ($scope.dashboardhide = false)){
        hideToolbar = true;
      }
      $scope.dashboardhide = hideToolbar;
      userSettingsApi.updateUserSettingByKey('isDashboardHidden', hideToolbar).then(function(resp) {
        if (resp) {
          $rootScope.$broadcast(toolbarVisibilityChangedEvent);
        } else {
          console.log('ERROR failed to update isDashboardHidden in user settings');
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    };

    // TODO: these might go away

    $scope.helpUser = function() {
      alert('Help functionality coming soon!');
    };

    $scope.logOutUser = function() {
      alert('Logout functionality coming soon!');
    };

    $scope.gotToAppLibrary = function() {
      alert('Go to App Library not yet implemented');
    };

    $scope.goToAppBuilder = function() {
      alert('Go to App Builder not yet implemented');
    };

    $scope.gotToHud = function() {
      alert('Go to HUD not yet implemented');
    };

    $scope.submitListing = function() {
      alert('Go to Submit Listing not yet implemented');
    };

    $scope.goToMetrics = function() {
      alert('Go to Metrics not yet implemented');
    };

    $scope.goToDeveloperResources = function() {
      alert('Go to Developer Resources not yet implemented');
    };
  }
);

/**
 * Directive for the dashboard toolbar
 *
 * ngtype: directive
 *
 * @class dashboardToolbar
 * @static
 * @namespace dashboardToolbar
 */
dashboardApp.directive('dashboardToolbar', function(){
  return {
   restrict: 'E',
   templateUrl: 'dashboardToolbar/dashboardToolbar.tpl.html',
   replace: false,
   transclude: false,
   scope: true,
   link: function(scope, elem/*, attrs*/) {
     console.log('elem: ' + elem);

     scope.$watch('dashboardhide', function() {
       if (scope.dashboardhide) {
         // TODO: a cleaner way?
         $('body').css('padding-top', '16px');
       } else {
         $('body').css('padding-top', '57px');
         $('.navbar-fixed-top').css('top', '16px');
       }
     });
   }
  };
});
