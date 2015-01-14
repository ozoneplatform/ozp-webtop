'use strict';

/**
 * IWC client
 *
 * @module ozp.common.iwc.client
 * @requires ozpIwcClient
 * @requires ozpWebtop.constants
 */
angular.module('ozp.common.iwc.client', ['ozpIwcClient',
  'ozpWebtop.constants']);

var app = angular.module('ozp.common.iwc.client');

/**
 * Provides a single connected IWC client
 *
 * @class iwcConnectedClient
 * @constructor
 * @param $q ng $q service
 * @param iwcClient iwcClient service from ozp-iwc-angular library
 * @param defaultIwcOzoneBus OZONE bus to connect to
 * @namespace ozp.common.iwc
 */
app.factory('iwcConnectedClient', function($q, $location, iwcClient, defaultIwcOzoneBus) {

  var ozpIwcPeerUrl = '';
  var queryParams = $location.search();
  if (queryParams.hasOwnProperty('ozpIwc.peer')) {
    ozpIwcPeerUrl = queryParams['ozpIwc.peer'];
  } else {
    ozpIwcPeerUrl = defaultIwcOzoneBus;
  }

  console.log('creating iwc client using bus: ' + ozpIwcPeerUrl);
  var client = new iwcClient.Client({
    peerUrl: ozpIwcPeerUrl
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
          console.log('OZP client is connected to bus: ' + client.peerUrl);
          initialConnection = false;
        }
        isConnected = true;
        deferred.resolve(client);
      });

      return deferred.promise;
      }
  };
});