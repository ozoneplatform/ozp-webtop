'use strict';

var app = angular.module('ozpWebtopApp.apis');

app.factory('iwcInterface', function($q, iwcConnectedClient) {

  return {
    sayHello: function() {
      var deferred = $q.defer();
      if (true) {
        deferred.resolve('hello, world');
      } else {
        deferred.reject('goodbye cruel world');
      }
      return deferred.promise;
    },
    getDashboardData: function () {
      return this._getData('data.api', '/dashboard-data');
    },
    setDashboardData: function (dashboardData) {
      return this._setData('data.api', '/dashboard-data',
        {entity: dashboardData, contentType: 'application/dashboard-data+json'});
    },
    getUserSettings: function() {
      return this._getData('data.api', '/user-settings');
    },
    setUserSettingsData: function(userSettingsData) {
      return this._setData('data.api',
        {entity: userSettingsData, contentType: 'application/user-settings+json'});
    },
    getApps: function() {
      return this._getData('data.api', '/marketplace');
    },
    setApps: function(apps) {
      return this._setData('data.api',
        {entity: apps, contentType: 'application/marketplace+json'});
    },
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