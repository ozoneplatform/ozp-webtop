'use strict';

describe('Service: models', function () {

  beforeEach(function() {
    angular.mock.module('ozpWebtop.constants', function($provide) {
      $provide.constant('useIwc', false);
    });
  });

  // load the service's module
  beforeEach(module('ozpWebtop.models'));

  // Dashboards service
  var models, appLibraryData, rootScope, $httpBackend, $window, $interval;

  beforeEach(inject(function ($rootScope, _models_, _$httpBackend_, _$window_, _$interval_) {

    rootScope = $rootScope.$new();

    models = _models_;

    $httpBackend = _$httpBackend_;

    $window = _$window_;

    $interval = _$interval_;

    $httpBackend.when('PUT', $window.OzoneConfig.API_URL + '/api/self/data/dashboard-data/')
                            .respond({});

    jasmine.getJSONFixtures().fixturesPath='base/testData';

    var webtopData = getJSONFixture('WebtopData.json');
    models.setInitialWebtopData(webtopData);
    appLibraryData = getJSONFixture('ApplicationLibrary.json');

  }));

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                      Data retrieval
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Get all dashboard data
  it('should have a getWebtopData method', function() {
    var dashboardData = models.getWebtopData();
    expect(dashboardData.user).toBeDefined();
    expect(dashboardData.name).toBeDefined();
    expect(dashboardData.currentDashboard).toBeDefined();
    expect(dashboardData.dashboards).toBeDefined();
  });

  // Get all dashboards
  it('should have a getDashboards method', function() {
    var dashboards = models.getDashboards();
    expect(dashboards.length).toBeGreaterThan(1);
    var dashboard = dashboards[0];
    expect(dashboard.name).toBeDefined();
    expect(dashboard.id).toBeDefined();
    expect(dashboard.layout).toBeDefined();
    expect(dashboard.frames).toBeDefined();

    var frame0 = dashboard.frames[0];
    expect(frame0.appId).toBeDefined();
    expect(frame0.id).toBeDefined();

    expect(frame0.gridLayout).toBeDefined();
    expect(frame0.gridLayout.sm.row).toBeDefined();
    expect(frame0.gridLayout.sm.col).toBeDefined();
    expect(frame0.gridLayout.sm.sizeX).toBeDefined();
    expect(frame0.gridLayout.sm.sizeY).toBeDefined();

    expect(frame0.gridLayout.md.row).toBeDefined();
    expect(frame0.gridLayout.md.col).toBeDefined();
    expect(frame0.gridLayout.md.sizeX).toBeDefined();
    expect(frame0.gridLayout.md.sizeY).toBeDefined();

    expect(frame0.desktopLayout).toBeDefined();
    expect(frame0.desktopLayout.zIndex).toBeDefined();
    expect(frame0.desktopLayout.top).toBeDefined();
    expect(frame0.desktopLayout.left).toBeDefined();
    expect(frame0.desktopLayout.width).toBeDefined();
    expect(frame0.desktopLayout.height).toBeDefined();
  });

  // Get a single dashboard
  it('should have a getDashboardById method', function() {
    var dashboard0 = models.getDashboardById(0);
    expect(dashboard0.id).toEqual('0');
  });

  it('should have a getDashboardById method that accepts strings', function() {
    // it should work if you pass in a string as well
    var dashboard0 = models.getDashboardById('0');
    expect(dashboard0.id).toEqual('0');
  });

  it('should have a getDashboardById method that returns null when not found', function() {
    // null is returned if no dashboard with given id is found
    var nullBoard = models.getDashboardById(9324);
    expect(nullBoard).toBeNull();
  });

  it('should have a getCurrentDashboard method', function() {
    var dashboard = models.getCurrentDashboard();
    expect(dashboard.id).toEqual('0');
  });

  // Get a single frame
  it('should have a getFrameById method', function() {
    var dashboard = models.getDashboardById(0);
    var frame = models.getFrameById(dashboard.frames[0].id);
    var sameFrame = dashboard.frames[0];
    expect(frame).toEqual(sameFrame);
  });

  // Get the name of the current dashboard
  it('should have a getCurrentDashboardName method', function() {
    var dashboardData = models.getWebtopData();
    var currentDashboardId = dashboardData.currentDashboard;
    var dashboard = models.getDashboardById(currentDashboardId);
    var name = models.getCurrentDashboardName();
    expect(name).toEqual(dashboard.name);
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                      Data creation
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


  it('should have a createDashboard method', function() {
    var dashboard = {};
    dashboard.name = 'My New Dashboard';
    var response = models.createDashboard(dashboard);
    expect(response).toEqual(true);
    var dashboards = models.getDashboards();
    var newBoard = {};
    for (var i=0; i < dashboards.length; i++) {
      if (dashboards[i].name === dashboard.name) {
        newBoard = dashboards[i];
      }
    }
    expect(newBoard.name).toEqual(dashboard.name);
    // TODO arbitrary based on test data
    expect(newBoard.id).toEqual('4');
    // current default is grid layout
    expect(newBoard.layout).toEqual('grid');
    expect(newBoard.frames).toEqual([]);
  });

  it('should have a createDashboard method that fails when name is empty', function() {
    var dashboard = {};
    dashboard.name = '';
    var response = models.createDashboard(dashboard);
    expect(response).toEqual(false);
  });

  it('should have a createDashboard method with desktop layout', function() {
    var dashboard = {};
    dashboard.name = 'My Second New Dashboard';
    dashboard.layout = 'desktop';
    var response = models.createDashboard(dashboard);
    expect(response).toEqual(true);
    var dashboards = models.getDashboards();
    var newBoard = {};
    for (var i=0; i < dashboards.length; i++) {
      if (dashboards[i].name === dashboard.name) {
        newBoard = dashboards[i];
      }
    }
    expect(newBoard.name).toEqual(dashboard.name);
    // TODO arbitrary based on test data
    expect(newBoard.id).toEqual('4');
    // current default is grid layout
    expect(newBoard.layout).toEqual('desktop');
    expect(newBoard.frames).toEqual([]);
  });
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                      Data updates
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // set all dashboards
  it('should have a setAllDashboards method', function() {
    var dashboards = models.getDashboards();
    // create a new dashboard
    dashboards[0].frames[0].appId = 'somethingdifferent';
    var response = models.setAllDashboards(dashboards);
    expect(response).toEqual(true);
    dashboards = models.getDashboards();
    expect(dashboards[0].frames[0].appId).toEqual('somethingdifferent');
  });

  // save a single dashboard
  it('should have a saveDashboard method', function() {
    expect(models.saveDashboard).toBeDefined();
  });

  // update the desktop layout of a frame
  it('should have a updateDesktopFrame method', function() {
    var dashboard = models.getDashboardById(0);
    var frame = dashboard.frames[0];
    var newLeft = 100;
    var newTop = 250;
    var newZIndex = 3;
    var newWidth = 100;
    var newHeight = 100;
    var update = models.updateDesktopFrame(frame.id, newLeft, newTop, newWidth, newHeight,
        newZIndex);
    expect(update).toEqual(true);
    frame = models.getFrameById(frame.id);
    expect(frame.desktopLayout.left).toEqual(newLeft);
    expect(frame.desktopLayout.top).toEqual(newTop);
    expect(frame.desktopLayout.zIndex).toEqual(newZIndex);
    expect(frame.desktopLayout.width).toEqual(newWidth);
    expect(frame.desktopLayout.height).toEqual(newHeight);
  });

    // dashboard name can not be empty string
  it('Dashboard name can not be empty string', function() {
    var dashboardOld = models.getDashboardById(0);
    var dashboard = models.getDashboardById(0);
    dashboard.name = '';
    var update = models.updateDashboard(dashboard);
    var dashboardNew = models.getDashboardById(0);
    expect(update).toEqual(false);
    expect(dashboardNew).toEqual(dashboardOld);
  });

  it('should have a updateDesktopFrame method that returns false on invalid frame id', function() {
    // update should fail on invalid frame id
    var newLeft = 100;
    var newTop = 250;
    var newZIndex = 3;
    var oldDashboardData = models.getWebtopData();
    var update = models.updateGridFrame('asdfkjk43222222', newLeft, newTop,
        newZIndex);
    var newDashboardData = models.getWebtopData();
    expect(update).toEqual(false);
    expect(oldDashboardData).toEqual(newDashboardData);
  });

  // update the grid layout of a frame
  it('should have a updateGridFrame method', function() {
    var dashboard = models.getDashboardById(0);
    var frame = dashboard.frames[0];
    var newRow = 4;
    var newCol = 3;
    var newSizeX = 2;
    var newSizeY = 1;
    var frameData = {
      'sm': {
        'row': 1,
        'col': 1,
        'sizeX': 1,
        'sizeY': 2
      },
      'md': {
        'row': newRow,
        'col': newCol,
        'sizeX': newSizeX,
        'sizeY': newSizeY
      }
    };

    var update = models.updateGridFrame(frame.id, frameData);
    expect(update).toEqual(frame.id);
    frame = models.getFrameById(frame.id);
    expect(frame.gridLayout.md.row).toEqual(newRow);
    expect(frame.gridLayout.md.col).toEqual(newCol);
    expect(frame.gridLayout.md.sizeX).toEqual(newSizeX);
    expect(frame.gridLayout.md.sizeY).toEqual(newSizeY);

    expect(frame.gridLayout.sm.row).toEqual(1);
    expect(frame.gridLayout.sm.col).toEqual(1);
    expect(frame.gridLayout.sm.sizeX).toEqual(1);
    expect(frame.gridLayout.sm.sizeY).toEqual(2);
  });

  it('should have a updateGridFrame method that works in a loop', function() {
    var doUpdate = function (frameId) {
      var newRow = 4;
      var newCol = 3;
      var newSizeX = 5;
      var newSizeY = 5;
      var frameData = {
        'sm': {
          'row': 1,
          'col': 0,
          'sizeX': 2,
          'sizeY': 2
        },
        'md': {
          'row': newRow,
          'col': newCol,
          'sizeX': newSizeX,
          'sizeY': newSizeY
        }
      };
      var update =  models.updateGridFrame(frameId, frameData);
      expect(update).toEqual(frameId);
      var frame = models.getFrameById(frameId);
      expect(frame.gridLayout.md.sizeX).toEqual(newSizeX);
      expect(frame.gridLayout.md.sizeY).toEqual(newSizeY);
      expect(frame.gridLayout.sm.sizeX).toEqual(2);
      expect(frame.gridLayout.sm.sizeY).toEqual(2);
    };

    var dashboard = models.getDashboardById(0);
    var frames = dashboard.frames;

    for (var i=0; i < frames.length; i++) {
      doUpdate(frames[i].id);
    }

  });

  it('should have a updateGridFrame method and return false on invalid frame', function() {
    // update should fail on invalid frame id
    var newRow = 4;
    var newCol = 3;
    var newSizeX = 2;
    var newSizeY = 1;
    var oldDashboardData = models.getWebtopData();
    var update = models.updateGridFrame('asdfkjk43222222', newRow, newCol,
        newSizeX, newSizeY);
    expect(update).toEqual(false);
    var newDashboardData = models.getWebtopData();
    expect(oldDashboardData).toEqual(newDashboardData);
  });

  // update the layout type of a dashboard
  it('should have a updateLayoutType method and return false on invalid layout type', function() {
    // method should return false unless passed 'grid' or 'desktop'
    var update = models.updateLayoutType(0, 'gridster');
    expect(update).toEqual(false);
  });

  it('should have a updateLayout method and return false on invalid layout type', function() {
    var update = models.updateLayoutType(0, 'desktopy');
    expect(update).toEqual(false);
  });

  it('should have a updateLayout method and support desktop layout', function() {
    var update = models.updateLayoutType(0, 'desktop');
    var dashboard = models.getDashboardById(0);
    var newLayout = dashboard.layout;
    expect(newLayout).toEqual('desktop');
    expect(update).toEqual(true);
  });

  it('should have a updateLayout method and support grid layout', function() {
    var update = models.updateLayoutType(0, 'grid');
    var dashboard = models.getDashboardById(0);
    var newLayout = dashboard.layout;
    expect(newLayout).toEqual('grid');
    expect(update).toEqual(true);
  });


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                      Data removal
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // remove a frame from a dashboard
  it('should have a removeFrame method', function() {
    var dashboards = models.getDashboards();
    var origFrames = dashboards[0].frames;
    var originalFrameCount = origFrames.length;
    var removed = models.removeFrame(origFrames[0].id);
    expect(removed).toEqual(true);
    dashboards = models.getDashboards();
    var newFrames = dashboards[0].frames;
    expect(originalFrameCount).toEqual(newFrames.length+1);
    // make sure it removed the correct frame
    for (var i=0; i < newFrames.length; i++) {
      expect(newFrames[i].id).not.toEqual(origFrames[0].id);
    }
  });

  // remove a dashboard
  it('should have a removeDashboard method', function() {
    var dashboards = models.getDashboards();
    var origDashboardCount = dashboards.length;
    var dashboardRemoved = dashboards[1].id;
    var removed = models.removeDashboard('1');
    dashboards = models.getDashboards();
    expect(removed).toEqual(true);
    expect(origDashboardCount).toEqual(dashboards.length+1);
    for (var i=0; i < dashboards.length; i++) {
      expect(dashboards[i].id).not.toEqual(dashboardRemoved);
    }
  });

  it('should return false for removeDashboard that doesnt exist', function() {
    var removed = models.removeDashboard(218384);
    expect(removed).toEqual(false);
  });

  it('should have a toggleFrameKey method', function() {
    var dashboard = models.getDashboardById(0);
    var frameId = dashboard.frames[0].id;
    // frame default state is to not be minimized or maximized
    // isMinimized expect first pass to set as true (minimized)
    var resp = models.toggleFrameKey(frameId, 'isMinimized');
    expect(resp).toEqual(true);
    var updatedDashboard = models.getDashboardById(0);
    expect (updatedDashboard.frames[0].isMinimized).toEqual(true);
    // isMinimized expect second pass to set as false (minimized)
    resp = models.toggleFrameKey(frameId, 'isMinimized');
    expect(resp).toEqual(false);
    updatedDashboard = models.getDashboardById(0);
    expect(updatedDashboard.frames[0].isMinimized).toEqual(false);
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                      Misc
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // combine dashboard data with application data
  xit('should have a mergeApplicationData method', function() {
    // build marketplace apps
    var dashboard = models.getDashboardById(0);
    var frames = dashboard.frames;
    var marketplaceApps = [];
    for (var i=0; i < frames.length; i++) {
      var app = {
        'name': 'appName' + i,
        'id': frames[i].appId,
        'description': 'This app does stuff' + i,
        'descriptionShort': 'This app does stuff' + i,
        'type': 'application',
        'state': 'active',
        'uiHints': {
          'width': 200,
          'height': 200,
          'singleton': true
        },
        'tags': [
          'demo',
        ],
        'intents': [

        ],
        'icons': {
          'small': '/icon/small/' + i,
          'large': '/icon/large/' + i
        },
        'screenShots': [

        ],
        'launchUrls': {
          'default': 'http://url/of/app/' + i,
          'test': ''

        },
        '_links': {

        }
      };
      marketplaceApps.push(app);
    }

    models.mergeApplicationData(frames);

    for (var j=0; j < frames.length; j++) {
      expect(frames[j].name).toEqual('appName' + j);
      expect(frames[j].icon.small).toEqual('/icon/small/' + j);
      expect(frames[j].icon.large).toEqual('/icon/large/' + j);

      expect(frames[j].descriptionShort).toEqual('This app does stuff' + j);
      expect(frames[j].url).toEqual('http://url/of/app/' + j);
      expect(frames[j].trustedUrl).toBeDefined();
      expect(frames[j].singleton).toEqual(true);
    }
  });

  it('should have a getNewDashboardId method', function() {
    // TODO: better test - this assumes we have 4 existing boards (0,1,2, and 3)
    // expect(models.getNewDashboardId()).toEqual(4);

    var newDashboardId;

    var response = models.getNewDashboardId();
    newDashboardId = response;
    expect(newDashboardId).toEqual('4');
  });

  it('should have a getUserSettings method', function() {
    var userSettings = models.getUserSettings();
    expect(userSettings.fullScreenMode).toEqual(false);
  });

  it('should have an updateAllUserSettings method', function() {
    var userSettings = {'key1': 'value1', 'key2': 'value2'};
    models.updateAllUserSettings(userSettings);
    var newSettings = models.getUserSettings();
    expect(newSettings.key1).toEqual('value1');
    expect(newSettings.key2).toEqual('value2');
  });

  it('should have an updateUserSettingByKey method', function() {
    var userSettings = {'key1': 'value1', 'key2': 'value2'};
    models.updateAllUserSettings(userSettings);
    var newSettings = models.getUserSettings();
    expect(newSettings.key1).toEqual('value1');
    models.updateUserSettingByKey('key1', 'newval');

    expect(models.getUserSettings().key1).toEqual('newval');
  });

  it('should have a setApplicationData method', function() {
    models.setApplicationData({});
    var apps = models.getApplicationData();
    expect(apps.length).toEqual(0);
    // now set it with real data
    models.setApplicationData(appLibraryData);
    var firstApp = models.getApplicationData()[0];
    expect(firstApp.uiHints.singleton).toEqual(false);
  });

});
