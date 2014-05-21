'use strict';

/**
 * ozpManagedFrame includes an html document in the webtop
 *
 * @namespace directives
 * @class ozpManagedFrame
 * @constructor
 */
angular.module('ozpWebtopApp.directives')
    .directive('ozpManagedFrame', function ($location, $compile, UrlParser) {

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
                var parsedAppUrl = UrlParser.parse(appUrl);
                var parsedFrameUrl = UrlParser.parse(frameUrl);

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
                if ((app.protocol === frame.protocol) && (app.host === frame.host) &&
                    (app.port === frame.port)) {
                    sameOrigin = true;
                }

            }

            return sameOrigin;
        };

        var getTemplate = function(sameOrigin) {
            var template = '';

            // Temporary
            if (sameOrigin) {
                template = '<h3>SAME origin</h3>';
            } else {
                template = '<h3>DIFFERENT origin</h3>';
            }
            return template;
        }

        return {
            // Temporary inline template
            // template: '<iframe src="{{frame.url}}"></iframe>',
            restrict: 'EA',
            scope: true,
            link: function(scope, element, attrs) {
                var origin = determineSameOrigin(scope.frame.url);
                // If a different origin, use
                var display = getTemplate(origin);

                element.html(display).show();

                $compile(element.contents())(scope);
            }
        };
    });
