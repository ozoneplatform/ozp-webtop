'use strict';

/**
 * Directive for the application toolbar
 *
 * ngtype: directive
 *
 * @class appToolbar
 * @static
 */
angular.module( 'ozpWebtop.appToolbar')
    .directive('appToolbar',function(){
    return {
        restrict: 'E',
        templateUrl: 'userInterface/appToolbar/appToolbar.tpl.html'
    };
});
