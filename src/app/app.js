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

    angular.forEach(states, function(state) { $stateProvider.state(state); });
    $urlRouterProvider.otherwise('/');
  })

.run( function run ($rootScope, $state, dashboardApi, marketplaceApi,
                    userSettingsApi, useIwc) {

    $rootScope.$state = $state;

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
