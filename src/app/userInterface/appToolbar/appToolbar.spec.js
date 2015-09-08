'use strict';

describe('App Toolbar', function () {

  var scope;

  // use IWC for tests?
  beforeEach(function() {
    angular.mock.module('ozpWebtop.constants', function($provide) {
      $provide.constant('useIwc', false);
    });
  });

  // load the filter's module
  beforeEach(module('ozpWebtop.appToolbar'));

  beforeEach(inject(function($rootScope, $controller, $httpBackend, $window, models) {
    scope = $rootScope.$new();

    $httpBackend.when('PUT', $window.OzoneConfig.API_URL + '/api/profile/self/data/dashboard-data')
                            .respond({});

    jasmine.getJSONFixtures().fixturesPath='base/testData';
    var listingData = getJSONFixture('ApplicationLibrary.json');
    var webtopData = getJSONFixture('WebtopData.json');
    models.setInitialWebtopData(webtopData);
    models.setApplicationData(listingData);

    $controller('ApplicationToolbarCtrl', {$scope: scope});

    // For testing $rootScope events
    spyOn($rootScope, '$broadcast').and.callThrough();

    $rootScope.$apply();
  }));

  it('should expose $scope.apps', function() {
    expect(scope.apps).toBeDefined();
  });

});
