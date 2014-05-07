'use strict';

angular.module('ozpWebtopApp.services').service('Config', function($http) {
    var promise;

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

    return {
        configure: configure
    };
});