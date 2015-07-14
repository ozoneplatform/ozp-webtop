'use strict';

/**
 * Directive for the ozp toolbar
 *
 * ngtype: directive
 *
 * @class ozpToolbar
 * @static
 * @namespace ozpToolbar
 */
angular.module( 'ozpWebtop.ozpToolbar').directive('ozpToolbar', function(){
  return {
   restrict: 'E',
   templateUrl: 'userInterface/ozpToolbar/ozpToolbar.tpl.html',
   replace: false,
   transclude: false,
   scope: true,
   link: function(scope/*, elem, attrs*/) {

     scope.$watch('fullScreenMode', function() {
       if (scope.fullScreenMode) {
         // TODO: a cleaner way?
         $('body').css('margin', '20px 0px');
       } else {
         $('body').css('margin', '60px 0px');
         $('.navbar-fixed-top').css('top', '20px');
       }
     });
   }
  };
});
