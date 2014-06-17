'use strict';

/**
 *
 */
angular.module('ozpWebtopApp.controllers')
    .controller('GridController', function ($scope) {
        $scope.grid = [{
            col : 1,
            row: 1,
            sizey: 1,
            sizex: 1,
            name: "FOO"
          },{
            col : 2,
            row: 1,
            sizey: 1,
            sizex: 1,
            name: "BAR"
          },{
            col : 1,
            row: 2,
            sizey: 1,
            sizex: 1,
            name: "NG"
          },{
            col : 2,
            row: 2,
            sizey: 1,
            sizex: 1,
            name: "Desktop"
          }];
    });
