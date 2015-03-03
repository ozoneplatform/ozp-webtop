'use strict';

/**
 * Top level module of the Webtop. When declared in an HTML file, it bootstraps
 * the Webtop.
 *
 * @example
 *     <body ng-app="ozpWebtop"> ... </body>
 *
 * @module ozpWebtop
 * @requires ozp.common.ellipticalFilter
 * @requires ozp.common.iwc.client
 * @requires ozp.common.localStorage
 * @requires ozp.common.urlOriginComparer
 * @requires ozp.common.utilities
 * @requires ozp.common.windowSizeWatcher
 * @requires ozpWebtop.constants
 * @requires ozpWebtop.services.iwcInterface
 * @requires ozpWebtop.services.localStorageInterface
 * @requires ozpWebtop.models.dashboard
 * @requires ozpWebtop.models.marketplace
 * @requires ozpWebtop.models.userSettings
 * @requires ozpWebtop.appLauncher
 * @requires ozpWebtop.appToolbar
 * @requires ozpWebtop.ozpToolbar
 * @requires ozpWebtop.dashboardView.button
 * @requires ozpWebtop.dashboardView.chrome
 * @requires ozpWebtop.dashboardView.desktop
 * @requires ozpWebtop.dashboardView.desktop.managedFrame
 * * @requires ozpWebtop.dashboardView
 * @requires ozpWebtop.dashboardView.grid
 * @requires ozpWebtop.addApplicationsModal
 * @requires ozpWebtop.editDashboardModal
 * @requires ozpWebtop.urlWidgetLauncher
 * @requires ui.router
 * @requires ct.ui.router.extras
 * @requires ui.bootstrap
 * @requires gridster
 * @requires ozpIwcClient
 * @requires ozpClassification
 */
angular.module( 'ozpWebtop', [
  'ozp.common.ellipticalFilter',
  'ozp.common.iwc.client',
  'ozp.common.localStorage',
  'ozp.common.urlOriginComparer',
  'ozp.common.utilities',
  'ozp.common.windowSizeWatcher',
  'templates-app',
  'templates-common',
  'ozpWebtop.constants',
  'ozpWebtop.services.iwcInterface',
  'ozpWebtop.services.localStorageInterface',
  'ozpWebtop.models.dashboard',
  'ozpWebtop.models.marketplace',
  'ozpWebtop.models.userSettings',
  'ozpWebtop.appLauncher',
  'ozpWebtop.appToolbar',
  'ozpWebtop.ozpToolbar',
  'ozpWebtop.dashboardView.button',
  'ozpWebtop.dashboardView.chrome',
  'ozpWebtop.dashboardView.desktop',
  'ozpWebtop.dashboardView.desktop.managedFrame',
  'ozpWebtop.dashboardView',
  'ozpWebtop.dashboardView.grid',
  'ozpWebtop.addApplicationsModal',
  'ozpWebtop.editDashboardModal',
  'ozpWebtop.urlWidgetLauncher',
  'ui.router',
  'ct.ui.router.extras',
  'ui.bootstrap',
  'gridster',
  'ozpIwcClient',
  'ozpClassification'
])

.config(function($stateProvider, $urlRouterProvider,
                 maxStickyBoards) {

    var states = [];

    states.push({name: 'dashboardview', url: '/',
      views: {
        '@': {controller: 'DashboardViewCtrl',
          templateUrl: 'dashboardView/dashboardView.tpl.html'}
    }});

    // Sticky views
    for (var slot=0; slot < maxStickyBoards; slot++) {
      var gridViewName = 'gridlayout-' + slot + '@dashboardview';
      var desktopViewName = 'desktoplayout-' + slot + '@dashboardview';
      var gridState = {
        name: 'dashboardview.grid-sticky-' + slot,
        url: 'grid/sticky-' + slot + '/:dashboardId',
        views: {},
        deepStateRedirect: true,
        sticky: true
      };
      gridState.views[gridViewName] = {controller: 'GridCtrl',
        templateUrl: 'dashboardView/grid/grid.tpl.html'};

      states.push(gridState);

      var desktopState = {
        name: 'dashboardview.desktop-sticky-' + slot,
        url: 'desktop/sticky-' + slot + '/:dashboardId',
        views: {},
        deepStateRedirect: true,
        sticky: true
      };
      desktopState.views[desktopViewName] = {controller: 'DesktopCtrl',
        templateUrl: 'dashboardView/desktop/desktop.tpl.html'};

      states.push(desktopState);
    }

    states.push({name: 'url-launch-app', url: '/launchApp/:appId',
      controller: 'UrlWidgetLauncherCtrl'});

    angular.forEach(states, function(state) { $stateProvider.state(state); });
    $urlRouterProvider.otherwise('/');
  })

.run( function run ($rootScope, $state, $http, $window, $log, dashboardApi, marketplaceApi,
                    userSettingsApi, useIwc, initialDataReceivedEvent) {

    $rootScope.$state = $state;

    // if using LocalStorage, generate sample data up front
    if (!useIwc) {
      // create example marketplace and dashboard resources
      marketplaceApi.createExampleMarketplace();
      $log.debug('attempting to create example dashboards from app.js');
      dashboardApi.createExampleDashboards().then(function() {
      $log.debug('created example dashboards from app.js');
      });
      // create example user settings
      userSettingsApi.createExampleUserSettings().then(function() {
        // created example user settings
      });
    }

    // get app data and dashboard data
    $http.get($window.OzoneConfig.API_URL + '/profile/self/library', {withCredentials: true, headers: {'Content-Type': 'application/vnd.ozp-library-v1+json'}}).success(function(data, status) {
      if (status !== 200) {
          $log.warn('WARNING: got non 200 status from /profile/self/library: ' + status);
        }
      dashboardApi.setApplicationData(data);
      // now the the current dashboard data
      $http.get($window.OzoneConfig.API_URL + '/profile/self/data/dashboard-data', {withCredentials: true, headers: {'Content-Type': 'application/vnd.ozp-iwc-data-object-v1+json'}}).success(function(data, status) {
        if (status !== 200) {
          $log.warn('WARNING: got non 200 status from /profile/self/data/dashboard-data: ' + status);
        }
        var parsedData = JSON.parse(data['entity']); // jshint ignore:line
        // TODO: this is abusing the IWC store on the backend!
        // dashboardApi.setInitialDashboardData(parsedData.entity);

        dashboardApi.setInitialDashboardData(parsedData).then(function() {
          $log.info('application listings and dashboard data retrieved - ready to start');
          $rootScope.$broadcast(initialDataReceivedEvent);
        });
      }).error(function(data, status) {
        if (status === 404) {
          $log.warn('No dashboard data found. Creating default dashboard');
          dashboardApi.setInitialDashboardData({}).then(function() {
            $log.info('application listings and dashboard data retrieved - ready to start');
            $rootScope.$broadcast(initialDataReceivedEvent);
          });
        } else {
         $log.error('ERROR getting dashboard data. status: ' + JSON.stringify(status) + ', data: ' + JSON.stringify(data));
        }
      });
    }).error(function(data, status) {
      $log.error('ERROR getting user library. status: ' + JSON.stringify(status) + ', data: ' + JSON.stringify(data));
    });
});
