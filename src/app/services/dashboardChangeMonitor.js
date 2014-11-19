'use strict';

/**
 * Dashboard change monitor
 *
 * @module ozpWebtop.services.dashboardChangeMonitor
 * @requires ozpWebtop.constants
 */
angular.module('ozpWebtop.services.dashboardChangeMonitor', [
  'ozpWebtop.constants']);

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
angular.module('ozpWebtop.services.dashboardChangeMonitor').factory(
  'dashboardChangeMonitor', function($rootScope, $location,
                                     dashboardSwitchedEvent) {
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
      var newLayout = '';
      var newDashboardId = '';
      $rootScope.$watch(function() {
        return $location.path();
      }, function() {
        var dashboardChange = {};
        // get dashboard id
        var urlPath = $location.path();
        // make sure we're on a valid page
        // TODO: this is far from bulletproof
        if (urlPath.indexOf('grid') === -1 && urlPath.indexOf('desktop') === -1) {
          return;
        }
        var n = urlPath.lastIndexOf('/');
        // TODO: this will break if we have a query string, trailing slash, or
        // pretty much anything else
        newDashboardId = urlPath.substr(n+1);

        // get the dashboard layout
        n = $location.path().indexOf('grid');
        if (n !== -1) {
          newLayout = 'grid';
        } else {
          newLayout = 'desktop';
        }

        if (newLayout !== service.layout || newDashboardId !== service.dashboardId) {
          service.layout = newLayout;
          service.dashboardId = newDashboardId;
          dashboardChange.layout = service.layout;
          dashboardChange.dashboardId = service.dashboardId;
          // console.log('broadcasting dashboard change msg: ' + JSON.stringify(dashboardChange));
          $rootScope.$broadcast(dashboardSwitchedEvent, dashboardChange);
        }
      });
    };

    return service;
  });