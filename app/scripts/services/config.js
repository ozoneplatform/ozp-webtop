'use strict';

/**
 * Service to handle loading JSON configuration data.
 *
 * @class Config
 * @constructor
 */
angular.module('ozpWebtopApp.services').service('Config', function($http) {
    var promise;

    /**
     * Retrieve configuration data.
     * @method configure
     */
    var configure = function() {
        // Only retrieve configuration once
        if (!promise) {
            // Get the JSON data.
            promise = $http.get('config/menu.json', { cache: true }).then(function(response) {
                // Request suceeded, set our variable
                return response.data;
            });
        }
        return promise;
    };

    // Return service object to Angular
    return {
        configure: configure
    };
});