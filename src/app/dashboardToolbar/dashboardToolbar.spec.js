'use strict';

describe('Dashboard Toolbar', function () {

  var scope;

  // load the filter's module
  beforeEach(module('ozpWebtopApp.dashboardToolbar'));

   // mock out the filtrfy service before each test
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('dashboardToolbarCtrl', {$scope: scope});
  }));

  var allowedLayouts = ['grid','desktop'];

  it('should expose the clock', function() {
    expect(scope.clock).toBeDefined();
  });

  it('webtop should have layout grid or desktop', function() {
    expect(allowedLayouts).toContain(scope.layout);
  });
  // TODO: more tests


});