'use strict';

/**
 * Top level module of the Webtop. When declared in an HTML file, it bootstraps
 * the Webtop.
 *
 * @example 
 *     <body ng-app="ozpWebtopApp"> ... </body>
 *
 * @module ozpWebtopApp
 * @requires ozp.common
 * @requires ozpWebtopApp.constants
 * @requires ozpWebtopApp.services
 * @requires ozpWebtopApp.models
 * @requires ozpWebtopApp.appLauncher
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
  'ozp.common',
  'templates-app',
  'templates-common',
  'ozpWebtopApp.constants',
  'ozpWebtopApp.services',
  'ozpWebtopApp.models',
  'ozpWebtopApp.appLauncher',
  'ozpWebtopApp.dashboardToolbar',
  'ozpWebtopApp.appToolbar',
  'ozpWebtopApp.dashboardView',
  'ozpWebtopApp.userSettings',
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

/**
 * Constants used throughout the application
 *
 * @module ozpWebtopApp.constants
 */
angular.module('ozpWebtopApp.constants', []);

/**
 * Common services that are not specific to Webtop
 *
 * @module ozp.common
 */
angular.module('ozp.common', ['ozpWebtopApp.constants', 'ozpIwcClient']);

/**
 * General utilities for use in Webtop. Includes some services and other fairly
 * generic capabilities.
 *
 * @module ozpWebtopApp.services
 * @requires ozpWebtopApp.constants
 * @requires ozp.common
 */
angular.module('ozpWebtopApp.services', ['ozpWebtopApp.constants',
  'ozp.common']);

/**
 * Models and APIs to retrieve and send data to places external to the Webtop.
 *
 * @module ozpWebtopApp.models
 * @requires ozpWebtopApp.services
 */
angular.module('ozpWebtopApp.models', ['ozpWebtopApp.services']);

/**
 * The modal encompassing user settings functionality.
 *
 * @module ozpWebtopApp.userSettings
 * @requires ozpWebtopApp.models
 */
angular.module('ozpWebtopApp.userSettings', ['ozpWebtopApp.models']);

/**
 * Launches apps from other sources
 *
 * @module ozpWebtopApp.appLauncher
 * @requires ui.router
 * @requires ozpWebtopApp.models
 */
angular.module('ozpWebtopApp.appLauncher', ['ui.router', 'ozpWebtopApp.models']);

/**
 * The dashboard toolbar component shown in the Webtop.
 *
 * @module ozpWebtopApp.dashboardToolbar
 * @requires ozp.common
 * @requires ozpWebtopApp.models
 */
angular.module('ozpWebtopApp.dashboardToolbar', ['ozpWebtopApp.models']);

/**
 * The application toolbar in the Webtop.
 *
 * @module ozpWebtopApp.appToolbar
 * @requires ui.router
 * @requires ui.bootstrap
 * @requires ozp.common
 * @requires ozpWebtopApp.models
 */
angular.module('ozpWebtopApp.appToolbar', ['ui.router', 'ui.bootstrap',
  'ozpWebtopApp.models']);

/**
 * The dashboard view in the Webtop. Contains the area where a user uses their
 * applications/widgets.
 *
 * @module ozpWebtopApp.dashboardView
 * @requires ozp.common
 * @requires ozpWebtopApp.models
 */
angular.module('ozpWebtopApp.dashboardView', ['ozpWebtopApp.models']);
