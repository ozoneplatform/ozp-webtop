'use strict';

/**
 * Service to handle loading JSON configuration data.
 *
 * @namespace services
 * @class WorkspaceState
 * @constructor
 */
angular.module('ozpWebtopApp.services').factory('WorkspaceState', function($http, myWorkspace) {
    var promise = {};

    /**
     * Retrieve workspace state configuration data.
     * @method getStateFile
     * @param {String} file the JSON file to retrieve
     */
    var getStateFile = function(file) {
        // Only retrieve configuration once
        if (!promise[file]) {
            // Get the JSON data.
            promise[file] = $http.get('config/' + myWorkspace + '/' + file + '.json', { cache: true })
            .then(function(response) {
                // Request suceeded, set our variable
                return response.data;
            });
        }
        return promise[file];
    };

    // Return service object to Angular (Public API)
    return {
        getStateFile: getStateFile
    };
});
