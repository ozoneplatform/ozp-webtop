'use strict';

/**
 * Directive to manage the hierarchical menu
 *
 * @class ozpMenu
 * @constructor
 */
angular.module('ozpWebtopApp.directives').directive('ozpMenu', function() {

    return {

        templateUrl: 'templates/menu.html',

        restrict: 'AE',

        replace: true,

        /**
         * Controller to handle retrieving menu data. It hands this data to the directive scope.
         * @method controller
         */
        controller: function($scope){
            $scope.menu = [{
                'name': 'Analysis',
                'url': '#'
            },{
                'name': 'Development',
                'url': '#'
            },{
                'name': 'Business',
                'url': '#'
            }];
        }

    };

});
