'use strict';

angular.module('ozpWebtopApp.components')
.directive('ozpChrome', function () {
  return {
    templateUrl: 'components/chrome/ozpchrome.tpl.html',
    restrict: 'E',
    replace: true,
    controller: 'ChromeCtrl'
  };
});
