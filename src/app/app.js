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
 * @requires ozpWebtopApp.general
 * @requires ozpWebtopApp.ozpIwcClient
 * @requires ozpWebtopApp.apis
 * @requires ozpWebtopApp.appLauncher
 * @requires ozpWebtopApp.components
 * @requires ozpWebtopApp.appToolbar
 * @requires ozpWebtopApp.dashboardToolbar
 * @requires ozpWebtopApp.dashboardView
 * @requires ozpWebtopApp.userSettings
 * @requires ui.router
 * @requires ui.bootstrap
 * @requires gridster
 * @requires ozpIwcClient
 * @requires ozpClassification
 */
angular.module( 'ozpWebtopApp', [
  'ozp.common',
  'templates-app',
  'templates-common',
  'ozpWebtopApp.constants',
  'ozpWebtopApp.general',
  'ozpWebtopApp.ozpIwcClient',
  'ozpWebtopApp.apis',
  'ozpWebtopApp.appLauncher',
  'ozpWebtopApp.components',
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
angular.module('ozp.common', ['ozpWebtopApp.constants']);

/**
 * Provides an OZP IWC client using a Promises to indicate valid connection
 *
 * @module ozpWebtopApp.ozpIwcClient
 * @requires ozpIwcClient
 * @requires ozpWebtopApp.constants
 */
angular.module('ozpWebtopApp.ozpIwcClient', ['ozpIwcClient',
  'ozpWebtopApp.constants']);

/**
 * General utilities for use in Webtop. Includes some services and other fairly
 * generic capabilities.
 *
 * @module ozpWebtopApp.general
 * @requires ozpWebtopApp.constants
 */
angular.module('ozpWebtopApp.general', ['ozpWebtopApp.constants']);

/**
 * APIs retrieve and send data to places external to the Webtop.
 *
 * @module ozpWebtopApp.apis
 * @requires ozpWebtopApp.general
 * @requires ozpWebtopApp.ozpIwcClient
 * @requires ozpIwcClient
 */
angular.module('ozpWebtopApp.apis', ['ozpIwcClient',
  'ozpWebtopApp.ozpIwcClient', 'ozpWebtopApp.general']);

/**
 * The modal encompassing user settings functionality.
 *
 * @module ozpWebtopApp.userSettings
 * @requires ozpWebtopApp.apis
 */
angular.module('ozpWebtopApp.userSettings', ['ozpWebtopApp.apis']);

/**
 * Reusable components for the Webtop.
 *
 * @module ozpWebtopApp.components
 */
angular.module('ozpWebtopApp.components', []);

/**
 * Launches apps from other sources
 *
 * @module ozpWebtopApp.appLauncher
 * @requires ui.router
 * @requires ozpWebtopApp.apis
 */
angular.module('ozpWebtopApp.appLauncher', ['ui.router', 'ozpWebtopApp.apis']);

/**
 * The dashboard toolbar component shown in the Webtop.
 *
 * @module ozpWebtopApp.dashboardToolbar
 * @requires ozp.common
 * @requires ozpWebtopApp.apis
 */
angular.module('ozpWebtopApp.dashboardToolbar', ['ozp.common', 'ozpWebtopApp.apis']);

/**
 * The application toolbar in the Webtop.
 *
 * @module ozpWebtopApp.appToolbar
 * @requires ui.router
 * @requires ui.bootstrap
 * @requires ozp.common
 * @requires ozpWebtopApp.apis
 */
angular.module('ozpWebtopApp.appToolbar', ['ui.router', 'ui.bootstrap', 'ozp.common', 'ozpWebtopApp.apis']);

/**
 * The dashboard view in the Webtop. Contains the area where a user uses their applications/widgets.
 *
 * @module ozpWebtopApp.dashboardView
 * @requires ozp.common
 * @requires ozpIwcClient
 * @requires ozpWebtopApp.apis
 */
angular.module('ozpWebtopApp.dashboardView', ['ozp.common', 'ozpIwcClient', 'ozpWebtopApp.apis']);
