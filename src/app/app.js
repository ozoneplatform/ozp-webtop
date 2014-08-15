'use strict';

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
      url: '/grid/{currentDashboardIndex}',
      templateUrl: 'dashboardView/grid/grid.tpl.html',
      controller: 'GridController'
    })
    .state('desktop', {
      url: '/desktop/{currentDashboardIndex}',
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
})
.controller( 'AppCtrl', function AppCtrl ( $scope ) {
  $scope.$on('$stateChangeSuccess', function(event, toState){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | filtrfy' ;
    }
  });
});


angular.module('ozpWebtopApp.general', []);
angular.module('ozpWebtopApp.userSettings', []);
angular.module('ozpWebtopApp.apis', ['ozpWebtopApp.general']);
angular.module('ozpWebtopApp.components', []);
angular.module('ozpWebtopApp.dashboardToolbar', ['ozpWebtopApp.apis']);
angular.module('ozpWebtopApp.appToolbar', ['ui.router', 'ozpWebtopApp.apis']);
angular.module('ozpWebtopApp.dashboardView', ['ozpWebtopApp.apis']);

