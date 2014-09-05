'use strict';

var app = angular.module('ozpWebtopApp.apis');

app.factory('dashboardIwcInterface', function($q, ozpIwcClient) {

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
      return ozpIwcClient.getClient().then(function(client) {
        console.log('getting IWC dashboards');
        client.api('data.api')
          .get('/dashboard-data')
          .then(function (reply) {
            var dashboards = reply.entity;
            console.log('dashboards from IWC: ' + JSON.stringify(dashboards));
            return dashboards;
          });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });

    },
    _setDashboardData: function (dashboardData) {
      return ozpIwcClient.getClient().then(function(client) {
        console.log('setting IWC dashboards');
        client.api('data.api')
          .set('/dashboard-data', {entity: dashboardData, contentType: 'application/dashboard-data+json'})
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