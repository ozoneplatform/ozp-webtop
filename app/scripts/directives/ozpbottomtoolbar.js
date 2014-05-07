'use strict';

/**
 * Directive for the bottom toolbar on the webtop. Contains the Ozone menu.
 *
 * @class ozpBottomToolbar
 * @constructor
 */
angular.module('ozpWebtopApp.directives').directive('ozpBottomToolbar', function() {
    return {
        templateUrl: 'templates/ozpbottomtoolbar.html',
        restrict: 'AE',
        controller: function($scope, Config){
            Config.configure().then(function(data){
                $scope.menu = data;
            });
        }
    };
});