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
 * @param $log ng $log service
 * @param iwcConnectedClient IWC client service
 * @namespace services
 */
app.factory('iwcInterface', function($q, $log, iwcConnectedClient) {

  // flag to ensure multiple IWC set requests are not made concurrently
  var readyToSet = true;

  /**
   * Get resource from IWC bus
   * @param dst IWC destination like data.api
   * @param resource IWC resource to get
   * @returns {*}
   * @private
   */
  function _getData(dst, resource) {
    $log.debug('iwcClient.api(' + dst + ').get(' + resource + ')');
    return iwcConnectedClient.getClient().then(function(client) {
      return client.api(dst)
        .get(resource)
        .then(function (reply) {
          return reply.entity;
        });
    }).catch(function(error) {
      $log.error('Error getting IWC data: ' + error);
    });
  }
  /**
   * Set resource on IWC bus
   * @param dst IWC destination like data.api
   * @param resource IWC resource to set
   * @param setData Value of resource
   * @returns {*}
   * @private
   */
  function _setData(dst, resource, setData) {
    if (readyToSet) {
      readyToSet = false;
      $log.debug('iwcClient.api(' + dst + ').set(' + resource + ')');
      iwcConnectedClient.getClient().then(function(client) {
        client.api(dst)
          .set(resource, setData)
          .then(function (response) {
            if (response.response === 'ok') {
              readyToSet = true;
            } else {
              $log.error('ERROR: setting data for ' + resource + ' in ' +
                dst + ', response: ' + response);
              readyToSet = true;
            }
          });
      }).catch(function(error) {
        $log.error('ERROR setting IWC data: ' + error);
      });
      return true;
    }
    return false;
  }

  function _appendApplicationData(appResource, appListings) {
    return _getData('system.api', appResource).then(function(appData) {
      appListings.push(appData);
    });
  }

  return {
    /**
     * Get all webtop data
     *
     * Use IWC to retrieve all webtop data from the backend
     *
     * @method getWebtopData
     * @returns {promise} (true if success, false otherwise)
     */
    getWebtopData: function () {
      // TODO: change dashboard-data to ozp-webtop-data
      return _getData('data.api', '/dashboard-data');
    },
    /**
     * Set all webtop data
     *
     * Use IWC to set all webtop data in the backend
     *
     * If another set request is already processing, this method will simply
     * return. Even if the request does go through, it will return immediately
     * and ignore the response - this is by design.
     *
     * @method setWebtopData
     * @param webtopData
     * @returns true if request was made, false otherwise
     */
    setWebtopData: function (webtopData) {
      webtopData.persist = true;
      // TODO: change dashboard-data to ozp-webtop-data
      return _setData('data.api', '/dashboard-data', {
        entity: webtopData,
        contentType: 'application/dashboard-data+json'
      });
    },
    /**
     * Get all Listings (applications/widgets) for user
     *
     * Note that this currently uses a request per application! Hopefully IWC
     * will someday support bulk GET requests so that this can be made much
     * more efficient
     *
     * @method getListings
     * @returns {promise} (null if not found or error)
     */
    getListings: function() {
      var appListings = [];
      return _getData('system.api', '/application').then(function(myApps) {
        return myApps.reduce(function (previous, current) {
          return previous.then(function () {
            var promise = _appendApplicationData(current, appListings);
            return promise;
          }).catch(function (error) {
            $log.error('Error getting Listings: ' + error);
          });
        }, Promise.resolve()).then(function () {
          // all application data obtained
          // $log.debug('app listings: ' + appListings);
          // TODO: this doesn't match the getListings interface in restInterface.js
          return {'apps': appListings};
        });
      });
    }
  };
});