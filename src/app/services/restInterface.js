'use strict';

/**
 * Interface for working with the ozp-rest API
 *
 * @module ozpWebtop.services.restInterface
 */
angular.module('ozpWebtop.services.restInterface', []);

var app = angular.module('ozpWebtop.services.restInterface');

/**
 * Interface for working with ozp-rest
 *
 * ngtype: factory
 *
 * @class restInterface
 * @constructor
 * @param $window ng $window service
 * @param $log ng $log service
 * @param $http ng $http service
 * * @param $q ng $q service
 * @namespace services
 */
app.factory('restInterface', function($window, $log, $http, $q, $interval) {

  var humps = $window.humps;

  // flag to ensure multiple PUT requests are not made concurrently
  var readyToPut = true;

  // data that wasn't saved
  var webtopDataToRetrySaving = null;

  var service = {
    /**
     * Set all webtop data
     *
     * This method uses HTTP requests directly on the
     * endpoint intented for use exclusively by IWC
     *
     * If another PUT request is already processing, this method will simply
     * return. Even if the request does go through, it will return immediately
     * and ignore the response - this is by design.
     *
     * @method setWebtopData
     * @returns true if request was made, false otherwise
     */
    setWebtopData: function (webtopData) {
      if (readyToPut) {
        readyToPut = false;
        // TODO: change dashboard-data to ozp-webtop-data
        var url = $window.OzoneConfig.API_URL + '/iwc-api/self/data/dashboard-data/';
        var requestData = {'entity': webtopData};
        // requestData = humps.decamelizeKeys(requestData);
        // requestData must be valid JSON
        requestData = JSON.parse(JSON.stringify(requestData));
        var req = {
          method: 'PUT',
          url: url,
          headers: {
            //'Content-Type': 'application/vnd.ozp-iwc-data-object+json'
            'Content-Type': 'application/json'
          },
          data: requestData,
          withCredentials: true
        };

        $http(req).success(function() {
          readyToPut = true;
        }).error(function(data, status) {
          $log.error('Error from PUT at ' + url + ', status: ' + status + ', msg: ' + JSON.stringify(data));
          readyToPut = true;
        });

        webtopDataToRetrySaving = null;
        return true;
      }
      webtopDataToRetrySaving = webtopData;
      return false;
    },
    /**
     * Get all webtop data
     *
     * This method uses HTTP requests directly on the
     * endpoint intented for use exclusively by IWC
     *
     * @method getWebtopData
     * @returns {promise}
     */
    getWebtopData: function () {
      var deferred = $q.defer();
      $http.get(
        // TODO: change dashboard-data to ozp-webtop-data
        $window.OzoneConfig.API_URL + '/iwc-api/self/data/dashboard-data/', {
          withCredentials: true,
          headers: {
            //'Accept': 'application/vnd.ozp-iwc-data-object+json'
            'Accept': 'application/json'
          }
        }).success(function(data, status) {
          if (status !== 200) {
            $log.warn('WARNING: got non 200 status from iwc-api/self/data/dashboard-data/: ' + status);
          }
          deferred.resolve(data['entity']);  // jshint ignore:line
      }).error(function(data, status) {
          if (status === 404) {
          } else {
           $log.error('ERROR getting dashboard data. status: ' + JSON.stringify(status) + ', data: ' + JSON.stringify(data));
           return false;
          }
          deferred.resolve({});
      });
      return deferred.promise;
    },
    /**
     * Get all Listings (applications/widgets) that a user is able to see
     * @method getListings
     * @returns {promise} (null if not found or error)
     */
    getListings: function() {
      var deferred = $q.defer();
      $http.get($window.OzoneConfig.API_URL + '/api/self/library/', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }).success(function(data, status) {
        if (status !== 200) {
          $log.warn('WARNING: got non 200 status from api/self/library/: ' +
            status);
        }
        // data = humps.camelizeKeys(data);
        deferred.resolve(data);
      }).error(function(data, status) {
        $log.error('ERROR getting user library. status: ' + JSON.stringify(status) +
          ', data: ' + JSON.stringify(data));
        deferred.reject(data);
      });
      return deferred.promise;
    },

    /**
     * Get user Listings (applications/widgets). Listings the user specifically creates
     * @method getUserListings
     * @returns {promise} (null if not found or error)
     */
    getUserListings: function() {
      var deferred = $q.defer();
      $http.get($window.OzoneConfig.API_URL + '/api/self/listing/', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }).success(function(data, status) {
        if (status !== 200) {
          $log.warn('WARNING: got non 200 status from api/self/listing/: ' +
            status);
        }
        // data = humps.camelizeKeys(data);

        deferred.resolve(data);
      }).error(function(data, status) {
        $log.error('ERROR getting user listing. status: ' + JSON.stringify(status) +
          ', data: ' + JSON.stringify(data));
        deferred.reject(data);
      });
      return deferred.promise;
    },

     /**
       * Get user Profile
       * @method getProfile
       * @returns {promise}
       */
    getProfile: function(){
      var deferred = $q.defer();
      $http.get($window.OzoneConfig.API_URL + '/api/self/profile/', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }

      }).success(function(data, status){
        if (status !== 200) {
          $log.warn('WARNING: got non 200 status from api/self/profile/: ' + status);
        }
        data = humps.camelizeKeys(data);

        deferred.resolve(data);
      }).error(function(data, status) {
        $log.error('ERROR getting user profile. status: ' + JSON.stringify(status) +
          ', data: ' + JSON.stringify(data));
        deferred.reject(data);
      });
      return deferred.promise;
     },
    /**
     * Get all notifications for user that have not been dismissed/seen.
     * @method getNotifications
     * @returns {promise} (null if not found or error)
     */
    getNotifications: function() {
      var deferred = $q.defer();
      $http.get($window.OzoneConfig.API_URL + '/api/self/notification/', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }).success(function(data, status) {
        if (status !== 200) {
          $log.warn('WARNING: got a non 200 status from api/self/notification/ ' + status);
        }
        // data = humps.camelizeKeys(data);

        deferred.resolve(data);
      }).error(function(data, status) {
        $log.error('ERROR getting user notifications. status: ' + JSON.stringify(status) +
          ', data: ' + JSON.stringify(data));
        deferred.reject(data);
      });
      return deferred.promise;
    },
    /**
     * Dismiss/remove a single notification from the users notifications.
     * @method dismissNotification
     * @returns {promise} (null if not found or error)
     */
    dismissNotification: function(notification){
      var deferred = $q.defer();
      var dismissData = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      // dismissData = humps.camelizeKeys(dismissData);
      $http.delete($window.OzoneConfig.API_URL + '/api/self/notification/' + notification.id + '/', dismissData).success(function(data, status) {
        if (status !== 204) {
          $log.warn('WARNING: got a non 204 status from DELETE api/self/notification/<id>/ ' + status);
        }
        // data = humps.camelizeKeys(data);

        deferred.resolve(data);
      }).error(function(data, status) {
        $log.error('ERROR getting user notifications. status: ' + JSON.stringify(status) +
          ', data: ' + JSON.stringify(data));
        deferred.reject(data);
      });
      return deferred.promise;
    },
    createLibraryEntry: function(widgetId){
      var deferred = $q.defer();
      var libraryEntryJson = {
        'listing': {
          'id': String(widgetId)
        }
      };

      $http({
        method: 'POST',
        url: $window.OzoneConfig.API_URL + '/api/self/library/',
        data: JSON.stringify(libraryEntryJson),
        withCredentials: true,
        headers: {'Content-Type': 'application/json'}
      }).success(function(data) {
        deferred.resolve(data);  // jshint ignore:line
      }).error(function(data, status) {
        $log.error('ERROR getting dashboard data. status: ' + JSON.stringify(status) + ', data: ' + JSON.stringify(data));
        deferred.resolve({});
      });
      return deferred.promise;
    }
  };

  // TODO: Find a more efficient way to do this
  function retryPut() {
    if (webtopDataToRetrySaving) {
      $log.debug('Retrying PUT request');
      service.setWebtopData(webtopDataToRetrySaving);
    }
  }

  $interval(retryPut, 500);

  return service;
});
