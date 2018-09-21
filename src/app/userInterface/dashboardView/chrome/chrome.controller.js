'use strict';

/**
 * ozp Chrome module
 *
 * @module ozpWebtop.dashboardView.chrome
 * @requires ozpWebtop.constants
 * @requires ozpWebtop.models
 */
angular.module('ozpWebtop.dashboardView.chrome', [
  'ozpWebtop.constants',
  'ozpWebtop.models']);

angular.module('ozpWebtop.dashboardView.chrome')

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
 * @param models dashboard data
 * @param dashboardStateChangedEvent event name
 * @namespace dashboardView
 */
.controller('ChromeCtrl', function ($scope, $rootScope, $log, models,
                                    dashboardStateChangedEvent) {

  // need to get initial data from frame - can't rely on getting the
  // $stateChangeSuccess message initially
  if ($scope.frame) {
    var dashboards = models.getDashboards();
    for (var i=0; i < dashboards.length; i++) {
      for (var j=0; j < dashboards[i].frames.length; j++) {
        if (dashboards[i].frames[j].id === $scope.frame.id) {
          $scope.dashboardId = dashboards[i].id;
          $scope.layout = dashboards[i].layout;
        }
      }
    }
  } else {
    $log.warn('WARNING: frame not defined');
  }

  $scope.$on('$stateChangeSuccess',
    function(event, toState, toParams/*, fromState, fromParams*/){
      if (toState.name.indexOf('grid-sticky') > -1) {
        $scope.layout = 'grid';
      } else if (toState.name.indexOf('desktop-sticky') > -1) {
        $scope.layout = 'desktop';
      } else {
        return;
      }
      $scope.dashboardId = toParams.dashboardId;
  });

  /**
   * Remove a frame from the current dashboard and send
   * dashboardStateChangedEvent
   *
   * @method removeFrame
   */
  $scope.removeFrame = function(){
    models.removeFrame($scope.frame.id);
    $rootScope.$broadcast(dashboardStateChangedEvent, {
      'dashboardId': $scope.dashboardId, 'layout': $scope.layout});
  };

  /**
   * Maximize/return to normal widget window
   * @method toggleFrameFullscreen
   */

  $scope.toggleFrameFullscreen = function(){
    models.toggleFrameKey($scope.frame.id, 'isMaximized');
    $rootScope.$broadcast(dashboardStateChangedEvent, {
      'dashboardId': $scope.dashboardId, 'layout': $scope.layout});
  };

  /**
   * Minimize widget window
   * @method toggleFrameMinimized
   */
   $scope.toggleFrameMinimized = function toggleFrameMinimized() {
    models.toggleFrameKey($scope.frame.id, 'isMinimized');
    $rootScope.$broadcast(dashboardStateChangedEvent, {
      dashboardId: $scope.dashboardId,
      layout: $scope.layout
    });
  };

});
