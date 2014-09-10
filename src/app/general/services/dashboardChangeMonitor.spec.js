'use strict';

describe('Service: dashboardChangeMonitor', function () {
  // load the service's module
  beforeEach(module('ozpWebtopApp'));

  // instantiate service
  var $rootScope, $location, dashboardChangeMonitor;
  beforeEach(inject(function (_$rootScope_, _$location_, _dashboardChangeMonitor_) {
    $rootScope = _$rootScope_;
    $location = _$location_;
    dashboardChangeMonitor = _dashboardChangeMonitor_;
    spyOn($rootScope, '$broadcast').and.callThrough();
  }));

  it('has a run method', function() {
    expect(dashboardChangeMonitor.run).toBeDefined();
  });

  it('exposes the layout property', function() {
    dashboardChangeMonitor.run();
    $location.path('/grid/0');
    $rootScope.$apply();
    expect(dashboardChangeMonitor.layout).toBe('grid');

    $location.path('/desktop/5');
    $rootScope.$apply();
    expect(dashboardChangeMonitor.layout).toBe('desktop');
  });

  it('exposes the dashboardId property', function() {
    dashboardChangeMonitor.run();
    $location.path('/grid/0');
    $rootScope.$apply();
    expect(dashboardChangeMonitor.dashboardId).toBe('0');

    $location.path('/grid/0');
    $rootScope.$apply();
    expect(dashboardChangeMonitor.dashboardId).toBe('0');
  });

  it('sends messages when the url changes', function() {
    dashboardChangeMonitor.run();

    $location.path('/grid/0');
    $rootScope.$apply();
    var obj = {'layout': 'grid', 'dashboardId': '0'};
    expect($rootScope.$broadcast).toHaveBeenCalledWith('dashboardChange', obj);
  });

  it('supports double-digit dashboard indexes', function() {
    dashboardChangeMonitor.run();
    $location.path('/desktop/12');
    $rootScope.$apply();
    var obj = {'layout': 'desktop', 'dashboardId': '12'};
    expect($rootScope.$broadcast).toHaveBeenCalledWith('dashboardChange', obj);
  });

});