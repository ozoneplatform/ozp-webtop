'use strict';

/**
 * The ozp toolbar component shown in the Webtop.
 *
 * @module ozpWebtop.ozpToolbar
 * @requires ozp.common.windowSizeWatcher
 * @requires ozpWebtop.models.userSettings
 */
angular.module('ozpWebtop.ozpToolbar', [ 'ozp.common.windowSizeWatcher',
  'ozpWebtop.models.userSettings']);

var app = angular.module( 'ozpWebtop.ozpToolbar')
/**
 * Controller for ozp toolbar located at the top of Webtop
 *
 * Includes:
 * - menu with links to other OZP resources
 * - notifications (TODO)
 * - username button with dropdown to access user preferences, help, and logout
 *
 * ngtype: controller
 *
 * @class OzpToolbarCtrl
 * @constructor
 * @param $scope ng $scope
 * @param $rootScope ng $rootScope
 * @param userSettingsApi user preferences data
 * @param windowSizeWatcher notify when window size changes
 * @param deviceSizeChangedEvent event name
 * @param fullScreenModeToggleEvent event name
 * @namespace ozpToolbar
 *
 */
.controller('OzpToolbarCtrl',
  function($scope, $rootScope,
           userSettingsApi, windowSizeWatcher, deviceSizeChangedEvent,
           fullScreenModeToggleEvent) {

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                            $scope properties
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * @property usernameLength Max length of username, based on
     * current screen size
     * @type {Number}
     */
    $scope.usernameLength = 0;

    /**
     * @property fullScreenMode Flag indicating if toolbar should be hidden
     * @type {boolean}
     */
    $scope.fullScreenMode = false;

    /**
     * @property user Current user's username
     * @type {string}
     */
    $scope.user = 'J Smith';

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

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                           initialization
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // register for notifications when window size changes
    windowSizeWatcher.run();

    // TODO: $scope.user was coming from dashboard api

    $scope.$on(deviceSizeChangedEvent, function(event, value) {
      handleDeviceSizeChange(value);
    });

    $scope.$on(fullScreenModeToggleEvent, function(event, data) {
      $scope.fullScreenMode = data.fullScreenMode;
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
        $scope.usernameLength = 9;
      } else if (value.deviceSize === 'md') {
          $scope.usernameLength = 12;
      } else if (value.deviceSize === 'lg') {
          $scope.usernameLength = 12;
      }
    }

    // TODO: these might go away

    $scope.launchPreferences = function() {
      alert('Launch Preferences functionality coming soon!');
    };

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
 * Directive for the ozp toolbar
 *
 * ngtype: directive
 *
 * @class ozpToolbar
 * @static
 * @namespace ozpToolbar
 */
app.directive('ozpToolbar', function(){
  return {
   restrict: 'E',
   templateUrl: 'ozpToolbar/ozpToolbar.tpl.html',
   replace: false,
   transclude: false,
   scope: true,
   link: function(scope, elem/*, attrs*/) {
     console.log('elem: ' + elem);

     scope.$watch('fullScreenMode', function() {
       if (scope.fullScreenMode) {
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
