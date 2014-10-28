'use strict';

describe('Add Applications', function () {

  var scope, marketplaceApi, modalInstance;

  // load the filter's module
  beforeEach(module('ozpWebtop.addApplicationsModal'));

  beforeEach(inject(function($rootScope, $controller, _marketplaceApi_) {
    scope = $rootScope.$new();
    modalInstance = {                    // Create a mock object using spies
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('modalInstance.result.then')
      }
    };
    marketplaceApi = _marketplaceApi_;
    var apps = [];
    marketplaceApi.createExampleMarketplace().then(function() {
      marketplaceApi.getAllApps().then(function(resp) {
        apps = resp;
        $controller('AddApplicationsModalInstanceCtrl', {$scope: scope,
          $modalInstance: modalInstance, apps: apps});
      });
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    $rootScope.$apply();

  }));

  it('should expose a sorted list of applications', function() {
    expect(scope.applications).toBeDefined();
    var appNames = [];
    for (var i=0; i < scope.applications.length; i++) {
     appNames[i] = scope.applications[i].name;
    }
    var sortedNames = appNames.sort();
    expect(appNames).toEqual(sortedNames);
  });

});