'use strict';

/**
 * Desktop managed frame
 *
 * @module ozpWebtop.dashboardView.desktop.managedFrame
 * @requires ozpWebtop.models.dashboard
 * @requires ozpWebtop.dashboardView.desktop.iframe
 */
angular.module('ozpWebtop.dashboardView.desktop.managedFrame', [
  'ozpWebtop.models.dashboard']);

/**
 *
 * ngtype: directive
 *
 * @namespace dashboardView
 * @class ozpManagedFrame
 * @constructor
 * @param {Object} dashboardApi the API for dashboard information {{#crossLink "dashboardApi"}}{{/crossLink}}
 */
angular.module('ozpWebtop.dashboardView.desktop.managedFrame')
.directive('ozpManagedFrame', function (dashboardApi) {
  // Directive definition object
  return {
    restrict: 'E',
    templateUrl: 'dashboardView/desktop/managediframe.tpl.html',
    scope: {
      'myframe': '='
    },
    link: function (scope, element) {
      var resizableConfig = {
      handles: 'nw, sw, se, ne',
      aspectRatio: false,
      ghost: true,
      minWidth: 210,
      minHeight: 210,
      containment: '.desktop-view',
      start: function(event,ui) {
        angular.element('body').css('pointer-events','none');//this is not smart, but works for the demo... will probably need a workaround for ie9
        start(event, ui);
      },
      stop: function(event, ui) {
        angular.element('body').css('pointer-events','auto');//this is not smart, but works for the demo... will probably need a workaround for ie9
        stop(event, ui);
      }
    };

    var draggableConfig = {
      addClasses: true,
      scrollSensitivity: 100,
      scrollSpeed: 100,
      iframeFix: true,
      containment: '.desktop-view',
      start: function(event, ui) {
        start(event, ui);
      },
      stop: function(event, ui) {
        stop(event, ui);
      }
    };
    if (!scope.myframe) {
      console.log('ERROR, scope.myframe is not defined');
      return;
    }
    scope.zIndexMax = 0;
    element.draggable(draggableConfig);
    element.resizable(resizableConfig);
    // Logic for dragging is influenced by Angular directive documentation, under the
    // heading "Creating a Directive that Adds Event Listeners".
    // See: https://docs.angularjs.org/guide/directive

    // Get starting positions from state
    var startX = scope.myframe.desktopLayout.left;
    var startY = scope.myframe.desktopLayout.top;

    // 'Current' positions are changed as the element moves
    var x = startX, y = startY;

    // React to a mousedown and allow the element to move

    // TODO: find a more maintainable way?
    // Ignore click event if we clicked a button
    function start (event) {
      var className = event.target ? event.target.className : event.srcElement.className;
      if (className.indexOf('icons') > -1) {
        console.log('preventDefault on mousedown event and returning');
        event.preventDefault();
        return;
      }
      // Bring frame to foreground
      bringToFront();

      startX = event.pageX - x;
      startY = event.pageY - y;
    }


    function stop (event) {
      y = event.pageY - startY;
      x = event.pageX - startX;

      // TODO: find a more maintainable way?
      var className = event.target ? event.target.className : event.srcElement.className;
      if (className.indexOf('icons') > -1) {
        console.log('stop() prevent default on mouseup and returning');
        event.preventDefault();
        return;
      }
      saveFramePosition();
      }

      function bringToFront() {
        dashboardApi.getDashboardById(scope.dashboardId).then(function (dashboard) {
          for (var i = 0; i < dashboard.frames.length; i++) {
            if (dashboard.frames[i].desktopLayout.zIndex > scope.zIndexMax) {
              scope.zIndexMax = dashboard.frames[i].desktopLayout.zIndex;
            }
          }
          scope.zIndexMax += 1;
          element.css({
            zIndex: scope.zIndexMax
          });
          // save it
          saveFramePosition();

        });
      }

      function onMouseDown(event) {
        // change z-index to top
        // TODO: find a more maintainable way?
        var className = event.target ? event.target.className : event.srcElement.className;
        if (className.indexOf('icons') > -1) {
          // console.log('stop() prevent default on mouseup and returning');
          event.preventDefault();
          return;
        }
        bringToFront();

      }

      function saveFramePosition() {
        dashboardApi.updateDesktopFrame(
        scope.myframe.id,
        element[0].offsetLeft,
        element[0].offsetTop,
        element[0].offsetWidth,
        element[0].offsetHeight,
        scope.zIndexMax
        ).then(function() {
          // frame updated
        });
      }

      element.on('mousedown', onMouseDown);

      // Set our dashboard id
      dashboardApi.getDashboards().then(function(dashboards) {
          for (var i=0; i < dashboards.length; i++) {
            for (var j=0; j < dashboards[i].frames.length; j++) {
              if (dashboards[i].frames[j].id === scope.myframe.id) {
                // this is our dashboard
                scope.dashboardId = dashboards[i].id;
              }
            }
          }
        });
    }
  };
});
