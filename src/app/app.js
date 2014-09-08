'use strict';

/**
 * Top level module of the Webtop. When declared in an HTML file, it bootstraps the Webtop.
 *
 * @example 
 *     <body ng-app="ozpWebtopApp"> ... </body>
 *
 * @module ozpWebtopApp
 * @requires ozpWebtopApp.general
 * @requires ozpWebtopApp.apis
 * @requires ozpWebtopApp.components
 * @requires ozpWebtopApp.appToolbar
 * @requires ozpWebtopApp.dashboardToolbar
 * @requires ozpWebtopApp.dashboardView
 * @requires ozpWebtopApp.userSettings
 * @requires ui.router
 * @requires ui.bootstrap
 * @requires gridster
 * @requires ozpClassification
 */
angular.module( 'ozpWebtopApp', [
  'templates-app',
  'templates-common',
  'ozpWebtopApp.general',
  'ozpWebtopApp.apis',
  'ozpWebtopApp.components',
  'ozpWebtopApp.dashboardToolbar',
  'ozpWebtopApp.appToolbar',
  'ozpWebtopApp.dashboardView',
  'ozpWebtopApp.userSettings',
  'ui.router',
  'ui.bootstrap',
  'gridster',
  'ozpClassification'
])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('grid', {
      url: '/grid/{dashboardId}',
      templateUrl: 'dashboardView/grid/grid.tpl.html',
      controller: 'GridController'
    })
    .state('desktop', {
      url: '/desktop/{dashboardId}',
      templateUrl: 'dashboardView/desktop/desktop.tpl.html',
      controller: 'DesktopController'
    });

    $urlRouterProvider.otherwise('/grid/0');
  })

.run( function run (dashboardApi, marketplaceApi, userSettingsApi) {
    // create example marketplace and dashboard resources
    marketplaceApi.createExampleMarketplace();
    dashboardApi.createExampleDashboards();
    // create example user settings
    userSettingsApi.createExampleUserSettings();
});

/**
 * General utilities for use in Webtop. Includes some services and other fairly generic 
 * capabilities.
 *
 * @module ozpWebtopApp.general
 */
angular.module('ozpWebtopApp.general', []);

/**
 * The modal encompassing user settings functionality.
 *
 * @module ozpWebtopApp.userSettings
 * @requires ozpWebtopApp.apis
 */
angular.module('ozpWebtopApp.userSettings', ['ozpWebtopApp.apis']);

/**
 * APIs retrieve and send data to places external to the Webtop.
 *
 * @module ozpWebtopApp.apis
 * @requires ozpWebtopApp.general
 */
angular.module('ozpWebtopApp.apis', ['ozpWebtopApp.general']);

/**
 * Reusable components for the Webtop.
 *
 * @module ozpWebtopApp.components
 */
angular.module('ozpWebtopApp.components', []);

/**
 * The dashboard toolbar component shown in the Webtop.
 *
 * @module ozpWebtopApp.dashboardToolbar
 * @requires ozpWebtopApp.apis
 */
angular.module('ozpWebtopApp.dashboardToolbar', ['ozpWebtopApp.apis']);

/**
 * The application toolbar in the Webtop.
 *
 * @module ozpWebtopApp.appToolbar
 * @requires ui.router
 * @requires ozpWebtopApp.apis
 */
angular.module('ozpWebtopApp.appToolbar', ['ui.router', 'ozpWebtopApp.apis']);

/**
 * The dashboard view in the Webtop. Contains the area where a user uses their applications/widgets.
 *
 * @module ozpWebtopApp.dashboardView
 * @requires ozpWebtopApp.apis
 */
angular.module('ozpWebtopApp.dashboardView', ['ozpWebtopApp.apis']);

