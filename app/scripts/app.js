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

// Configure $httpProvider to enable CORS
angular.module('ozpWebtopApp').config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
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
