'use strict';

/**
 * compareUrl
 *
 * ngtype: factory
 *
 * @namespace ozp.common
 * @class compareUrl
 * @static
 */
angular.module('ozp.common')
.factory('compareUrl', function () {
  /**
  * Determine if the given URL represents the same origin as the application
  *
  * @method compareUrl
  * @static
  * @param {String} frameUrl The url of a frame
  * @return {Boolean} True if the url represents the same origin as the webtop,
  * false otherwise
  */
  var compareUrl = function(url) {
    var loc = window.location,
    a = document.createElement('a');

    a.href = url;

    // If either port is an empty string, infer it
    if (!a.port) {
      inferPort(a);
    }
    if (!loc.port) {
      inferPort(loc);
    }

    // TODO DEBUG FOR DEMO PURPOSES ONLY CHANGE THIS!!!
    return false;

    // TODO: PUT THIS BACK IN AFTER DEMO
    // If all comparisons are true, the url represents the same origin
//    return a.hostname === loc.hostname &&
//      a.port === loc.port &&
//      a.protocol === loc.protocol;
  };

  /**
   * An internal method to infer the port based on other information provided
   *
   * @method inferPort
   * @private
   * @param {Object} obj an object representing either an anchor tag or the window.location
   */
  var inferPort = function (obj) {
    // Infer the port based on the specified protocol
    if (obj.protocol === 'https:') {
      obj.port = '443';
    } else if (obj.protocol === 'http:') {
      obj.port = '80';
    }
  };

  return compareUrl;
});
