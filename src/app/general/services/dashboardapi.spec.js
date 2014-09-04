'use strict';

describe('Service: dashboardApi', function () {
  // load the service's module
  beforeEach(module('ozpWebtopApp'));

  // Dashboards service
  var httpBackend, dashboardApi;
  beforeEach(inject(function ($httpBackend, _dashboardApi_) {
    dashboardApi = _dashboardApi_;
    dashboardApi.createExampleDashboards();
    httpBackend = $httpBackend;
  }));

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                      Data retrieval
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Get all dashboard data
  it('should have a getDashboardData method', function() {
    var dashboardData = dashboardApi.getDashboardData();
    expect(dashboardData.user).toBeDefined();
    expect(dashboardData.name).toBeDefined();
    expect(dashboardData.defaultDashboard).toBeDefined();
    expect(dashboardData.dashboards).toBeDefined();
  });

  // Get all dashboards
  it('should have a getDashboards method', function() {
    var dashboards = dashboardApi.getDashboards();
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
    expect(frame0.gridLayout.row).toBeDefined();
    expect(frame0.gridLayout.col).toBeDefined();
    expect(frame0.gridLayout.sizeX).toBeDefined();
    expect(frame0.gridLayout.sizeY).toBeDefined();

    expect(frame0.desktopLayout).toBeDefined();
    expect(frame0.desktopLayout.zIndex).toBeDefined();
    expect(frame0.desktopLayout.top).toBeDefined();
    expect(frame0.desktopLayout.left).toBeDefined();
    expect(frame0.desktopLayout.width).toBeDefined();
    expect(frame0.desktopLayout.height).toBeDefined();
  });

  // Get a single dashboard
  it('should have a getDashboardById method', function() {
    var dashboard0 = dashboardApi.getDashboardById(0);
    expect(dashboard0.id).toEqual(0);

    // it should work if you pass in a string as well
    dashboard0 = dashboardApi.getDashboardById('0');
    expect(dashboard0.id).toEqual(0);

    // null is returned if no dashboard with given id is found
    expect(dashboardApi.getDashboardById(9324)).toBeNull();
  });

  // Get a single frame
  it('should have a getFrameById method', function() {
    var dashboard = dashboardApi.getDashboardById(0);
    var frame = dashboardApi.getFrameById(dashboard.frames[0].id);
    var sameFrame = dashboard.frames[0];
    expect(frame).toEqual(sameFrame);
  });

  // Get the size of a frame on grid layout (in pixels)
  it('should have a getFrameSizeOnGrid method', function() {
    var frame = dashboardApi.getDashboardById(0).frames[0];
    var frameSize = dashboardApi.getFrameSizeOnGrid(frame.id);
    // Since these values are dynamically generated, they will be undefined
    // at first
    expect(frameSize.width).not.toBeDefined();
    expect(frameSize.height).not.toBeDefined();

    frame.gridLayout.width = 120;
    frame.gridLayout.height = 120;
    dashboardApi.saveFrame(frame);

    frameSize = dashboardApi.getFrameSizeOnGrid(frame.id);
    expect(frameSize.width).toBeDefined();
    expect(frameSize.height).toBeDefined();

  });

  // Get the name of the default dashbard
  it('should have a getDefaultDashboardName method', function() {
    var dashboardData = dashboardApi.getDashboardData();
    var defaultDashboardId = dashboardData.defaultDashboard;
    var dashboard = dashboardApi.getDashboardById(defaultDashboardId);
    var name = dashboardApi.getDefaultDashboardName();
    expect(name).toEqual(dashboard.name);
  });


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                      Data creation
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  it('should have a createFrame method', function() {
    var dashboardId = 0;
    var appId = '12345678';
    var gridMaxRows = 10;
    var frame = dashboardApi.createFrame(dashboardId, appId, gridMaxRows);

    // Check that the frame returned has also been saved in the dashboard
    var frameFromBoard = dashboardApi.getFrameById(frame.id);
    expect(frame).toEqual(frameFromBoard);

    // Generated frameId should be a uuid
    var re = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/;
    expect(frame.id.match(re)).not.toBeNull();

    expect(frame.appId).toEqual(appId);
    // TODO: test this better - row should be one greater than the currently
    // used row
    expect(frame.gridLayout.row).toEqual(2);
    expect(frame.gridLayout.col).toEqual(0);
    expect(frame.gridLayout.sizeX).toEqual(1);
    expect(frame.gridLayout.sizeY).toEqual(1);

    // Nothing special about these values, just what they happen to be right now
    expect(frame.desktopLayout.zIndex).toEqual(0);
    expect(frame.desktopLayout.top).toEqual(100);
    expect(frame.desktopLayout.left).toEqual(100);
    expect(frame.desktopLayout.width).toEqual(200);
    expect(frame.desktopLayout.height).toEqual(200);

    // If all the rows in the grid are used up, this should return null and
    // add nothing to the dashboard
    gridMaxRows = 1;
    var framesBefore = dashboardApi.getDashboardById(dashboardId).frames.length;
    frame = dashboardApi.createFrame(dashboardId, appId, gridMaxRows);
    var framesAfter = dashboardApi.getDashboardById(dashboardId).frames.length;
    expect(frame).toBeNull();
    expect(framesBefore).toEqual(framesAfter);
  });

  it('should have a createDashboard method', function() {
    var name = 'My New Dashboard';
    dashboardApi.createDashboard(name);
    var dashboards = dashboardApi.getDashboards();
    var newBoard = {};
    for (var i=0; i < dashboards.length; i++) {
      if (dashboards[i].name === name) {
        newBoard = dashboards[i];
      }
    }
    expect(newBoard.name).toEqual(name);
    // TODO arbitrary based on test data
    expect(newBoard.id).toEqual(4);
    // current default is grid layout
    expect(newBoard.layout).toEqual('grid');
    expect(newBoard.frames).toEqual([]);
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                      Data updates
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // save all dashboard data
  it('should have a "private" setDashboardData method', function() {
    expect(dashboardApi._setDashboardData).toBeDefined();
  });

  // set all dashboards
  it('should have a setAllDashboards method', function() {
    var dashboards = dashboardApi.getDashboards();
    // create a new dashboard
    dashboards[0].frames[0].appId = 'somethingdifferent';
    dashboardApi.setAllDashboards(dashboards);

    dashboards = dashboardApi.getDashboards();
    expect(dashboards[0].frames[0].appId).toEqual('somethingdifferent');
  });

  // save a single dashboard
  it('should have a saveDashboard method', function() {
    expect(dashboardApi.saveDashboard).toBeDefined();
  });

  // save a single frame inside a dashboard
  it('should have a saveFrame method', function() {
    // create a new frame and save to dashboard
    var dashboardId = 0;
    var appId = '12345678';
    var gridMaxRows = 10;
    var newFrame = dashboardApi.createFrame(dashboardId, appId, gridMaxRows);

    // modify new frame and save
    newFrame.appId = '98765';
    newFrame.gridLayout.sizeY = 4;
    var frameSaved = dashboardApi.saveFrame(newFrame);

    // verify frame was saved in dashboard
    var frameInBoard = dashboardApi.getFrameById(newFrame.id);
    expect(frameInBoard).toEqual(newFrame);
    expect(frameSaved).toEqual(true);

    // if a frameid is given that does not match any frames in the user's
    // dashboards, false is returned and no update is performed
    var dashboardsBefore = dashboardApi.getDashboards();
    newFrame.id = '3848583992';
    frameSaved = dashboardApi.saveFrame(newFrame);
    var dashboardsAfter = dashboardApi.getDashboards();
    expect(frameSaved).toEqual(false);
    expect(dashboardsBefore).toEqual(dashboardsAfter);
  });

  // update the frame size (in pixels) on grid layout
  it('should have a updateFrameSizeOnGrid method', function() {
    var frame = dashboardApi.getDashboardById(0).frames[0];
    var width = 120, height = 240;
    dashboardApi.updateFrameSizeOnGrid(frame.id, width, height);
    frame = dashboardApi.getFrameById(frame.id);
    expect(frame.gridLayout.width).toEqual(width);
    expect(frame.gridLayout.height).toEqual(height);
  });

  // update the default dashboard
  it('should have a updateDefaultDashboardName method', function() {
    var currentDefaultDashboard = dashboardApi.getDefaultDashboardName();
    expect(dashboardApi.updateDefaultDashboardName('doesntexist')).toEqual(false);
    var newDefault = dashboardApi.getDashboardById(1).name;
    expect(currentDefaultDashboard).not.toEqual(newDefault);
    expect(newDefault).toBeTruthy();
    var update = dashboardApi.updateDefaultDashboardName(newDefault);
    expect(update).toEqual(true);
    expect(dashboardApi.getDefaultDashboardName()).toEqual(newDefault);
  });

  // update the desktop layout of a frame
  it('should have a updateDesktopFrame method', function() {
    var frame = dashboardApi.getDashboardById(0).frames[0];
    var newLeft = 100;
    var newTop = 250;
    var newZIndex = 3;

    var update = dashboardApi.updateDesktopFrame(frame.id, newLeft, newTop,
      newZIndex);
    expect(update).toEqual(true);
    frame = dashboardApi.getFrameById(frame.id);
    expect(frame.desktopLayout.left).toEqual(newLeft);
    expect(frame.desktopLayout.top).toEqual(newTop);
    expect(frame.desktopLayout.zIndex).toEqual(newZIndex);

    // update should fail on invalid frame id
    var oldDashboardData = dashboardApi.getDashboardData();
    update = dashboardApi.updateGridFrame('asdfkjk43222222', newLeft, newTop,
      newZIndex);
    var newDashboardData = dashboardApi.getDashboardData();

    expect(update).toEqual(false);
    expect(oldDashboardData).toEqual(newDashboardData);
  });

  // update the grid layout of a frame
  it('should have a updateGridFrame method', function() {
    var frame = dashboardApi.getDashboardById(0).frames[0];
    var newRow = 4;
    var newCol = 3;
    var newSizeX = 2;
    var newSizeY = 1;
    var update = dashboardApi.updateGridFrame(frame.id, newRow, newCol,
      newSizeX, newSizeY);
    expect(update).toEqual(true);
    frame = dashboardApi.getFrameById(frame.id);
    expect(frame.gridLayout.row).toEqual(newRow);
    expect(frame.gridLayout.col).toEqual(newCol);
    expect(frame.gridLayout.sizeX).toEqual(newSizeX);
    expect(frame.gridLayout.sizeY).toEqual(newSizeY);

    // update should fail on invalid frame id
    var oldDashboardData = dashboardApi.getDashboardData();
    update = dashboardApi.updateGridFrame('asdfkjk43222222', newRow, newCol,
      newSizeX, newSizeY);
    var newDashboardData = dashboardApi.getDashboardData();

    expect(update).toEqual(false);
    expect(oldDashboardData).toEqual(newDashboardData);
  });

  // update the layout type of a dashboard
  it('should have a updateLayoutType method', function() {
    // method should return false unless passed 'grid' or 'desktop'
    expect(dashboardApi.updateLayoutType(0, 'gridster')).toEqual(false);
    expect(dashboardApi.updateLayoutType(0, 'desktopy')).toEqual(false);

    var update = dashboardApi.updateLayoutType(0, 'desktop');
    var newLayout = dashboardApi.getDashboardById(0).layout;
    expect(newLayout).toEqual('desktop');
    expect(update).toEqual(true);

    update = dashboardApi.updateLayoutType(0, 'grid');
    newLayout = dashboardApi.getDashboardById(0).layout;
    expect(newLayout).toEqual('grid');
    expect(update).toEqual(true);
  });


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                      Data removal
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // remove a frame from a dashboard
  it('should have a removeFrame method', function() {
    var dashboards = dashboardApi.getDashboards();
    var origFrames = dashboards[0].frames;
    var originalFrameCount = origFrames.length;
    dashboardApi.removeFrame(origFrames[0].id);
    var newFrames = dashboardApi.getDashboards()[0].frames;
    expect(originalFrameCount).toEqual(newFrames.length+1);

    // make sure it removed the correct frame
    for (var i=0; i < newFrames.length; i++) {
      expect(newFrames[i].id).not.toEqual(origFrames[0].id);
    }
  });

  // remove a dashboard
  it('should have a removeDashboard method', function() {
    var dashboards = dashboardApi.getDashboards();
    var origDashboardCount = dashboards.length;
    var dashboardRemoved = dashboards[1].id;
    var removed = dashboardApi.removeDashboard(1);
    dashboards = dashboardApi.getDashboards();
    expect(removed).toEqual(true);
    expect(origDashboardCount).toEqual(dashboards.length+1);
    for (var i=0; i < dashboards.length; i++) {
      expect(dashboards[i].id).not.toEqual(dashboardRemoved);
    }

    removed = dashboardApi.removeDashboard(218384);
    expect(removed).toEqual(false);

  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                      Misc
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // combine dashboard data with application data
  it('should have a mergeApplicationData method', function() {
    // build marketplace apps
    var frames = dashboardApi.getDashboardById(0).frames;
    var marketplaceApps = [];
    for (var i=0; i < frames.length; i++) {
      var app = {
        'id': frames[i].appId,
        'icon': '/icon/' + i,
        'name': 'appName' + i,
        'shortDescription': 'This app does stuff' + i,
        'url': 'http://url/of/app/' + i
      };
      marketplaceApps.push(app);
    }

    dashboardApi.mergeApplicationData(frames, marketplaceApps);

    for (var j=0; j < frames.length; j++) {
      expect(frames[j].icon).toEqual('/icon/' + j);
      expect(frames[j].name).toEqual('appName' + j);
      expect(frames[j].shortDescription).toEqual('This app does stuff' + j);
      expect(frames[j].url).toEqual('http://url/of/app/' + j);
    }
  });

  // determine if an application exists in a dashboard
  it('should have a isAppOnDashboard method', function() {
    expect(dashboardApi.isAppOnDashboard(0,'nothere')).toEqual(false);
    var validAppId = dashboardApi.getDashboardById(0).frames[0].appId;
    expect(dashboardApi.isAppOnDashboard(0, validAppId)).toEqual(true);
  });

  it('should have a getNewDashboardId method', function() {
    // TODO: better test - this assumes we have 4 existing boards (0,1,2, and 3)
    expect(dashboardApi.getNewDashboardId()).toEqual(4);
  });

});