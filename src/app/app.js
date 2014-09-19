'use strict';

/**
 * Top level module of the Webtop. When declared in an HTML file, it bootstraps
 * the Webtop.
 *
 * @example 
 *     <body ng-app="ozpWebtopApp"> ... </body>
 *
 * @module ozpWebtopApp
 * @requires ozpWebtopApp.constants
 * @requires ozpWebtopApp.general
 * @requires ozpWebtopApp.ozpIwcClient
 * @requires ozpWebtopApp.apis
 * @requires ozpWebtopApp.components
 * @requires ozpWebtopApp.appToolbar
 * @requires ozpWebtopApp.dashboardToolbar
 * @requires ozpWebtopApp.dashboardView
 * @requires ozpWebtopApp.userSettings
 * @requires ui.router
 * @requires ui.bootstrap
 * @requires gridster
 * @requires ozpIwcAngular
 * @requires ozpClassification
 */
angular.module( 'ozpWebtopApp', [
  'templates-app',
  'templates-common',
  'ozpWebtopApp.constants',
  'ozpWebtopApp.general',
  'ozpWebtopApp.ozpIwcClient',
  'ozpWebtopApp.apis',
  'ozpWebtopApp.components',
  'ozpWebtopApp.dashboardToolbar',
  'ozpWebtopApp.appToolbar',
  'ozpWebtopApp.dashboardView',
  'ozpWebtopApp.userSettings',
  'ui.router',
  'ui.bootstrap',
  'gridster',
  'ozpIwcAngular',
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
 * Provides an OZP IWC client using a Promises to indicate valid connection
 *
 * @module ozpWebtopApp.ozpIwcClient
 * @requires ozpIwcAngular
 * @requires ozpWebtopApp.constants
 */
angular.module('ozpWebtopApp.ozpIwcClient', ['ozpIwcAngular',
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
 */
angular.module('ozpWebtopApp.apis', ['ozpIwcAngular',
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
angular.module('ozpWebtopApp.dashboardView', ['ozpIwcAngular', 'ozpWebtopApp.apis']);


// TODO: cleanup and document these messages used throughout the application
/*
  Messages defined throughout the application:

   dashboardChange:

   dashboard-change:

   userSettings-change:

   userSettingsChanged:

   launchSettingsModal:

   gridSizeChanged:
 */