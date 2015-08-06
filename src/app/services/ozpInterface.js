'use strict';

/**
 * Interface for working with the ozp-rest API
 *
 * @module ozpWebtop.services.ozpInterface
 */
angular.module('ozpWebtop.services.ozpInterface', []);

var app = angular.module('ozpWebtop.services.ozpInterface',[
    'ozpWebtop.services.iwcInterface',
    'ozpWebtop.services.restInterface']);

/**
 * Interface for working with ozp-rest will return IWC interface if useIwc constant is true.
 * Otherwise will return the rest interface
 *
 * ngtype: factory
 *
 * @class ozpInterface
 * @constructor
 * @param iwcInterface IWC ozp-rest interface
 * @param restInterface REST ozp-rest interface
 * @param useIwc webtop constant
 * @namespace services
 */
app.factory('ozpInterface', function(iwcInterface, restInterface, useIwc) {
    var intrface =  (useIwc) ? iwcInterface : restInterface;

    //TODO remove force to rest functionality once implemented on IWC
    intrface.getUserListings = restInterface.getUserListings;
    intrface.getNotifications = restInterface.getNotifications;

    return intrface;
});