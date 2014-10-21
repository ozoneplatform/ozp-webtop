'use strict';

var app = angular.module('ozp.common');

/**
 * Provides a single connected IWC client
 *
 * @class iwcConnectedClient
 * @constructor
 * @param $q ng $q service
 * @param iwcClient iwcClient service from ozp-iwc-angular library
 * @param iwcOzoneBus OZONE bus to connect to
 * @namespace ozp.common
 */
app.factory('iwcConnectedClient', function($q, iwcClient, iwcOzoneBus) {

  var client = new iwcClient.Client({
    peerUrl: iwcOzoneBus
  });

  var isConnected = false;

  var initialConnection = true;

  return {
    /**
     * Get a connected OZP client
     *
     * @method getClient
     * @returns {Promise} fulfilled value is a connected OZP client
     */
    getClient: function() {
      var deferred = $q.defer();
      if (isConnected) {
        deferred.resolve(client);
      }

      client.on('connected', function () {
        if (initialConnection) {
          console.log('OZP client is connected');
          initialConnection = false;
        }
        isConnected = true;
        deferred.resolve(client);
      });

      return deferred.promise;
      }
  };
});