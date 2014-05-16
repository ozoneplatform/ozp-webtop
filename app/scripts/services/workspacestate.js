'use strict';

/**
 * Service to handle loading JSON configuration data.
 *
 * @class WorkspaceState
 * @constructor
 */
angular.module('ozpWebtopApp.services').service('WorkspaceState', function($http) {
    var promise, state;

    /**
     * Retrieve workspace state configuration data.
     * @method getState
     * @param {String} workspace the JSON file to retrieve
     */
    var getState = function(workspace) {
        // Only retrieve configuration once
        if (!promise) {
            // Get the JSON data.
            promise = $http.get('config/' + workspace + '.json', { cache: true }).then(function(response) {
                // Request suceeded, set our variable
                return response.data;
            });
        }
        return promise;
    };

    // Retrieve the state upon instantiation of this service
    (function(){
        getState('workspace1').then(function(data) {
            state = data;
        });
    }());

    var getTopToolbarState = function() {
        return findToolbar('top');
    };

    var getBottomToolbarState = function() {
        return findToolbar('bottom');
    };

    var getFramesState = function() {
        return state.frames;
    };

    var findToolbar = function(location) {
        var toolbar = {};
        angular.forEach(state.toolbars, function(value){
            if (value.location === location){
                toolbar = value;
            }
        });
        return toolbar;
    };

    // Return service object to Angular (Public API)
    return {
        getBottomToolbarState: getBottomToolbarState,
        getTopToolbarState: getTopToolbarState,
        getFramesState: getFramesState
    };
});
