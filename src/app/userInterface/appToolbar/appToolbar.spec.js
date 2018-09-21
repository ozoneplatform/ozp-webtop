'use strict';

describe('App Toolbar', function () {
  var models;
  var scope;

  // use IWC for tests?
  beforeEach(function() {
    angular.mock.module('ozpWebtop.constants', function($provide) {
      $provide.constant('useIwc', false);
    });
  });

  // load the filter's module
  beforeEach(module('ozpWebtop.appToolbar'));

  beforeEach(inject(function($injector, $rootScope, $controller, $httpBackend, $window) {
    models = $injector.get('models');
    scope = $rootScope.$new();

    $httpBackend.when('PUT', $window.OzoneConfig.API_URL + '/api/self/data/dashboard-data/')
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

  describe('#toggleFrameMinimized', function() {
    beforeEach(function() {
      spyOn(models, 'toggleFrameKey');
    });

    it('should call `toggleFrameKey` on the models service with the app\'s ID', function() {
      scope.toggleFrameMinimized({ id: 'my-frame' });
      expect(models.toggleFrameKey).toHaveBeenCalledWith('my-frame', 'isMinimized');
    });

    it('should emit a dashboardStateChangedEvent', inject(function($rootScope, dashboardStateChangedEvent) {
      scope.toggleFrameMinimized({ id: 'another-frame' });

      expect($rootScope.$broadcast).toHaveBeenCalledWith(dashboardStateChangedEvent, {
        dashboardId: scope.currentDashboard.id,
        layout: scope.currentDashboard.layout
      });
    }));
  });

});
