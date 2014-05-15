'use strict';

/**
 * Service to handle loading JSON configuration data.
 *
 * @class Config
 * @constructor
 */
angular.module('ozpWebtopApp.services').service('Config', function($http) {
    var promise = {};

    /**
     * Retrieve configuration data.
     * @method configure
     * @param {String} file the JSON file to retrieve
     */
    var configure = function(file) {
        // Only retrieve configuration once
        if (!promise[file]) {
            // Get the JSON data.
            promise[file] = $http.get('config/' + file + '.json', { cache: true }).then(function(response) {
                // Request suceeded, set our variable
                return response.data;
            });
        }
        return promise[file];
    };

    // Return service object to Angular
    return {
        configure: configure
    };
});
