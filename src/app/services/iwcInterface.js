'use strict';

var app = angular.module('ozpWebtopApp.general');

/**
 * Interface for working with IWC
 *
 * ngtype: factory
 *
 * @class iwcInterface
 * @constructor
 * @param $q ng $q service
 * @param iwcConnectedClient IWC client service
 * @namespace general
 */
app.factory('iwcInterface', function($q, iwcConnectedClient) {

  return {
    /**
     * Test method
     * @method sayHello
     * @returns {*}
     */
    sayHello: function() {
      var deferred = $q.defer();
      if (true) {
        deferred.resolve('hello, world');
      } else {
        deferred.reject('goodbye cruel world');
      }
      return deferred.promise;
    },
    /**
     * Get all dashboard data
     * @method getDashboardData
     * @returns {*}
     */
    getDashboardData: function () {
      return this._getData('data.api', '/dashboard-data');
    },
    /**
     * Set all dashboard data
     * @method setDashboardData
     * @param dashboardData
     * @returns {*}
     */
    setDashboardData: function (dashboardData) {
      return this._setData('data.api', '/dashboard-data',
        {entity: dashboardData, contentType: 'application/dashboard-data+json'});
    },
    /**
     * Get all user settings
     * @method getUserSettings
     * @returns {*}
     */
    getUserSettings: function() {
      return this._getData('data.api', '/user-settings');
    },
    /**
     * Set all user settings
     * @method setUserSettingsData
     * @param userSettingsData
     * @returns {*}
     */
    setUserSettingsData: function(userSettingsData) {
      return this._setData('data.api',
        {entity: userSettingsData, contentType: 'application/user-settings+json'});
    },
    /**
     * Get all apps (listings) in marketplace
     * @method getApps
     * @returns {*}
     */
    getApps: function() {
      return this._getData('data.api', '/marketplace');
    },
    /**
     * Set all apps (listings) in marketplace (test use only)
     * @method setApps
     * @param apps
     * @returns {*}
     */
    setApps: function(apps) {
      return this._setData('data.api',
        {entity: apps, contentType: 'application/marketplace+json'});
    },
    /**
     * Get resource from IWC bus
     * @param dst IWC destination like data.api
     * @param resource IWC resource to get
     * @returns {*}
     * @private
     */
    _getData: function(dst, resource) {
      return iwcConnectedClient.getClient().then(function(client) {
        client.api(dst)
          .get(resource)
          .then(function (reply) {
            return reply.entity;
          });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Set resource on IWC bus
     * @param dst IWC destination like data.api
     * @param resource IWC resource to set
     * @param setData Value of resource
     * @returns {*}
     * @private
     */
    _setData: function(dst, resource, setData) {
      return iwcConnectedClient.getClient().then(function(client) {
        client.api('dst')
          .set(resource, setData)
          .then(function (response) {
            if (response) {
              return true;
            } else {
              return false;
            }
          });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    }
  };
});