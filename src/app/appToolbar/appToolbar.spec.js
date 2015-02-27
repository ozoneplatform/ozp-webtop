'use strict';

describe('App Toolbar', function () {

  var scope, marketplaceApi, dashboardApi;

  // use IWC for tests?
  beforeEach(function() {
    angular.mock.module('ozpWebtop.constants', function($provide) {
      $provide.constant('useIwc', false);
    });
  });

  // load the filter's module
  beforeEach(module('ozpWebtop.appToolbar'));

  beforeEach(inject(function($rootScope, $controller, _marketplaceApi_,
    _dashboardApi_) {
    scope = $rootScope.$new();
    marketplaceApi = _marketplaceApi_;
    dashboardApi = _dashboardApi_;
    marketplaceApi.createExampleMarketplace();

    // create example dashboards
    dashboardApi.createExampleDashboards().then(function() {

    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    $controller('ApplicationToolbarCtrl', {$scope: scope});

    // For testing $rootScope events
    spyOn($rootScope, '$broadcast').and.callThrough();

    $rootScope.$apply();
  }));

  xit('should expose $scope.apps', function() {
    if(!scope.$$phase) { scope.$apply(); }
    expect(scope.apps).toBeDefined();
  });



});