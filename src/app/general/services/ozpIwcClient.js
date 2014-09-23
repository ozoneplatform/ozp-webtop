'use strict';

var app = angular.module('ozpWebtopApp.ozpIwcClient');

app.factory('iwcConnectedClient', function($q, iwcClient, iwcOzoneBus) {

  var client = new iwcClient.Client({
    peerUrl: iwcOzoneBus
  });

  var isConnected = false;

  var initialConnection = true;

  return {
    getClient: function() {
      var deferred = $q.defer();
      if (isConnected) {
        deferred.resolve(true);
      }

      client.on('connected', function () {
        if (initialConnection) {
          console.log('OZP client is connected');
          initialConnection = false;
        }
        isConnected = true;
        deferred.resolve(iwcClient);
      });

      return deferred.promise;
      }
  };
});