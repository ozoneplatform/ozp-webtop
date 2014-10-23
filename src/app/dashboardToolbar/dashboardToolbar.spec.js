'use strict';

describe('Controller: DashboardToolbar', function () {

  var scope, rootScope, dashboardApi, dashboardChangeMonitor,
    launchUserPreferencesModalEvent;

  // use IWC for tests?
  beforeEach(function() {
    angular.mock.module('ozpWebtop.constants', function($provide) {
      $provide.constant('useIwc', false);
    });
  });

  beforeEach(module('ozpWebtop.dashboardToolbar'));

  beforeEach(inject(function(_$rootScope_, $controller, _dashboardApi_,
                             _dashboardChangeMonitor_,
                             _launchUserPreferencesModalEvent_) {
    rootScope = _$rootScope_;
    dashboardApi = _dashboardApi_;
    dashboardChangeMonitor = _dashboardChangeMonitor_;
    launchUserPreferencesModalEvent = _launchUserPreferencesModalEvent_;

    // Scope setup
    scope = rootScope.$new();

    // create example dashboards
    dashboardApi.createExampleDashboards().then(function() {

    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    rootScope.$apply();

    // For testing $rootScope events
    spyOn(rootScope, '$broadcast').and.callThrough();

    scope.layout = 'grid';
      $controller('DashboardToolbarCtrl', {
        $scope: scope,
        dashboardApi: dashboardApi,
        dashboardChangeMonitor: dashboardChangeMonitor
      });
  }));

  var allowedLayouts = ['grid','desktop'];

  it('should expose the layout', function() {
    expect(scope.layout).toBeDefined();
  });

  it('webtop should have layout grid or desktop', function() {
    expect(allowedLayouts).toContain(scope.layout);
  });

  it('should get a list of dashboards from the dashboardApi', function() {
      if(!scope.$$phase) { scope.$apply(); }
      expect(scope.dashboards.length).toBeGreaterThan(0);
  });

  it('should expose a setCurrentDashboard method', function() {
    var dashboard = 'test dashboard foo';
    scope.setCurrentDashboard(dashboard);
    expect(scope.currentDashboard).toBe(dashboard);
  });

  it('should get a user from dashboardApi', function() {

    if(!scope.$$phase) { scope.$apply(); }
    expect(scope.user).toBeDefined();
  });

  it('should expose a useGridLayout method', function() {
    scope.useGridLayout();
    scope.$apply();
    expect(scope.layout).toBe('grid');
  });

  it('should expose a useDesktopLayout method', function() {
    scope.useDesktopLayout();
    expect(scope.layout).toBe('desktop');
  });

  it('should fire a launchUserPreferencesModalEvent event', function() {
    var settingsLaunchObj = { launch: 'true' };
    scope.launchSettingsModal();
    expect(rootScope.$broadcast).toHaveBeenCalledWith(
      launchUserPreferencesModalEvent, settingsLaunchObj);
  });

  it('should expose zuluTime', function() {
    expect(scope.zuluTime).toBeDefined();
  });
});