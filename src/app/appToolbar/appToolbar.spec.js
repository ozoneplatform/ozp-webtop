'use strict';

describe('App Toolbar', function () {

  var scope;

  // load the filter's module
  beforeEach(module('ozpwebtop.appToolbar'));

   // mock out the filtrfy service before each test
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('appToolbarCtrl', {$scope: scope});
  }));

  it('should expose myApps', function() {
    expect(scope.myApps).toBeDefined();
  });

  // TODO: more tests


});