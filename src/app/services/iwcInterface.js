'use strict';

/**
 * Interface for working with IWC
 *
 * @module ozpWebtop.services.iwcInterface
 * @requires ozp.common.iwc.client
 */
angular.module('ozpWebtop.services.iwcInterface', [
  'ozp.common.iwc.client']);

var app = angular.module('ozpWebtop.services.iwcInterface');

/**
 * Interface for working with IWC
 *
 * ngtype: factory
 *
 * @class iwcInterface
 * @constructor
 * @param $q ng $q service
 * @param iwcConnectedClient IWC client service
 * @namespace services
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
      // persist data
      dashboardData.persist = true;
      return this._setData('data.api', '/dashboard-data',
        {entity: dashboardData,
          contentType: 'application/dashboard-data+json'});
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
      // persist data
      userSettingsData.persist = true;
      return this._setData('data.api',
        {entity: userSettingsData, contentType: 'application/user-settings+json'});
    },
    _appendApplicationData: function(appResource, appListings) {
      return this._getData('system.api', appResource).then(function(appData) {
        appListings.push(appData);
      });
    },

    /**
     * Get all apps (listings) in marketplace
     * @method getApps
     * @returns {*}
     */
    getApps: function() {
      var that = this;
      var appListings = [];
      return this._getData('system.api', '/application').then(function(myApps) {
        return myApps.reduce(function (previous, current) {
          return previous.then(function () {
            var promise = that._appendApplicationData(current, appListings);
            return promise;
          }).catch(function (error) {
            console.log('should not have happened: ' + error);
          });
        }, Promise.resolve()).then(function () {
          // all application data obtained
          // console.log('app listings: ' + appListings);
          return {'apps': appListings};
        });
      });
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
      console.log('iwcClient.api(' + dst + ').get(' + resource + ')');
      return iwcConnectedClient.getClient().then(function(client) {
        return client.api(dst)
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
      console.log('iwcClient.api(' + dst + ').set(' + resource + ')');
      return iwcConnectedClient.getClient().then(function(client) {
        return client.api(dst)
          .set(resource, setData)
          .then(function (response) {
            if (response.response === 'ok') {
              return true;
            } else {
              console.log('ERROR: setting data for ' + resource + ' in ' + dst);
              console.log(response);
              return false;
            }
          });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    }
  };
});