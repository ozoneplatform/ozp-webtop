'use strict';

/**
 * compareUrl compares the current location of the webtop to a specified frame URL
 *
 * @namespace services
 * @method compareUrl
 * @param {String} frameUrl the url of a frame
 * @return {Boolean} true if the url represents the same origin as the webtop, false otherwise
 */
angular.module('ozpWebtopApp.services')
    .factory('compareUrl', function ($location, parseUri) {

        var compareUrl = function (frameUrl) {
            // Return value
            var sameOrigin = false;

            var appUrl = $location.absUrl();

            // Check if the URLs are the same string (simple check)
            if (appUrl === frameUrl) {
                sameOrigin = true;
            } else {
                // Objects to use for comparison
                var app = {
                    protocol: '',
                    host: '',
                    port: ''
                };

                var frame = angular.extend({}, app);

                // Parse the URLs
                var parsedAppUrl = parseUri(appUrl);
                var parsedFrameUrl = parseUri(frameUrl);

                // Assign values to comparison objects
                angular.forEach(app, function(value, key) {
                    app[key] = parsedAppUrl[key];
                });

                angular.forEach(frame, function(value, key) {
                    frame[key] = parsedFrameUrl[key];
                });

                if ((app.protocol === frame.protocol) && (app.host === frame.host) &&
                    (app.port === frame.port)) {
                    sameOrigin = true;
                }

            }

            return sameOrigin;
        };

        return compareUrl;
    });
