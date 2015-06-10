'use strict';

/**
 * The ozp toolbar component shown in the Webtop.
 *
 * @module ozpWebtop.ozpToolbar
 * @requires ozp.common.windowSizeWatcher
 * @requires ozpWebtop.models
 */
angular.module('ozpWebtop.ozpToolbar', [ 'ozp.common.windowSizeWatcher',
  'ozpWebtop.models', 'ozpWebtop.settingsModal','ozpWebtop.services.restInterface']);

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
 * @param windowSizeWatcher notify when window size changes
 * @param deviceSizeChangedEvent event name
 * @param fullScreenModeToggleEvent event name
 * @namespace ozpToolbar
 *
 */
.controller('OzpToolbarCtrl',
  function($scope, $rootScope, $window, $log, $modal,
           models, windowSizeWatcher, deviceSizeChangedEvent, tooltipDelay,
           fullScreenModeToggleEvent, restInterface, notificationReceivedEvent) {

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                            $scope properties
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * @property toolTipDelay length of time to delay showing tooltips on hover
     * @type number
     */
    $scope.toolTipDelay = tooltipDelay;
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
    * @property messages Messages that have not been dismissed
    * type {array}
    */
    $scope.messages = [];

    /**
    * @property thereAreUnexpiredNotifications Whether or not there are unexpired 
    *           notifications, used to change class in template to notify use
    * type {boolean}
    */
    $scope.thereAreUnexpiredNotifications = false;

    $rootScope.$on(notificationReceivedEvent, function(event, data){
      //first check to see if there are any notifications
      if(data._embedded){
        //If the messages are already in an array
        if(data._embedded.item instanceof Array) {
          $scope.messages = data._embedded.item;
        }
        //If the messages are not in an array (for ng-repeat)
        else{
          $scope.messages.push(data._embedded.item);
        }
        $scope.messageCount = data._embedded.item.length;
        $scope.thereAreUnexpiredNotifications = true;
      }
    });


    $scope.dismissNotification = function(a){
      for(var b in $scope.messages){
        if($scope.messages[b].id === a.id){
          //update the backend so other apps know message has been dismissed
          models.dismissNotification(a);
          //delete local message from scope
          $scope.messages.splice(b, 1);
        }
      }
      if($scope.messageCount > 0){
        $scope.messageCount = $scope.messageCount - 1;
      }
      if($scope.messages.length === 0){
        // no messages, switch bell icon in template
        $scope.thereAreUnexpiredNotifications = false;
      }

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

    $scope.hudUrl = $window.OzoneConfig.HUD_URL;
    $scope.centerUrl = $window.OzoneConfig.CENTER_URL;
    $scope.webtopUrl = $window.OzoneConfig.WEBTOP_URL;
    $scope.metricsUrl = $window.OzoneConfig.METRICS_URL;
    $scope.developerResourcesUrl = $window.OzoneConfig.DEVELOPER_RESOURCES_URL;
    $scope.feedbackAddress = $window.OzoneConfig.FEEDBACK_ADDRESS;
    $scope.feedbackTarget = '_blank';

    if($scope.feedbackAddress.substring(0,7)=== 'mailto:'){
      $scope.feedbackTarget = '_self';
    }


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


    /**
      * @method openHelpModal
      * @param board the changed board object
      * @returns {*}
      */
    $scope.openHelpModal = function(board) {
      $scope.board = board;
      var modalInstance = $modal.open({
        templateUrl: 'helpModal/helpModal.tpl.html',
        controller: 'helpModalInstanceCtrl',
        windowClass: 'app-modal-window-large',
        scope: $scope,
        resolve: {
          dashboard: function() {
            // return $scope.board;
            return $scope.board;
          }
        }
      });

      modalInstance.result.then(function () {

      });
    };



    /**
      * @method openProfileModal
      * @param board the changed board object
      * @returns {*}
      */
    $scope.openProfileModal = function(board) {
      $scope.board = board;
      var modalInstance = $modal.open({
        templateUrl: 'profileModal/profileModal.tpl.html',
        controller: 'profileModalInstanceCtrl',
        windowClass: 'app-modal-window',
        scope: $scope,
        resolve: {
          dashboard: function() {
            // return $scope.board;
            return $scope.board;
          }
        }
      });

      modalInstance.result.then(function () {

      });
    };


     /**
      * @method opensettingsModal
      * @param board the changed board object
      * @returns {*}
      */
    $scope.openSettingsModal = function(board) {
      $scope.board = board;
      var modalInstance = $modal.open({
        templateUrl: 'settingsModal/settingsModal.tpl.html',
        controller: 'settingsModalInstanceCtrl',
        windowClass: 'app-modal-window',
        scope: $scope,
        resolve: {
          dashboard: function() {
            // return $scope.board;
            return $scope.board;
          }
        }
      });

      modalInstance.result.then(function () {

      });
    };


    /**
      * @property isAdmin indicates if the metrics link in ozpToolbar should be hidden
      */
     restInterface.getProfile().then(function(d){
       var userRole=d.highestRole;
       if(userRole === 'ADMIN' || userRole === 'METRICS'){
          $scope.isAdmin =  true;
       }else{
         $scope.isAdmin = false;
       }
    }); 
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
   link: function(scope/*, elem, attrs*/) {

     scope.$watch('fullScreenMode', function() {
       if (scope.fullScreenMode) {
         // TODO: a cleaner way?
         $('body').css('margin', '16px 0px');
       } else {
         $('body').css('margin', '57px 0px');
         $('.navbar-fixed-top').css('top', '20px');
       }
     });
   }
  };
});

/** 
 * Filter for converting date to user friendly format
*/
app.filter('cmdate', [
  '$filter', function($filter) {
    return function(input, format) {
      return $filter('date')(new Date(input), format) + ' ' + String(String(new Date()).split('(')[1]).split(')')[0];
    };
  }
]);