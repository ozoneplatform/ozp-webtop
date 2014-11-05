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
 * @requires ozpWebtop.services.dashboardChangeMonitor
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
 * @requires ozpWebtop.dashboardView.iframe
 * @requires ozpWebtop.dashboardView.grid
 * @requires ozpWebtop.dashboardView.grid.gridsterFrame
 * @requires ozpWebtop.userSettings
 * @requires ozpWebtop.addApplicationsModal
 * @requires ui.router
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
  'ozpWebtop.services.dashboardChangeMonitor',
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
  'ozpWebtop.dashboardView.iframe',
  'ozpWebtop.dashboardView.grid',
  'ozpWebtop.dashboardView.grid.gridsterFrame',
  'ozpWebtop.userSettings',
  'ozpWebtop.addApplicationsModal',
  'ui.router',
  'ui.bootstrap',
  'gridster',
  'ozpIwcClient',
  'ozpClassification'
])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('grid', {
      url: '/grid/{dashboardId}',
      templateUrl: 'dashboardView/grid/grid.tpl.html',
      controller: 'GridCtrl'
    })
    .state('desktop', {
      url: '/desktop/{dashboardId}',
      templateUrl: 'dashboardView/desktop/desktop.tpl.html',
      controller: 'DesktopCtrl'
    })
    .state('launchApp', {
      url: '/launch/{appId}',
      controller: 'AppLauncherCtrl'
    });

    // TODO: will need a new default when grid ids are changed to uuids
    $urlRouterProvider.otherwise('/grid/0');
  })

.run( function run ($rootScope, dashboardApi, marketplaceApi, userSettingsApi,
                    useIwc) {

    // if using LocalStorage, generate sample data up front
    if (!useIwc) {
      // create example marketplace and dashboard resources
      marketplaceApi.createExampleMarketplace();
      //console.log('attempting to create example dashboards from app.js');
      dashboardApi.createExampleDashboards().then(function() {
        //console.log('created example dashboards from app.js');
      });
      // create example user settings
      userSettingsApi.createExampleUserSettings().then(function() {
        // created example user settings
      });
    }

});
