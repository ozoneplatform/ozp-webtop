'use strict';

angular.module('ozpWebtopApp.directives').directive('ozpMenu', function() {
    return {
        templateUrl: 'templates/menu.html',
        restrict: 'AE',
        controller: function($scope, Config){
            Config.configure().then(function(data){
                $scope.menu = data;
            });
        },
        replace: true
    };
});