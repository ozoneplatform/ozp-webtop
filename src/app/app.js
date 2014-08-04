'use strict';

angular.module( 'ozpWebtopApp', [
  'templates-app',
  'templates-common',
  'ozpWebtopApp.general',
  'ozpWebtopApp.components',
  'ozpwebtop.dashboardToolbar',
  'ozpwebtop.appToolbar',
  'ozpWebtopApp.dashboardView',
  'ui.router',
  'ui.bootstrap',
  'gridster',
  'ozpClassification'
])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('grid', {
      url: '/grid',
      templateUrl: 'dashboardView/grid/grid.tpl.html',
      controller: 'GridController'
    })
    .state('desktop', {
      url: '/desktop',
      templateUrl: 'dashboardView/desktop/desktop.tpl.html',
      controller: 'DesktopController'
    });

    $urlRouterProvider.otherwise('/grid');
  })

// App routing configurations
//.config(function ($routeProvider) {
//  $routeProvider.when('/grid', {
//    templateUrl: 'dashboardView/grid/grid.tpl.html',
//    controller: 'GridController'
//  }).when('/desktop', {
//    templateUrl: 'dashboardView/desktop/desktop.tpl.html',
//    controller: 'DesktopController'
//  }).otherwise({
//    redirectTo: '/grid'
//  });
//})

//.config( function myAppConfig ( $routeProvider ) {
//  $routeProvider.when('/grid', {
//    templateUrl: 'dashboardView/grid/grid.tpl.html',
//    controller: 'GridController'
//  }).when('/desktop', {
//    templateUrl: 'dashboardView/grid/desktop.tpl.html',
//    controller: 'DesktopController'
//  }).otherwise({
//    redirectTo: '/grid'
//  });
//})

.run( function run () {
})
.controller( 'AppCtrl', function AppCtrl ( $scope ) {
  $scope.$on('$stateChangeSuccess', function(event, toState){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | filtrfy' ;
    }
  });
});


angular.module('ozpWebtopApp.general', []);
angular.module('ozpWebtopApp.components', []);
angular.module('ozpWebtopApp.dashboardToolbar', []);
angular.module('ozpWebtopApp.appToolbar', []);
angular.module('ozpWebtopApp.dashboardView', []);

