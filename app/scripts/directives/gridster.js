'use strict';

/**
 * ozpGridster is a wrapper around a 'ul' element used to manage the grid layout.
 *
 * @namespace directives
 * @class ozpGridster
 * @constructor
 */
angular.module('ozpWebtopApp.directives')

    .directive('ozpGridster', function ($timeout) {

        /* jshint camelcase: false */

        var gridsterConfig = {
            widget_margins: [5, 5],
            widget_base_dimensions: [200, 200],
            widget_selector: 'li',
            min_cols: 5,
            draggable: {
                handle: 'div.ozp-chrome'
            }
        };

        /* jshint camelcase: true */

        return {

            restrict: 'AE',

            scope: {
                ngModel: '=',
                options: '=',
                updated: '&'
            },

            require: '^ngModel',

            templateUrl: 'templates/gridster.html',

            link: function (scope, element, attributes) {

                var options = angular.extend(gridsterConfig,
                    scope.$eval(attributes.gridsterOptions));

                var gridster;

                $timeout(function () {

                    var el = element.find('ul')
                        .gridster(options);
                    gridster = el.data('gridster');

                    // When a drag stops...
                    gridster.options.draggable.stop = function () {
                        // Update the model
                        angular.forEach(el.find('li'), function (item, index) {
                            var li = angular.element(item);
                            if (li.attr('class') === 'preview-holder') {
                                return;
                            }
                            var frame = scope.ngModel[index];
                            frame.row = li.attr('data-row');
                            frame.col = li.attr('data-col');
                        });
                        scope.$apply();
                    };

                });

            }

            // TODO: Create controller API
            // controller: function ($scope, $element, $attrs) {}
        };

    })

    /**
     * gridsterItem is a wrapper around a tile in the grid
     *
     * @namespace directives
     * @class gridsterItem
     * @constructor
     */
    .directive('gridsterItem', function ($compile, $http, compareUrl) {

        var getTemplate = function (sameOrigin) {
            var template = '';

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

            replace: true,

            restrict: 'AE',

            // TODO: use controller for inter-directive communication
            // require: '^ozpGridster',

            scope: {
                frame: '='
            },

            link: function (scope, element) {

                // Is the origin the same as the webtop?
                var origin = compareUrl(scope.frame.url);

                // Instead of templateUrl, use $http to load one of two templates
                $http.get(getTemplate(origin)).then(function(response) {
                    element.html($compile(response.data)(scope));

                    // Add the managed frame class to take advantage of the styles
                    element.addClass('ozp-managed-frame');
                });

                // TODO: make these dynamic
                scope.styles = {
                    'height': 181,
                    'width': 150
                };

            }

        };

    });

