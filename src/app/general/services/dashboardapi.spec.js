'use strict';

describe('Service: dashboardApi', function () {
  // load the service's module
  beforeEach(module('ozpWebtopApp'));

  // Dashboards service
  var httpBackend, dashboardApi;
  beforeEach(inject(function ($httpBackend, _dashboardApi_) {
    dashboardApi = _dashboardApi_;
    dashboardApi.createExampleDashboards();
    httpBackend = $httpBackend;
  }));

  it('dashboardApi can create a sample set of dashboards', function() {
    var dashboardData = dashboardApi.getDashboardData();
    expect(dashboardData.user).toBe('joebloe');
  });

  it('getFrameById', function() {
    spyOn(dashboardApi, 'getFrameById');
    dashboardApi.getFrameById('madeupid');
    expect(dashboardApi.getFrameById).toHaveBeenCalled();
  });

});