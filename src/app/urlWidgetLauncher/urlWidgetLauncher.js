'use strict';

/**
 * The url widget launcher launches a new widget in the user's current dashboard
 * (a new dashboard is created containing this widget if no dashboards for the
 * user exist). This is a stop gap solution - ultimately, this functionality
 * needs to be handled via IWC Intents
 *
 * @module ozpWebtop.urlWidgetLauncher
 */
angular.module('ozpWebtop.urlWidgetLauncher', []);

var app = angular.module( 'ozpWebtop.urlWidgetLauncher');
/**
 * Controller for url widget launcher
 *
 * ngtype: controller
 *
 * @class UrlWidgetLauncherCtrl
 * @constructor
 * @param $scope ng $scope
 * @param $rootScope ng $rootScope
 * @namespace urlWidgetLauncher
 *
 */
app.controller('UrlWidgetLauncherCtrl',
  function($scope, $q, $state, $log, $interval, models, widgetService, restInterface) {

    $scope.$on('$stateChangeSuccess',
      function(event, toState, toParams) {
        if (toState.name === 'url-launch-app') {
          $scope.handleStateChange(toParams);
        }
        if (toState.name === 'url-launch-folder') {
          $scope.launchFolder(toParams);
        }
    });

    $scope.launchFolder = function(toParams){

      //if no data... get data
      if (!models.dataCached()) {
        $log.warn('UrlWidgetLauncherCtrl: delaying call to handleStateChange by 500ms - no data yet');
        $scope.handleStateChangeInterval = $interval(function() {
          $scope.handleStateChange(toParams);
        }, 500, 1);
        return;
      }
      if ($scope.handleStateChangeInterval) {
        $interval.cancel($scope.handleStateChangeInterval);
      }

      //array of objects for widgets, {id:<#>, uuid:<alphanumeric>}
      $scope.widgetArray = JSON.parse(toParams.appIds);

      //create a new dashboard object based on folder name that we can pass to the backend
      $scope.newDashboard = {
        name: toParams.dashName
      };

      //then actually create the new empty dashboard in the backend
      // TODO - investigate returning the dashboardId and stickyIndex

      models.createDashboard($scope.newDashboard);

      //dashboard created, now request all the dashboards from the backend
      var dashboards = models.getDashboards();
      //
      for (var i=0; i < dashboards.length; i++) {
        if (dashboards[i].name === toParams.dashName) {
          $scope.dashboardId = dashboards[i].id;
          $scope.stickyIndex = dashboards[i].stickyIndex;
        }
      }

      function bookmark(inArray) {
        if (angular.isArray(inArray) && inArray.length > 0) {
          widgetService.bookmarkWidget(inArray[0].id)
            .then(
            function(result) {
              $log.info('Bookmarking Widget, ', result);
              inArray.shift();
              bookmark(inArray);
            },
            function(data) {
              $log.warn('Error Bookmarking Widget: ', data);
            }
          );
        }
      }
      bookmark($scope.widgetArray);

      //set new webtop data because new bookmarks
      restInterface.getWebtopData().then(function(webtopData) {
        $log.info('Setting Webtop Data');
        console.log(webtopData);
        models.setInitialWebtopData(webtopData);
      });

      // add the apps to the newly minted dashboard
      for (var a=0; a < $scope.widgetArray.length; a++) {
        widgetService.createFrame($scope.dashboardId, $scope.widgetArray[a].uuid);
      }

      // redirect user to new dashboard (grid view by default)
      $state.go('dashboardview.grid-sticky-' + $scope.stickyIndex, {
        'dashboardId': $scope.dashboardId});
    };
    /*
      handles single apps into current dashboard
    */
    $scope.handleStateChange = function(toParams) {
      if (!models.dataCached()) {
        $log.warn('UrlWidgetLauncherCtrl: delaying call to handleStateChange by 500ms - no data yet');
        $scope.handleStateChangeInterval = $interval(function() {
          $scope.handleStateChange(toParams);
        }, 500, 1);
        return;
      }
      if ($scope.handleStateChangeInterval) {
        $interval.cancel($scope.handleStateChangeInterval);
      }
      $log.debug('Opening app ' + toParams.appId);
      var dashboard = models.getCurrentDashboard();
      if (!dashboard) {
        $log.warn('Warning: no current dashboard');
        // just use the first board
        dashboard = models.getDashboards()[0];
      }
      // redirect user to this dashboard after adding this app to the board
      widgetService.createFrame(dashboard.id, toParams.appId);
      $log.debug('Adding app ' + toParams.appId + ' to existing dashboard ' + dashboard.id + ' and redirecting ...');
      $state.go('dashboardview.' + dashboard.layout + '-sticky-' +
        dashboard.stickyIndex, {dashboardId: dashboard.id});
    };
  }
);
