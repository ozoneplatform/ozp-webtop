'use strict';

/**
 * ozpGridster is a wrapper around a 'ul' element used to manage the grid layout.
 *
 * @namespace directives
 * @class ozpGridster
 * @constructor
 */
angular.module('ozpWebtopApp.dashboardView')

/**
 * gridsterItem is a wrapper around a tile in the grid
 *
 * @namespace directives
 * @class gridsterItem
 * @constructor
 */
.directive('ozpGridsterItem', function ($compile, $http, $templateCache, $timeout, compareUrl, dashboardApi, dashboardChangeMonitor) {

    // TODO: review this before removing
//  var getTemplate = function (sameOrigin) {
//    var template = '';
//
//    // If different origin, use an iframe template
//    if (!sameOrigin) {
//      template = 'general/templates/managediframe.tpl.html';
//    }
//    // otherwise, use a 'frame' (div) template
//    else {
//      template = 'general/templates/managedframe.tpl.html';
//    }
//    return template;
//  };

  return {

    replace: true,

    restrict: 'AE',

    // TODO: use controller for inter-directive communication
    // require: '^ozpGridster',


    scope: {
      frame: '='
    },

    link: function (scope, element) {

        dashboardChangeMonitor.run();
        scope.$on('dashboardChange', function(event, data) {
          scope.currentDashboardIndex = data.dashboardIndex;
        });
      // Is the origin the same as the webtop?
      var origin = compareUrl(scope.frame.url);
      var template;

      // Instead of templateUrl, use $http to load one of two templates
      if (origin === true) {
        template = $templateCache.get('dashboardView/templates/managedframe.tpl.html');
      } else {
        template = $templateCache.get('dashboardView/templates/managediframe.tpl.html');
      }

      element.html($compile(template)(scope));
      // Add the managed frame class to take advantage of the styles
      element.addClass('ozp-managed-frame');
      // TODO: review this before removing
//      $http.get(getTemplate(origin)).then(function(response) {
//        element.html($compile(response.data)(scope));

        // Add the managed frame class to take advantage of the styles
        // element.addClass('ozp-managed-frame');
    //});

      scope.$on('gridSizeChanged', function(event, data) {
        if (data.uuid === scope.uuid) {
          scope.styles.height = data.height;
          scope.styles.width = data.width;
          console.log('changing size to height: ' + data.height + ', width: ' + data.width);
        }
      });

      // TODO: get minimum values from somewhere based on the size of the
      //      current grid
      scope.styles = {
        'height': 100,
        'width': 100
      };

      // element.context.id will === {{item.uuid}} until the scope.$apply() is
      // invoked and the template is compiled. Using a timeout with no delay is
      // a best-practice as a way to wait until scope.$apply() is invoked
      // see answer by aaronfrost:
      // http://stackoverflow.com/questions/12729122/prevent-error-digest-already-in-progress-when-calling-scope-apply
      $timeout(function() {
        scope.uuid = element.context.id;
        var widgetSize = dashboardApi.getAppSize(scope.currentDashboardIndex, scope.uuid);
        console.log('setting intitial style: ' + widgetSize.width + ', ' + widgetSize.height);
        scope.styles = {
          'height': widgetSize.height,
          'width': widgetSize.width
        };
      });
    }
  };
});
