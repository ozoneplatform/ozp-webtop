'use strict';

/**
 *
 */
angular.module('ozpWebtopApp.directives')

    .directive('ozpGridster', function ($timeout, $parse) {

        var gridsterConfig = {
            widget_margins: [5, 5],
            widget_base_dimensions: [200, 200],
            widget_selector: 'li',
            min_cols: 5,
            draggable: {
                handle: 'div.ozp-chrome'
            }
        };

        return {

            restrict: 'AE',

            scope: {
                ngModel: '=',
                options: '=',
                updated: '&'
            },

            require: '^ngModel',

            templateUrl: 'templates/gridster.html',

            link: function (scope, element, attributes, controller) {

                var options = angular.extend(gridsterConfig,
                    scope.$eval(attributes.gridsterOptions));

                var gridster;
                $timeout(function() {
                    var el = element.find('ul')
                        .gridster(options);
                    gridster = el.data('gridster');
                });

                var attachModel = function (newVal, oldVal) {
                    if (!!newVal) {
                        if(newVal.length == oldVal.length) return;

                        if(newVal.length) {
                            var val = newVal[newVal.length - 1],
                            newEl = $element.find('li:last');

                            $timeout(function(){
                                gridster.register_widget(newEl)
                                    .add_faux_rows(1)
                                    .set_dom_grid_height();
                            });
                        }
                    }
                };

                return scope.$watch('ngModel', attachModel, true);
            },

            controller: function ($scope, $element, $attrs) {
                // TODO
            }
        };

    })

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

            scope: {
                frame: '='
            },

            link: function (scope, element, attributes, controller) {

                // Is the origin the same as the webtop?
                var origin = compareUrl(scope.frame.url);

                // Instead of templateUrl, use $http to load one of two templates
                $http.get(getTemplate(origin)).then(function(response) {
                    element.html($compile(response.data)(scope));
                });

                // TODO: make these dynamic
                scope.styles = {
                    'height': 181,
                    'width': 150
                };

            }

        };

    });

