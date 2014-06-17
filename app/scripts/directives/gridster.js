'use strict';

/**
 *
 */
angular.module('ozpWebtopApp.directives')
    .directive('gridster', ['$timeout', '$parse',
    function ($timeout, $parse, gridsterConfig) {

        var gridsterConfig = {
            widget_margins: [5, 5],
            widget_selector: 'li',
            max_cols: 2
        };

        return {
            restrict: 'AE',
            scope: {
                ngModel: '=',
                options: '=',
                updated: '&'
            },
            require: '^ngModel',
            template: '<ul><li class="gs-w" ng-repeat="item in ngModel" ng-model="item"' +
                            'data-col="{{item.col}}" data-row="{{item.row}}"' +
                                'data-sizex="{{item.sizex}}" data-sizey="{{item.sizey}}">' +
                        '{{item.name}}</li></ul>',
            link: function ($scope, $element, $attributes, $controller) {

                var options = angular.extend(gridsterConfig,
                    $scope.$eval($attributes.gridsterOptions));

                var gridster;
                $timeout(function() {
                    var el = $element.find('ul')
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

                return $scope.$watch('ngModel', attachModel, true);
            }
        };

    }]);
