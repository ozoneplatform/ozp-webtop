'use strict';

/**
 * ozpManagedFrame includes an html document in the webtop
 *
 * @namespace directives
 * @class ozpManagedFrame
 * @constructor
 */
angular.module('ozpWebtopApp.directives')
    .directive('ozpManagedFrame', function ($location, $compile, $sce, UriParser) {

        var determineSameOrigin = function(frameUrl) {
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

                var frame = {
                    protocol: '',
                    host: '',
                    port: ''
                };

                // Parse the URLs
                var parsedAppUrl = UriParser.parse(appUrl);
                var parsedFrameUrl = UriParser.parse(frameUrl);

                console.log('parsed app object');
                console.dir(parsedAppUrl);
                console.log('parsed frame object');
                console.dir(parsedFrameUrl);

                // Assign values to comparison objects
                angular.forEach(app, function(value, key) {
                    app[key] = parsedAppUrl[key];
                });

                angular.forEach(frame, function(value, key) {
                    frame[key] = parsedFrameUrl[key];
                });

                console.log('app object');
                console.dir(app);
                console.log('frame object');
                console.dir(frame);

                var comparison = ((app.protocol === frame.protocol) && (app.host === frame.host) && (app.port === frame.port));

                console.log('Comparison is: ' + comparison);

                if (comparison) {
                    sameOrigin = true;
                }

            }

            return sameOrigin;
        };

        var getTemplate = function(sameOrigin) {
            var template = '';

            // Temporary
            // If different origin, use an iframe template
            if (!sameOrigin) {
                template = 'templates/managediframe.html';
            }
            // otherwise, use a 'frame' (div) template
            else {
                template = 'templates/managedframe.html';
            }
            return template;
        };

        return {
            templateUrl: 'templates/ozpmanagedframe.html',
            restrict: 'EA',
            scope: {
                frame: '='
            },
            link: function(scope, element, attrs) {
                var frameUrl = scope.frame.url;

                // Is the origin the same as the webtop?
                var origin = determineSameOrigin(scope.frame.url);

                console.log('Origin return value is: ' + origin);

                // Set template to use, and trust it if necessary
                var templateUrl = getTemplate(origin);

                console.log('Template URL value is: ' + templateUrl);

                scope.contentUrl = templateUrl;

            }
        };
    });
