'use strict';

describe('Add Applications', function () {

  var scope, modalInstance;

  // load the filter's module
  beforeEach(module('ozpWebtop.addApplicationsModal'));

  // use IWC for tests?
  beforeEach(function() {
    angular.mock.module('ozpWebtop.constants', function($provide) {
      $provide.constant('useIwc', false);
    });
  });

  beforeEach(inject(function($rootScope, $httpBackend, $controller) {
    scope = $rootScope.$new();
    modalInstance = {                    // Create a mock object using spies
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('modalInstance.result.then')
      }
    };

    jasmine.getJSONFixtures().fixturesPath='base/testData';
    var listingData = getJSONFixture('ApplicationData.json');

    $controller('AddApplicationsModalInstanceCtrl', {
      $scope: scope,
      $modalInstance: modalInstance,
      apps: listingData.apps}
    );

  }));

  it('should expose a sorted list of applications', function() {
    expect(scope.applications).toBeDefined();
    expect(scope.applications.length).toBeGreaterThan(3);
    var appNames = [];
    for (var i=0; i < scope.applications.length; i++) {
     appNames[i] = scope.applications[i].name;
    }
    var sortedNames = appNames.sort();
    expect(appNames).toEqual(sortedNames);
  });

});