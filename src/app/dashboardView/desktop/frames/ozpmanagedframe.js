'use strict';

/**
 * ozpManagedFrame includes an html document in the webtop
 *
 * @namespace directives
 * @class ozpManagedFrame
 * @constructor
 */
angular.module('ozpWebtopApp.dashboardView')
.directive('ozpManagedFrame', function (compareUrl, $http, $compile, $document, dashboardApi) {
  /**
   * Decides which template to use.
   *
   * @method getTemplate
   * @private
   * @param {Boolean} sameOrigin True if the frame comes from the same origin as the webtop,
   *     false otherwise.
   */
  var getTemplate = function (sameOrigin) {
    var template = '';

    // If different origin, use an iframe template
    if (!sameOrigin) {
      template = 'dashboardView/templates/managediframe.tpl.html';
    }
    // otherwise, use a 'frame' (div) template
    else {
      template = 'dashboardView/templates/managedframe.tpl.html';
    }
    return template;
  };

  // Directive definition object
  return {
    restrict: 'E',
    template: '<div ng-include="getContentUrl()"></div>',
    link: function (scope, element) {
      // Logic for dragging is influenced by Angular directive documentation, under the
      // heading "Creating a Directive that Adds Event Listeners".
      // See: https://docs.angularjs.org/guide/directive

      // Get starting positions from state
      var startX = scope.frame.desktopLayout.left;
      var startY = scope.frame.desktopLayout.top;


      // 'Current' positions are changed as the element moves
      var x = startX, y = startY;

      // React to a mousedown and allow the element to move
      element.on('mousedown', function(event) {
        // Bring frame to foreground
        if (scope.frame.desktopLayout.zIndex <= scope.max.zIndex) {
          scope.frame.desktopLayout.zIndex = scope.max.zIndex + 1;
          scope.max.zIndex = scope.frame.desktopLayout.zIndex;

          element.css({
            zIndex: scope.frame.desktopLayout.zIndex
          });
          dashboardApi.updateCurrentDashboardDesktop(scope.currentDashboardIndex,
            scope.frame.uuid, x, y, scope.max.zIndex);
        }

        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
        // console.log('Starting x is ' + startX + ', startY is ' + startY);
      });

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
        dashboardApi.updateCurrentDashboardDesktop(scope.currentDashboardIndex,
          scope.frame.uuid, x, y, scope.max.zIndex);
      }

      // Is the origin the same as the webtop?
      var origin = compareUrl(scope.frame.url);

      // configure dynamic template without using $http for ease of testing
      scope.getContentUrl = function() {
        return getTemplate(origin);
      };

      // Note: in iframe template height and width of the iframe is calculated based on
      // these styles. May need to change it in the future.
      scope.styles = {
        'top': scope.frame.desktopLayout.top,
        'left': scope.frame.desktopLayout.left,
        'height': function(){
          console.log(scope.frame.desktopLayout.height);
          return scope.frame.desktopLayout.height;
        },
        'width': scope.frame.desktopLayout.width,
        'z-index': scope.frame.desktopLayout.zIndex
      };
    }
  };
});
