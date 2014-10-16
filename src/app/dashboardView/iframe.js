'use strict';

/**
 * IframeCtrl ensures that a widget can be properly displayed in an iframe.
 *
 * ngtype: controller
 *
 * @namespace dashboardView
 * @class IframeCtrl
 * @constructor
 * @param $scope An Angular scope
 * @param $sce The Angular service for Strict Contextual Escaping - [API Docs](https://docs.angularjs.org/api/ng/service/$sce)
 */
angular.module('ozpWebtopApp.dashboardView')
  .controller('IframeCtrl', function ($scope, $sce) {
    /**
     * @property frame.trustedUrl URL
     * @type {String}
     */
    $scope.frame.trustedUrl = $sce.trustAsResourceUrl($scope.frame.url);
  });
