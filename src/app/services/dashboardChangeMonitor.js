'use strict';

/**
 * Broadcast messages down $rootScope when the current dashboard or dashboard
 * layout changes
 *
 * Event name: **dashboardSwitched**
 *
 * Event data:
 *
 *     {"layout": "grid | desktop", "dashboardId": "someDashboardId"}
 *
 * ngtype: factory
 *
 * @namespace general
 * @class dashboardChangeMonitor
 * @static
 */
angular.module('ozpWebtopApp.general').factory('dashboardChangeMonitor',
  function($rootScope, $location, dashboardSwitchedEvent) {
    // detect a change in dashboard layout
    var service = {};
    service.layout = '';
    service.dashboardId = '';

    /**
     * Activate the dashboardChangeMonitor
     *
     * @method run
     */
    service.run = function() {
      $rootScope.$watch(function() {
        return $location.path();
      }, function() {
        var dashboardChange = {};

        // get dashboard id
        var urlPath = $location.path();
        var pattern = new RegExp('/(?:grid|desktop)/([0-9]+)');
        var res = pattern.exec(urlPath);
        if (res) {
          service.dashboardId = res[1];
        } else {
          // if the url regex doesn't match, this page must be something else
          return;
        }

        // get the dashboard layout
        var n = $location.path().indexOf('grid');
        if (n !== -1) {
          service.layout = 'grid';
        } else {
          service.layout = 'desktop';
        }

        dashboardChange.layout = service.layout;
        dashboardChange.dashboardId = service.dashboardId;
        // console.log('broadcasting dashboard change msg: ' + JSON.stringify(dashboardChange));
        $rootScope.$broadcast(dashboardSwitchedEvent, dashboardChange);
      });
    };

    return service;
  });