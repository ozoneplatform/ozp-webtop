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
    console.log(scope.myApps);
  });

  //WebTop is built off config file, since there are no api's currently that we would be able to get myApps, this makes sure the hard coded objects have values
  it('should have more than 0 apps in myApps', function(){
    expect(scope.myApps.length).toBeGreaterThan(0);
  });

  it('should have more than 0 apps in myPinnedApps', function(){
    expect(scope.myPinnedApps.length).toBeGreaterThan(0);
  });
  // TODO: more tests


});