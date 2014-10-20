'use strict';

var app = angular.module('ozpWebtopApp.general');

/**
 * Interface for working with Local Storage
 *
 * ngtype: factory
 *
 * @class localStorageInterface
 * @constructor
 * @param $q ng $q service
 * @param LocalStorage LocalStorage service
 * @namespace general
 */
app.factory('localStorageInterface', function($q, LocalStorage) {

  var cache = new LocalStorage(localStorage, JSON);

  return {
    /**
     * Get all dashboard data
     * @method getDashboardData
     * @returns {*}
     */
    getDashboardData: function() {
      return this._getData('dashboards');
    },
    /**
     * Set all dashboard data
     * @method setDashboardData
     * @param dashboardData
     * @returns {*}
     */
    setDashboardData: function(dashboardData) {
      return this._setData('dashboards', dashboardData);
    },
    /**
     * Get all user settings
     * @method getUserSettings
     * @returns {*}
     */
    getUserSettings: function() {
      return this._getData('userSettings');
    },
    /**
     * Set all user settings
     * @method setUserSettingsData
     * @param userSettingsData
     * @returns {*}
     */
    setUserSettingsData: function(userSettingsData) {
      return this._setData('userSettings', userSettingsData);
    },
    /**
     * Get all apps (listings)
     * @method getApps
     * @returns {*}
     */
    getApps: function() {
      return this._getData('marketplace');
    },
    /**
     * Set all apps (test use only)
     * @method setApps
     * @param apps
     * @returns {*}
     */
    setApps: function(apps) {
      return this._setData('marketplace', apps);
    },
    /**
     * Get data from Local Storage
     * @method _getData
     * @param key
     * @returns {*}
     * @private
     */
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
    /**
     * Set data in Local Storage
     * @method _setData
     * @param key
     * @param value
     * @returns {*}
     * @private
     */
    _setData: function(key, value) {
      var deferred = $q.defer();
      cache.removeItem(key);
      cache.setItem(key, value);
      deferred.resolve(true);
      return deferred.promise;
    }
  };
});