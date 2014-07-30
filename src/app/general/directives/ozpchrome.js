'use strict';

angular.module('ozpWebtopApp')
.directive('ozpChrome', function () {
  return {
    templateUrl: 'general/templates/ozpchrome.tpl.html',
    restrict: 'E',
    replace: true
  };
});
