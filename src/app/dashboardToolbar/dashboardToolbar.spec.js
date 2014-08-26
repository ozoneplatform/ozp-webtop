'use strict';

describe('Controller: DashboardToolbar', function () {

  var scope, rootScope;

  beforeEach(module('ozpWebtopApp.dashboardToolbar'));

  beforeEach(inject(function(_$rootScope_, $controller, _dashboardApi_, _dashboardChangeMonitor_) {
    rootScope = _$rootScope_;

    // For testing $rootScope events
    spyOn(rootScope, '$broadcast').andCallThrough();

    // Scope setup 
    scope = rootScope.$new();
    scope.layout = 'foo';
    $controller('dashboardToolbarCtrl', {
      $scope: scope,
      dashboardApi: _dashboardApi_,
      dashboardChangeMonitor: _dashboardChangeMonitor_
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
    expect(scope.dashboards.length).toBeGreaterThan(0);
  });

  it('should expose a setCurrentDashboard method', function() {
    var dashboard = 'test dashboard foo';
    scope.setCurrentDashboard(dashboard);
    scope.$apply();
    expect(scope.currentDashboard).toBe(dashboard);
  });

  it('should expose a useGridLayout method', function() {
    scope.useGridLayout();
    scope.$apply();
    expect(scope.layout).toBe('grid');
  });

  it('should expose a useDesktopLayout method', function() {
    scope.useDesktopLayout();
    scope.$apply();
    expect(scope.layout).toBe('desktop');
  });

  it('should fire a launchSettingsModal event', function() {
    var settingsLaunchObj = { launch: 'true' };
    scope.launchSettingsModal();
    expect(rootScope.$broadcast).toHaveBeenCalledWith('launchSettingsModal', settingsLaunchObj);
  });  
});