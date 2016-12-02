'use strict';

/**
 * Top level module of the Webtop. When declared in an HTML file, it bootstraps
 * the Webtop.
 *
 * @example
 *     <body ng-app="ozpWebtop"> ... </body>
 *
 * @module ozpWebtop
 * @requires ozp.common.ellipticalFilter
 * @requires ozp.common.iwc.client
 * @requires ozp.common.utilities
 * @requires ozp.common.windowSizeWatcher
 * @requires ozpWebtop.constants
 * @requires ozpWebtop.services.iwcInterface
 * @requires ozpWebtop.services.restInterface
 * @requires ozpWebtop.models
 * @requires ozpWebtop.appToolbar
 * @requires ozpWebtop.ozpToolbar
 * @requires ozpWebtop.dashboardView.button
 * @requires ozpWebtop.dashboardView.chrome
 * @requires ozpWebtop.dashboardView.desktop
 * @requires ozpWebtop.dashboardView.desktop.managedFrame
 * @requires ozpWebtop.dashboardView
 * @requires ozpWebtop.dashboardView.grid
 * @requires ozpWebtop.addApplicationsModal
 * @requires ozpWebtop.editDashboardModal
 * @requires ozpWebtop.createDashboardModal
 * @requires ozpWebtop.appWarningModal
 * @requires ozpWebtop.profileModal
 * @requires ozpWebtop.contactModal
 * @requires ozpWebtop.iwcIntentModal
 * @requires ozpWebtop.helpModal
 * @requires ozpWebtop.urlWidgetLauncher
 * @requires ui.router
 * @requires ct.ui.router.extras
 * @requires ui.bootstrap
 * @requires gridster
 * @requires ozpIwcClient
 * @requires ozpClassification
 * @requires filters
 */
angular.module( 'ozpWebtop', [
  'ozp.common.ellipticalFilter',
  'ozp.common.iwc.client',
  'ozp.common.utilities',
  'ozp.common.windowSizeWatcher',
  'templates-app',
  'templates-common',
  'ozpWebtop.constants',
  'ozpWebtop.services.ozpInterface',
  'ozpWebtop.models',
  'ozpWebtop.services.responseObserver',
  'ozpWebtop.services.widgets',
  'ozpWebtop.appToolbar',
  'ozpWebtop.ozpToolbar',
  'ozpWebtop.dashboardView.button',
  'ozpWebtop.dashboardView.chrome',
  'ozpWebtop.dashboardView.desktop',
  'ozpWebtop.dashboardView.desktop.managedFrame',
  'ozpWebtop.dashboardView',
  'ozpWebtop.dashboardView.grid',
  'ozpWebtop.addApplicationsModal',
  'ozpWebtop.profileModal',
  'ozpWebtop.contactModal',
  'ozpWebtop.iwcIntentModal',
  'ozpWebtop.helpModal',
  'ozpWebtop.editDashboardModal',
  'ozpWebtop.createDashboardModal',
  'ozpWebtop.deleteDashboardModal',
  'ozpWebtop.appWarningModal',
  'ozpWebtop.urlWidgetLauncher',
  'ozpWebtop.filters',
  'ui.router',
  'ct.ui.router.extras',
  'ui.bootstrap',
  'angularSpinner',
  'gridster',
  'ozpIwcClient',
  'ozpClassification',
  'ngAria'
])

.config(function($stateProvider, $urlRouterProvider,
                 $logProvider, maxStickyBoards, $httpProvider) {

    $logProvider.debugEnabled(true);

    $httpProvider.interceptors.push('responseObserver');
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    /*
    To avoid losing the internal state of widgets as users switch between
    dashboards, we leverage the 'sticky state' capabilities of ui-router-extras
    such that the DOMs for up to 10 grid layout and 10 desktop layout dashboards
    are not torn down as the user navigates between them.
    */
    var states = [];
    states.push({name: 'dashboardview', url: '/',
      views: {
        '@': {controller: 'DashboardViewCtrl',
          templateUrl: 'userInterface/dashboardView/dashboardView.tpl.html'}
    }});

    // Sticky views
    for (var slot=0; slot < maxStickyBoards; slot++) {
      var gridViewName = 'gridlayout-' + slot + '@dashboardview';
      var desktopViewName = 'desktoplayout-' + slot + '@dashboardview';
      var gridState = {
        name: 'dashboardview.grid-sticky-' + slot,
        url: 'grid/sticky-' + slot + '/:dashboardId',
        views: {},
        deepStateRedirect: true,
        sticky: true
      };
      gridState.views[gridViewName] = {controller: 'GridCtrl',
        templateUrl: 'userInterface/dashboardView/grid/grid.tpl.html'};

      states.push(gridState);

      var desktopState = {
        name: 'dashboardview.desktop-sticky-' + slot,
        url: 'desktop/sticky-' + slot + '/:dashboardId',
        views: {},
        deepStateRedirect: true,
        sticky: true
      };
      desktopState.views[desktopViewName] = {controller: 'DesktopCtrl',
        templateUrl: 'userInterface/dashboardView/desktop/desktop.tpl.html'};

      states.push(desktopState);
    }

    /*
      This is a temporary solution to the problem of opening a widget in a
      dashboard from Center or HUD. Ultimately, this should be done using IWC
      Intents. This URL mechanism is not ideal for many reasons, not least of
      which is the fact that it will open and additonal webtop tab/window, and
      multiple webtop instances is not well supported
     */
    states.push({name: 'url-launch-app', url: '/launchApp/:appId',
      controller: 'UrlWidgetLauncherCtrl'});

    //for the url-lauch-folder route appId is the individual appID, dashName is
    //  new dashboard name
    states.push({name: 'url-launch-folder', url: '/launchFolder?dashName&appIds',
      controller: 'UrlWidgetLauncherCtrl'});

    angular.forEach(states, function(state) { $stateProvider.state(state); });
    $urlRouterProvider.otherwise('/');
  })

.run( function run ($rootScope, $state, $http, $window, $log,
                    models, ozpInterface, initialDataReceivedEvent, notificationReceivedEvent) {

    $rootScope.$state = $state;

    $rootScope.systemHighClassification = $window.OzoneConfig.SYSTEM_HIGH_CLASSIFICATION;

    // TODO: flag to optionally use IWC

    /*
      First, get Listing data for the apps/widgets that have been bookmarked by
      the user. Then retrieve their previous webtop data (if any). This is
      the only time we will go to the server (and wait for a response) for
      Listing data and/or webtop data
     */
      ozpInterface.getListings().then(function(listings) {
        models.setApplicationData(listings);
        ozpInterface.getWebtopData().then(function(webtopData) {
        if (webtopData) {
          models.setInitialWebtopData(webtopData);
          $log.info('application listings and dashboard data retrieved - ready to start');
          $rootScope.$broadcast(initialDataReceivedEvent);
        } else {
          $log.warn('No dashboard data found. Creating default dashboard');
          models.setInitialWebtopData({});
          $log.info('application listings and dashboard data retrieved - ready to start');
          $rootScope.$broadcast(initialDataReceivedEvent);
        }
      });
      // Get the notifications on load.
      // TODO when there is a way to communicate changes from the server to the
      //      application show notification updates live
      ozpInterface.getNotifications().then(function(notifications) {
        $rootScope.$broadcast(notificationReceivedEvent, notifications);
      });
    });
});
