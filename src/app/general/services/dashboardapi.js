'use strict';

var app = angular.module('ozpWebtopApp.apis');

// TODO: put this somewhere better
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

app.service('localStorageDashboardApiImpl', function($http, LocalStorage, Utilities) {
  var cache = new LocalStorage(localStorage, JSON);

  this.getDashboardData = function() {
    if (!cache.hasItem('dashboards')) {
      // TODO: handle error
      console.log('ERROR: No dashboards');
      return null;
    }
    var dashboards = cache.getItem('dashboards');
    return dashboards;
  };

  this.getDashboards = function() {
    var dashboardData = this.getDashboardData();
    if (dashboardData) {
      return dashboardData.dashboards;
    } else {
      return null;
    }
  };

  this._setDashboardData = function(dashboardData) {
    cache.removeItem('dashboards');
    cache.setItem('dashboards', dashboardData);
  };

  this.setAllDashboards = function(dashboards) {
    var dashboardData = this.getDashboardData();
    dashboardData.dashboards = dashboards;
    this._setDashboardData(dashboardData);
  };

  // Update dashboard layout
  // @param layout should be 'grid' or 'desktop'
  this.updateLayoutType = function(dashboardId, layout) {
    var validInputs = ['grid', 'desktop'];
    if (validInputs.indexOf(layout) === -1) {
      return false;
    }

    var dashboard = this.getDashboardById(dashboardId);
    dashboard.layout = layout;
    this.saveDashboard(dashboard);
    return true;
  };

  // Update the grid layout of a frame in a dashboard
  this.updateGridFrame = function(frameId, row, col, sizeX, sizeY) {
    var frame = this.getFrameById(frameId);
    if (!frame) {
      return false;
    }
    frame.gridLayout.row = row;
    frame.gridLayout.col = col;
    frame.gridLayout.sizeX = sizeX;
    frame.gridLayout.sizeY = sizeY;
    this.saveFrame(frame);
    return true;
  };

  // Update the desktop layout of a frame in a dashboard
  // TODO: what about width and height?
  this.updateDesktopFrame = function(frameId, x, y, zIndex) {
    var frame = this.getFrameById(frameId);
    if (!frame) {
      return false;
    }
    frame.desktopLayout.left = x;
    frame.desktopLayout.top = y;
    frame.desktopLayout.zIndex = zIndex;
    this.saveFrame(frame);
    return true;
  };

  this.toggleFrameKey = function(frameId, key) {
    var frame = this.getFrameById(frameId);
    if (!frame) {
      return false;
    }
    if(frame[key]){
      frame[key] = false;
    }
    else {
      console.debug(typeof frame[key]);
      frame[key] = true;
    }
    this.saveFrame(frame);
    return frame[key];
  };
  
  // Check to see if an application is already on a given dashboard
  this.isAppOnDashboard = function(dashboardId, applicationId) {
    var dashboard = this.getDashboardById(dashboardId);
    for (var i=0; i < dashboard.frames.length; i++) {
      if (dashboard.frames[i].appId === applicationId) {
        return true;
      }
    }
    return false;
  };

  // Create a new frame in a dashboard for a given application
  // Creates a frame with with both grid and desktop layout data
  this.createFrame = function(dashboardId, appId, gridMaxRows) {
    var dashboard = this.getDashboardById(dashboardId);

    // Calculate the row to place this frame in (for grid layout)

    // for the grid layout, place new app in first col of first empty row
    // for the desktop layout, just put it on and let user move it
    var usedRows = [];
    for (var i=0; i < dashboard.frames.length; i++) {
      usedRows.push(dashboard.frames[i].gridLayout.row);
    }
    var maxUsedRow = Math.max.apply(Math, usedRows);
    var row = maxUsedRow + 1;
    if (row > gridMaxRows) {
      // TODO: handle error
      return null;
    }

    // by default, new frames will have minimal size
    var col = 0;
    var sizeX = 1;
    var sizeY = 1;

    // for the desktop layout, just put it on and let the user move it
    var zIndex = 0;
    var top = 100;
    var left = 100;
    var width = 200;
    var height = 200;


    var utils = new Utilities();
    var frameId = utils.generateUuid();

    // update the dashboard with this app
    var newApp = {
      'appId': appId,
      'id': frameId,
      'gridLayout': {
        'row': row,
        'col': col,
        'sizeX': sizeX,
        'sizeY': sizeY
      },
      'desktopLayout': {
        'zIndex': zIndex,
        'top': top,
        'left': left,
        'width': width,
        'height': height
      }
    };

    dashboard.frames.push(newApp);
    this.saveDashboard(dashboard);
    return newApp;
  };

  // Remove a frame from a dashboard
  this.removeFrame = function(frameId) {
    var dashboards = this.getDashboards();
    for (var i=0; i < dashboards.length; i++) {
      var frames = dashboards[i].frames;
      for (var j=0; j < frames.length; j++) {
        if (frameId === frames[j].id) {
          dashboards[i].frames.splice(j,1);
          this.saveDashboard(dashboards[i]);
          return true;
        }
      }
      return false;
    }
  };

  // Change the user's default dashboard
  this.updateDefaultDashboardName = function(dashboardName) {
    var dashboardData = this.getDashboardData();
    for (var i=0; i < dashboardData.dashboards.length; i++) {
      if (dashboardData.dashboards[i].name === dashboardName) {
        dashboardData.defaultDashboard = dashboardData.dashboards[i].id;
        this._setDashboardData(dashboardData);
        return true;
      }
    }
    return false;
  };

  // Return the name of the user's default dashboard
  this.getDefaultDashboardName = function() {
    var dashboards = this.getDashboardData();
    var defaultDashboardId = dashboards.defaultDashboard;
    for (var i=0; i < dashboards.dashboards.length; i++) {
      if (dashboards.dashboards[i].id === defaultDashboardId) {
        return dashboards.dashboards[i].name;
      }
    }
    return null;
  };

  // Augment the dashboard.frames data with application-specific data
  // Note: data is not persisted, but rather the 'frames' object
  //  is modified by reference
  this.mergeApplicationData = function(frames, marketplaceApps) {
    for (var i=0; i < marketplaceApps.length; i++) {
      // check if this app is on our dashboard
      for (var j=0; j < frames.length; j++) {
        if (frames[j].appId === marketplaceApps[i].id) {
          // if it is, then get all relevant info
          frames[j].icon = marketplaceApps[i].icon;
          frames[j].url = marketplaceApps[i].url;
          frames[j].name = marketplaceApps[i].name;
          frames[j].shortDescription = marketplaceApps[i].shortDescription;
        }
      }
    }
  };

  // Updates the dynamically generated fields for grid frame size in px
  this.updateFrameSizeOnGrid = function(frameId, width, height) {
    var frame = this.getFrameById(frameId);
    frame.gridLayout.width = width;
    frame.gridLayout.height = height;
    this.saveFrame(frame);
  };

  // Return the frame size (in px) for a given frame in the grid layout
  // Note that these values are dynamically generated
  this.getFrameSizeOnGrid = function(frameId) {
    var frame = this.getFrameById(frameId);
    var widgetSize = {};
    widgetSize.width = frame.gridLayout.width;
    widgetSize.height = frame.gridLayout.height;
    return widgetSize;
  };

  // Save a dashboard
  // TODO: make sure input is a valid dashboard:
  //  dashboard.id should be unique
  //  all frame.id's should be unique
  this.saveDashboard = function(dashboard) {
    var dashboards = this.getDashboards();
    for (var i=0; i < dashboards.length; i++) {
      if (dashboards[i].id === dashboard.id) {
        dashboards[i] = dashboard;
        this.setAllDashboards(dashboards);
        return true;
      }
    }
    return false;
  };

  // Save a frame in a dashboard
  // TODO: make sure input is a valid frame
  this.saveFrame = function(frame) {
    var dashboards = this.getDashboards();
    for (var i=0; i < dashboards.length; i++) {
      var frames = dashboards[i].frames;
      for (var j=0; j < frames.length; j++) {
        if (frames[j].id === frame.id) {
          dashboards[i].frames[j] = frame;
          this.setAllDashboards(dashboards);
          return true;
        }
      }
    }
    return false;
  };

  // Retrieve a frame by id
  this.getFrameById = function(frameId) {
    var dashboards = this.getDashboards();
    for (var i=0; i < dashboards.length; i++) {
      var frames = dashboards[i].frames;
      for (var j=0; j < frames.length; j++) {
        if (frames[j].id === frameId) {
          return frames[j];
        }
      }
    }
  };

  // Retrieve a dashboard by id
  this.getDashboardById = function(dashboardId) {
    var dashboards = this.getDashboards();
    for (var i=0; i < dashboards.length; i++) {
      if (dashboards[i].id.toString() === dashboardId.toString()) {
        return dashboards[i];
      }
    }
    return null;
  };

  // Delete a dashboard
  this.removeDashboard = function(dashboardId) {
    var dashboardData = this.getDashboardData();
    var dashboards = dashboardData.dashboards;
    for (var i=0; i < dashboards.length; i++) {
      if (dashboards[i].id.toString() === dashboardId.toString()) {
        dashboards.remove(i);
        this._setDashboardData(dashboardData);
        return true;
      }
    }
    return false;
  };

  // Create a new dashboard
  this.createDashboard = function(name) {
    var dashboardData = this.getDashboardData();
    // get new id for board
    var dashboardId = this.getNewDashboardId();
    var newBoard = {
      'name': name,
      'id': dashboardId,
      'layout': 'grid',
      'frames': [
      ]
    };
    var dashboards = this.getDashboards();
    dashboards.push(newBoard);
    dashboardData.dashboards = dashboards;
    this._setDashboardData(dashboardData);
  };

  // Get the next available id for a new dashboard
  // TODO: this assumes ids are integers and not uuids
  this.getNewDashboardId = function() {
    var dashboards = this.getDashboards();
    var existingIds = [];
    for (var i=0; i < dashboards.length; i++) {
      existingIds.push(Number(dashboards[i].id));
    }
    var newId = Math.max.apply(Math, existingIds) + 1;
    return newId;
  };

  this.createExampleDashboards = function() {
    // TODO: Originally this object was placed in a separate json file and fetched
    // via http, but that led to all sorts of issues with testing.
    var dashboardData = {
      'name': 'dashboards',
      'user': 'J Smith',
      'defaultDashboard': 0,
      'dashboards': [
        {
          'name': 'Stock Trader',
          'id': 0,
          'layout': 'grid',
          'frames': [
            {
              'appId': 'cd0e3e24-cae8-4886-a0d4-c7e04b5b104e', // Greek analysis
              'id': '2b585b22-5de9-4389-b536-57bcb602bf3a',
              'gridLayout': {
                'row': 0,
                'col': 0,
                'sizeX': 6,
                'sizeY': 1
              },
              'desktopLayout': {
                'zIndex': 0,
                'top': 200,
                'left': 100,
                'width': 200,
                'height': 200
              }
            },
            {
              'appId': 'f38e10db-eb3f-4b90-8ec5-cb0a7dbd9191', // Stock Trader
              'id': '3886bbea-0421-4a2a-9851-b8e1c6a59f5b',
              'gridLayout': {
                'row': 1,
                'col': 0,
                'sizeX': 3,
                'sizeY': 1
              },
              'desktopLayout': {
                'zIndex': 1,
                'top': 300,
                'left': 200,
                'width': 200,
                'height': 200
              }
            },
            {
              'appId': '00605b24-baff-4270-b0b5-2b6bd6455883', // Chart
              'id': 'fe9fd6bf-e7be-446a-8ab7-a3fc4ac279a8',
              'gridLayout': {
                'row': 1,
                'col': 3,
                'sizeX': 3,
                'sizeY': 2
              },
              'desktopLayout': {
                'zIndex': 0,
                'top': 125,
                'left': 400,
                'width': 200,
                'height': 200
              }
            }
          ] // end frames in dashboard
        },
        {
          'name': 'Simple Apps',
          'id': 1,
          'layout': 'grid',
          'frames': [
            {
              'appId': '342f3680-18c9-11e4-8c21-0800200c9a66', // purple circle
              'id': '45a08744-686b-4b14-820a-ebc8c24fbfb0',
              'gridLayout': {
                'row': 1,
                'col': 1,
                'sizeX': 1,
                'sizeY': 1
              },
              'desktopLayout': {
                'zIndex': 0,
                'top': 200,
                'left': 100,
                'width': 200,
                'height': 200
              }
            },
            {
              'appId': 'd9d3b477-7c21-4cab-bd9f-771ee9379be4', // red square
              'id': '59891c69-dde5-4926-b4b1-e53dac90b271',
              'gridLayout': {
                'row': 1,
                'col': 2,
                'sizeX': 1,
                'sizeY': 1
              },
              'desktopLayout': {
                'zIndex': 0,
                'top': 125,
                'left': 400,
                'width': 200,
                'height': 200
              }
            },
            {
              'appId': 'c3d895d5-f332-4154-b963-c5dd63f8ca49', // some text
              'id': '23baefc8-872a-4da4-84ed-e8fa62c09819',
              'gridLayout': {
                'row': 2,
                'col': 1,
                'sizeX': 1,
                'sizeY': 1
              },
              'desktopLayout': {
                'zIndex': 1,
                'top': 300,
                'left': 200,
                'width': 200,
                'height': 200
              }
            },
            {
              'appId': '34bc3505-5dcc-4609-bcd6-c014d9f27ce5', //mbrot
              'id': '8ca6dba0-b7bb-47e4-a1a1-06e451f9a0f1',
              'gridLayout': {
                'row': 2,
                'col': 2,
                'sizeX': 1,
                'sizeY': 1
              },
              'desktopLayout': {
                'zIndex': 1,
                'top': 250,
                'left': 500,
                'width': 200,
                'height': 200
              }
            }
          ] // end frames in dashboard
        },
        {
          'name': 'Just One Thing',
          'id': 2,
          'layout': 'desktop',
          'frames': [
            {
              'appId': '342f3680-18c9-11e4-8c21-0800200c9a66',
              'id': '04648023-6ab0-448d-83a1-bb378639237f',
              'gridLayout': {
                'col': 1,
                'row': 1,
                'sizeX': 3,
                'sizeY': 3
              },
              'desktopLayout': {
                'zIndex': 0,
                'top': 125,
                'left': 200,
                'width': 300,
                'height': 300
              }
            }
          ] // end frames in dashboard
        },
        {
          'name': 'Bouncing Balls',
          'id': 3,
          'layout': 'grid',
          'frames': [
            {
              'appId': '998437ef-9191-4d57-91a7-6ab049361583',
              'id': '6c84a76c-f149-4c4d-90a8-1df397ed588b',
              'gridLayout': {
                'col': 1,
                'row': 1,
                'sizeX': 1,
                'sizeY': 1
              },
              'desktopLayout': {
                'zIndex': 0,
                'top': 125,
                'left': 200,
                'width': 300,
                'height': 300
              }
            },
            {
              'appId': '3af849aa-dad0-4223-b15b-9da3b48d1845',
              'id': 'c951a160-0917-45cf-8c7f-a3748958ced1',
              'gridLayout': {
                'col': 2,
                'row': 1,
                'sizeX': 1,
                'sizeY': 1
              },
              'desktopLayout': {
                'zIndex': 0,
                'top': 125,
                'left': 700,
                'width': 300,
                'height': 300
              }
            },
            {
              'appId': 'e5f52929-3f00-4766-a820-f0452ff74572',
              'id': 'dad15d4a-0da1-4181-9e99-15c9197a0180',
              'gridLayout': {
                'col': 1,
                'row': 1,
                'sizeX': 1,
                'sizeY': 1
              },
              'desktopLayout': {
                'zIndex': 0,
                'top': 500,
                'left': 200,
                'width': 300,
                'height': 300
              }
            },
            {
              'appId': '93eb7a1d-618c-4478-a59e-326eccbe86d5',
              'id': '32769aa5-2c34-45e9-9a63-a155f3d77073',
              'gridLayout': {
                'col': 2,
                'row': 1,
                'sizeX': 1,
                'sizeY': 1
              },
              'desktopLayout': {
                'zIndex': 0,
                'top': 500,
                'left': 700,
                'width': 300,
                'height': 300
              }
            }
          ] // end frames in dashboard
        }
      ]
    };
    this._setDashboardData(dashboardData);
  };

});


app.service('iwcDashboardApiImpl', function(/*dependencies*/) {
  this.getDashboards = function() {};

  this._setDashboardData = function() {};

  this.updateCurrentDashboardLayoutType = function() {};

  this.updateCurrentDashboardGrid = function() {};

  this.updateCurrentDashboardDesktop = function() {};

  this.createExampleDashboards = function() {};
});


app.factory('dashboardApi', function($window, $injector) {
  // TODO: what to key off of to determine if IWC impl should be used?
  if ($window.iwc) {
    return $injector.get('iwcDashboardApiImpl');
  } else {
    return $injector.get('localStorageDashboardApiImpl');
  }
});