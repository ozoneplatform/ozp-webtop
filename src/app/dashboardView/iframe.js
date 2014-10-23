'use strict';

/**
 * iframe module for dashboard layouts
 *
 * @module ozpWebtop.dashboardView.iframe
 */
angular.module('ozpWebtop.dashboardView.iframe', []);

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
angular.module('ozpWebtop.dashboardView.iframe')
  .controller('IframeCtrl', function ($scope, $sce) {
    /**
     * @property frame.trustedUrl URL
     * @type {String}
     */
    $scope.frame.trustedUrl = $sce.trustAsResourceUrl($scope.frame.url);
  });
