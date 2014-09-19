'use strict';

var app = angular.module('ozpWebtopApp.apis');

app.factory('localStorageInterface', function($q, LocalStorage) {

  var cache = new LocalStorage(localStorage, JSON);

  return {
    getDashboardData: function() {
      return this._getData('dashboards');
    },
    setDashboardData: function(dashboardData) {
      return this._setData('dashboards', dashboardData);
    },
    getUserSettings: function() {
      return this._getData('userSettings');
    },
    setUserSettingsData: function(userSettingsData) {
      return this._setData('userSettings', userSettingsData);
    },
    getApps: function() {
      return this._getData('marketplace');
    },
    setApps: function(apps) {
      return this._setData('marketplace', apps);
    },
    _getData: function(key) {
      var deferred = $q.defer();
      if (!cache.hasItem(key)) {
        // TODO: handle error
        console.log('ERROR: No entry ' + key);
        deferred.reject(false);
      } else {
        deferred.resolve(cache.getItem(key));
      }
      return deferred.promise;
    },
    _setData: function(key, value) {
      var deferred = $q.defer();
      cache.removeItem(key);
      cache.setItem(key, value);
      deferred.resolve(true);
      return deferred.promise;
    }
  };
});