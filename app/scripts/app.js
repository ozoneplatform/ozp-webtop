'use strict';

/**
 * Angular module for the OZP Webtop application
 *
 * @module ozpWebtopApp
 */
angular.module('ozpWebtopApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ozpWebtopApp.controllers',
    'ozpWebtopApp.directives',
    'ozpWebtopApp.services',
    'ozpWebtopApp.filters',
    'gridster'
]);

// App routing configurations
angular.module('ozpWebtopApp').config(function ($routeProvider) {
    $routeProvider.when('/grid', {
        templateUrl: 'views/grid.html',
        controller: 'GridController'
    }).when('/desktop', {
        templateUrl: 'views/desktop.html',
        controller: 'DesktopController'
    }).otherwise({
        redirectTo: '/grid'
    });
});

/**
 * Controllers for the Webtop
 *
 * @module ozpWebtopApp
 * @submodule controllers
 */
angular.module('ozpWebtopApp.controllers', []);

/**
 * Services for the Webtop
 *
 * @module ozpWebtopApp
 * @submodule services
 */
angular.module('ozpWebtopApp.services', []);

/**
 * Directives for the Webtop
 *
 * @module ozpWebtopApp
 * @submodule directives
 */
angular.module('ozpWebtopApp.directives', []);

/**
 * Filters for the Webtop
 *
 * @module ozpWebtopApp
 * @submodule filters
 */
angular.module('ozpWebtopApp.filters', []);
