'use strict';

/**
 * ozp Chrome module
 *
 * @module ozpWebtop.dashboardView.chrome
 * @requires ozpWebtop.constants
 * @requires ozpWebtop.models.dashboard
 */
angular.module('ozpWebtop.dashboardView.chrome', [
  'ozpWebtop.constants',
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
 * @param dashboardStateChangedEvent event name
 * @namespace dashboardView
 */
chrome.controller('ChromeCtrl', function ($scope, $rootScope, dashboardApi,
                                    dashboardStateChangedEvent) {

  // need to get initial data from frame - can't rely on getting the
  // $stateChangeSuccess message initially
  if ($scope.frame) {
    dashboardApi.getDashboards().then(function(dashboards) {
      for (var i=0; i < dashboards.length; i++) {
        for (var j=0; j < dashboards[i].frames.length; j++) {
          if (dashboards[i].frames[j].id === $scope.frame.id) {
            $scope.dashboardId = dashboards[i].id;
            $scope.layout = dashboards[i].layout;
          }
        }
      }
    });
  } else {
    console.log('WARNING: frame not defined');
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
    dashboardApi.removeFrame($scope.frame.id).then(function() {
      $rootScope.$broadcast(dashboardStateChangedEvent, {
        'dashboardId': $scope.dashboardId, 'layout': $scope.layout});
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });

  };

  /**
   * Hide a frame on the dashboard
   * @method minimizeFrame
   */
  $scope.minimizeFrame = function(){
    dashboardApi.toggleFrameKey($scope.frame.id, 'isMinimized').then(function() {
      $rootScope.$broadcast(dashboardStateChangedEvent, {
        'dashboardId': $scope.dashboardId, 'layout': $scope.layout});
    }).catch(function(error) {
      console.log('should not have happened: ' + error);
    });
  };

  /**
   * Show a frame on the dashboard
   * @method maximizeFrame
   */
  $scope.maximizeFrame = function(){
    dashboardApi.toggleFrameKey($scope.frame.id, 'isMaximized').then(function() {
      $rootScope.$broadcast(dashboardStateChangedEvent, {
        'dashboardId': $scope.dashboardId, 'layout': $scope.layout});
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
    controller: 'ChromeCtrl',
    scope: {
      'frame': '='
    }
  };
});
