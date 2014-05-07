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
    'ozpWebtopApp.directives'
]);

// App routing configurations
ozpWebtopApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    }).otherwise({
        redirectTo: '/'
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
 * Directives for the Webtop
 *
 * @module ozpWebtopApp
 * @submodule directives
 */
angular.module('ozpWebtopApp.directives', []);