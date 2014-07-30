'use strict';

describe('Dashboard Toolbar', function () {

  var scope;

  // load the filter's module
  beforeEach(module('ozpwebtop.dashboardToolbar'));

   // mock out the filtrfy service before each test
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('dashboardToolbarCtrl', {$scope: scope});
  }));

  it('should expose the clock', function() {
    expect(scope.clock).toBeDefined();
  });

  // TODO: more tests


});