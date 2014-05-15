'use strict';

angular.module('ozpWebtopApp.controllers').controller('MainCtrl', function ($scope, Config) {
    Config.configure('workspace1').then(function(data){
        $scope.toolbars = data.toolbars;
    });
});
