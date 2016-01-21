'use strict';

describe('Service: widget', function () {

  beforeEach(function() {
    angular.mock.module('ozpWebtop.models', function($provide) {
      $provide.constant('useIwc', false);
    });
  });

  // load the service's module
  beforeEach(module('ozpWebtop.models'));
  beforeEach(module('ozpWebtop.services.widgets'));

  // Dashboards service
  var models, appLibraryData, rootScope, $httpBackend, $window, $interval, widgets;

  beforeEach(inject(function ($rootScope, _models_, _$httpBackend_, _$window_, _$interval_, _widgetService_) {

    rootScope = $rootScope.$new();

    models = _models_;

    $httpBackend = _$httpBackend_;

    $window = _$window_;

    $interval = _$interval_;

    widgets = _widgetService_;

    $httpBackend.when('PUT', $window.OzoneConfig.API_URL + '/api/self/data/dashboard-data/')
                            .respond({});

    jasmine.getJSONFixtures().fixturesPath='base/testData';

    var webtopData = getJSONFixture('WebtopData.json');
    models.setInitialWebtopData(webtopData);
    appLibraryData = getJSONFixture('ApplicationLibrary.json');

  }));
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                      Data creation
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  it('should have a createFrame method', function() {
    // need application data set for this test
    models.setApplicationData(appLibraryData);
    var dashboardId = 1;
    var appId = '12345678';
    var frame = widgets.createFrame(dashboardId, appId);
    var frameFromBoard = models.getFrameById(frame.id);
    // Check that the frame returned has also been saved in the dashboard
    expect(frame).toEqual(frameFromBoard);
    // Generated frameId should be a uuid
    var re = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/;
    expect(frame.id.match(re)).not.toBeNull();

    expect(frame.appId).toEqual(appId);
    // TODO: test this better - row should be one greater than the currently
    // used row
    // expect(frame.gridLayout.sm.row).toEqual(5);
    expect(frame.gridLayout.sm.col).toEqual(0);
    expect(frame.gridLayout.sm.sizeX).toEqual(3);
    expect(frame.gridLayout.sm.sizeY).toEqual(1);

    // expect(frame.gridLayout.md.row).toEqual(4);
    expect(frame.gridLayout.md.col).toEqual(0);
    expect(frame.gridLayout.md.sizeX).toEqual(2);
    expect(frame.gridLayout.md.sizeY).toEqual(2);

    // Nothing special about these values, just what they happen to be right now
    expect(frame.desktopLayout.zIndex).toBeGreaterThan(0);
    expect(frame.desktopLayout.top >= 75).toBeTruthy();
    expect(frame.desktopLayout.left >= 75).toBeTruthy();
    expect(frame.desktopLayout.width).toEqual(250);
    expect(frame.desktopLayout.height).toEqual(250);
  });

  // determine if an application exists in a dashboard
  it('should have a isAppOnDashboard method', function() {
    var dashboard = models.getDashboardById(0);
    var validAppId = dashboard.frames[0].appId;
    var appFound = widgets.isAppOnDashboard(0, validAppId);
    expect(appFound).toEqual(true);
  });

  it('should return false when isAppOnDashboard is given an invalid id', function() {
    var appFound = widgets.isAppOnDashboard(0, 'nothere');
    expect(appFound).toEqual(false);
  });

});
