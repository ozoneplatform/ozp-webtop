'use strict';

angular.module('ozpWebtop.dashboardView',[])
  .config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setDefaults({color: '#fff'});
}]);
