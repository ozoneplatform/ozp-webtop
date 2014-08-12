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
    var dashboards = dashboardApi.getAllDashboards();
    expect(dashboards.user).toBe('joebloe');
  });

});