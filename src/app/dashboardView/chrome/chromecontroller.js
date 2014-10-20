'use strict';

angular.module('ozpWebtopApp.dashboardView')
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
 * @param dashboardSwitchedEvent event name
 * @namespace dashboardView
 */
.controller('ChromeCtrl', function ($scope, $rootScope, dashboardApi,
                                    dashboardChangeMonitor,
                                    dashboardStateChangedEvent,
                                    dashboardSwitchedEvent) {


    // register to receive notifications if dashboard changes
    dashboardChangeMonitor.run();

    $scope.$on(dashboardSwitchedEvent, function(event, dashboardChange) {
      handleDashboardChange(dashboardChange);
    });

    /**
     * Handler invoked when active dashboard changes
     * @method handleDashboardChange
     * @param dashboardChange contains layout and dashboardId info
     */
    function handleDashboardChange(dashboardChange) {
      // Determine if chrome is being used in the grid view
      if (dashboardChange.layout === 'grid') {
        $scope.isGrid = true;
      } else {
        $scope.isGrid = false;
      }
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
