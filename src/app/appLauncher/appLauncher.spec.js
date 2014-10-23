'use strict';

describe('App Launcher', function () {

  var scope, stateParams, marketplaceApi;

  // load the filter's module
  beforeEach(module('ozpWebtop.appLauncher'));

  beforeEach(inject(function ($rootScope, $controller, _marketplaceApi_) {
    scope = $rootScope.$new();
    marketplaceApi = _marketplaceApi_;
    stateParams = {};
    marketplaceApi.createExampleMarketplace();
    $controller('AppLauncherCtrl', {$scope: scope, $stateParams: stateParams});
  }));

  // TODO: figure out how to test this
  xit('should expose appId', function () {
    stateParams = {appId: '1234'};

    if (!scope.$$phase) {
      scope.$apply();
    }
    expect(scope.appId).toEqual('1234');
  });
});