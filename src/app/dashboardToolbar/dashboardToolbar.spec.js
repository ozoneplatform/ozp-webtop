'use strict';

describe('Dashboard Toolbar', function () {

  var scope;

  // load the filter's module
  beforeEach(module('ozpWebtopApp.dashboardToolbar'));

   // mock out the filtrfy service before each test
  beforeEach(inject(function($rootScope, $controller, _dashboardApi_) {
    scope = $rootScope.$new();
    $controller('dashboardToolbarCtrl', {
      $scope: scope,
      dashboardApi: _dashboardApi_});
  }));

  var allowedLayouts = ['grid','desktop'];

  it('should expose the layout', function() {
    expect(scope.layout).toBeDefined();
  });

  it('webtop should have layout grid or desktop', function() {
    expect(allowedLayouts).toContain(scope.layout);
  });
  // TODO: more tests


});