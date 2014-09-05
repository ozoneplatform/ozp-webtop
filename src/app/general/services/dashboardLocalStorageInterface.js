'use strict';

var app = angular.module('ozpWebtopApp.apis');

app.factory('dashboardLocalStorageInterface', function($q, LocalStorage) {

  var cache = new LocalStorage(localStorage, JSON);

  return {
    getDashboardData: function() {
      var deferred = $q.defer();
      if (!cache.hasItem('dashboards')) {
        // TODO: handle error
        console.log('ERROR: No dashboards');
        deferred.reject(false);
      } else {
        deferred.resolve(cache.getItem('dashboards'));
      }
      return deferred.promise;
    },
    _setDashboardData: function(dashboardData) {
      var deferred = $q.defer();
      cache.removeItem('dashboards');
      cache.setItem('dashboards', dashboardData);
      deferred.resolve(true);
      return deferred.promise;
    }
  };
});