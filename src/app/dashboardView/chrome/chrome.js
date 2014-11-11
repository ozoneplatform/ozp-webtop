'use strict';

/**
 * ozp Chrome module
 *
 * @module ozpWebtop.dashboardView.chrome
 * @requires ozpWebtop.constants
 * @requires ozpWebtop.services.dashboardChangeMonitor
 * @requires ozpWebtop.models.dashboard
 */
angular.module('ozpWebtop.dashboardView.chrome', [
  'ozpWebtop.constants', 'ozpWebtop.services.dashboardChangeMonitor',
  'ozpWebtop.models.dashboard']);

var chrome = angular.module('ozpWebtop.dashboardView.chrome');

/**
 * ChromeCtrl aids the ozpChrome directive in knowing its location
 * (grid or desktop).
 *
 * ngtype: controller
 *
 * @class ChromeCtrl
 * @constructor
 * @param $scope ng $scope
 * @param $rootScope ng $rootScope
 * @param dashboardApi dashboard data
 * @param dashboardChangeMonitor notify when active dashboard changes
 * @param dashboardStateChangedEvent event name
 * @namespace dashboardView
 */
chrome.controller('ChromeCtrl', function ($scope, $rootScope, dashboardApi,
                                    dashboardChangeMonitor,
                                    dashboardStateChangedEvent) {


    // register to receive notifications if dashboard changes
    dashboardChangeMonitor.run();

    if (dashboardChangeMonitor.layout === 'grid') {
      $scope.isGrid = true;
    } else {
      $scope.isGrid = false;
    }

    /**
     * Remove a frame from the current dashboard and send
     * dashboardStateChangedEvent
     *
     * @method isDisabled
     * @param e the frame (?) clicked containing e.id
     */
    $scope.isDisabled = function(e){
      dashboardApi.removeFrame(e.id).then(function() {
        $rootScope.$broadcast(dashboardStateChangedEvent);
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });

    };

    /**
     * Hide a frame on the dashboard
     * @method minimizeFrame
     * @param e The frame (?) clicked containing e.id
     */
    $scope.minimizeFrame = function(e){
      dashboardApi.toggleFrameKey(e.id, 'isMinimized').then(function() {
        $rootScope.$broadcast(dashboardStateChangedEvent);
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });

    };

    /**
     * Show a frame on the dashboard
     * @method maximizeFrame
     * @param e The frame (?) clicked containing e.id
     */
    $scope.maximizeFrame = function(e){
      dashboardApi.toggleFrameKey(e.id, 'isMaximized').then(function() {
        $rootScope.$broadcast(dashboardStateChangedEvent);
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    };

});

/**
 * Directive for chrome (bar appearing across the top of each widget)
 *
 * ngtype: directive
 *
 * @class ozpChrome
 * @static
 * @namespace dashboardView
 */
chrome.directive('ozpChrome', function () {
  return {
    templateUrl: 'dashboardView/chrome/ozpchrome.tpl.html',
    restrict: 'E',
    replace: true,
    controller: 'ChromeCtrl'
  };
});
