'use strict';

angular.module( 'StickyStateDemo', [
  'ui.router',
  'ct.ui.router.extras',
  'StickyStateDemo.controllers'
])

.config(function($stateProvider, $stickyStateProvider, $urlRouterProvider) {

    var states = [];
    $stickyStateProvider.enableDebug(false);

    states.push({name: 'contentview', url: '/',
      views: {
        '@': {controller: 'ContentViewCtrl', templateUrl: 'contentView.tpl.html'}
    }});

    states.push({name: 'contentview.small-nonstick', url: 'small/nonstick/:viewId',
      views: {
        'smallviewnonstick@contentview': {controller: 'SmallViewCtrl', templateUrl: 'smallView.tpl.html'}},
      deepStateRedirect: true, sticky: true
    });

    states.push({name: 'contentview.small-sticky-0', url: 'small/stick-0/:viewId',
      views: {
        'smallviewstick0@contentview': {controller: 'SmallViewCtrl', templateUrl: 'smallView.tpl.html'}},
      deepStateRedirect: true, sticky: true
    });

    states.push({name: 'contentview.small-sticky-1', url: 'small/stick-1/:viewId',
      views: {
        'smallviewstick1@contentview': {controller: 'SmallViewCtrl', templateUrl: 'smallView.tpl.html'}},
      deepStateRedirect: true, sticky: true
    });

    states.push({name: 'contentview.small-sticky-2', url: 'small/stick-2/:viewId',
      views: {
        'smallviewstick2@contentview': {controller: 'SmallViewCtrl', templateUrl: 'smallView.tpl.html'}},
      deepStateRedirect: true, sticky: true
    });


    states.push({name: 'contentview.large-nonstick', url: 'large/nonstick/:viewId',
      views: {
        'largeviewnonstick@contentview': {controller: 'LargeViewCtrl', templateUrl: 'largeView.tpl.html'}},
      deepStateRedirect: true, sticky: true
    });

    states.push({name: 'contentview.large-sticky-0', url: 'large/stick-0/:viewId',
      views: {
        'largeviewstick0@contentview': {controller: 'LargeViewCtrl', templateUrl: 'largeView.tpl.html'}},
      deepStateRedirect: true, sticky: true
    });

    states.push({name: 'contentview.large-sticky-1', url: 'large/stick-1/:viewId',
      views: {
        'largeviewstick1@contentview': {controller: 'LargeViewCtrl', templateUrl: 'largeView.tpl.html'}},
      deepStateRedirect: true, sticky: true
    });

    states.push({name: 'contentview.large-sticky-2', url: 'large/stick-2/:viewId',
      views: {
        'largeviewstick2@contentview': {controller: 'LargeViewCtrl', templateUrl: 'largeView.tpl.html'}},
      deepStateRedirect: true, sticky: true
    });

    angular.forEach(states, function(state) { $stateProvider.state(state); });
    $urlRouterProvider.otherwise('/');
  })

.run( function run ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});
