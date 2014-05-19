'use strict';

/**
 * Angular module for the OZP Webtop application
 *
 * @module ozpWebtopApp
 */
var ozpWebtopApp = angular.module('ozpWebtopApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ozpWebtopApp.controllers',
    'ozpWebtopApp.directives',
    'ozpWebtopApp.services',
    'ozpWebtopApp.filters'
]);

// App routing configurations
/*
ozpWebtopApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    }).otherwise({
        redirectTo: '/'
    });
});
*/

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
