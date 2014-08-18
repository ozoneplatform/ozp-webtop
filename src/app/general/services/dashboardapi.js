'use strict';

var app = angular.module('ozpWebtopApp.apis');

app.service('localStorageDashboardApiImpl', function($http, LocalStorage) {
  var cache = new LocalStorage(localStorage, JSON);

  this.getAllDashboards = function() {
    if (!cache.hasItem('dashboards')) {
      // TODO: handle error
      console.log('ERROR: No dashboards');
      return {};
    }
    var dashboards = cache.getItem('dashboards');
    return dashboards;
  };

  this.setAllDashboards = function(dashboards) {
    cache.setItem('dashboards', dashboards);
  };

  // layout should be 'grid' or 'desktop'
  this.updateCurrentDashboardLayoutType = function(layout) {
    var dashboards = this.getAllDashboards();
    var currentDashboardIdx = dashboards.currentDashboardIndex;
    for (var i=0; i < dashboards.dashboards.length; i++) {
      if (dashboards.dashboards[i].index === currentDashboardIdx) {
        dashboards.dashboards[i].layout = layout;
      }
    }
    this.setAllDashboards(dashboards);
  };

  this.updateCurrentDashboardGrid = function(dashboardIndex, appUuid, row, col, sizeX, sizeY) {
    var dashboards = this.getAllDashboards();
    var dashboard = dashboards.dashboards[dashboardIndex];
    for (var i=0; i < dashboard.apps.length; i++) {
      if (dashboard.apps[i].uuid === appUuid) {
        dashboard.apps[i].gridLayout.row = row;
        dashboard.apps[i].gridLayout.col = col;
        dashboard.apps[i].gridLayout.sizeX = sizeX;
        dashboard.apps[i].gridLayout.sizeY = sizeY;
        this.setAllDashboards(dashboards);
      }
    }
  };

  this.updateCurrentDashboardDesktop = function(dashboardIndex, appUuid, x, y, zIndex) {
    var dashboards = this.getAllDashboards();
    var dashboard = dashboards.dashboards[dashboardIndex];
    for (var i=0; i < dashboard.apps.length; i++) {
      if (dashboard.apps[i].uuid === appUuid) {
        dashboard.apps[i].desktopLayout.left = x;
        dashboard.apps[i].desktopLayout.top = y;
        dashboard.apps[i].desktopLayout.zIndex = zIndex;
        this.setAllDashboards(dashboards);
        console.log('updated application ' + appUuid + ' on dashboard ' + dashboardIndex + ', x: ' + x + ', y: ' + y + ', zIndex: ' + zIndex);
      }
    }
  };

  this.isAppOnDashboard = function(dashboardIndex, appUuid) {
    var dashboards = this.getAllDashboards();
    var dashboard = dashboards.dashboards[dashboardIndex];
    for (var i=0; i < dashboard.apps.length; i++) {
      if (dashboard.apps[i].uuid === appUuid) {
        return true;
      }
    }
    return false;
  };

  this.addApplication = function(dashboardIndex, appUuid, gridMaxRows) {
    var dashboards = this.getAllDashboards();
    var dashboard = dashboards.dashboards[dashboardIndex];
    // for the grid layout, place new app in first col of first empty row
    // for the desktop layout, just put it on and let user move it
    var usedRows = [];
    for (var i=0; i < dashboard.apps.length; i++) {
      usedRows.push(dashboard.apps[i].gridLayout.row);
    }
    var maxUsedRow = Math.max.apply(Math, usedRows);
    var row = maxUsedRow + 1;
    if (row > gridMaxRows) {
      // TODO: handle error
      console.log('ERROR: not enough rows in grid');
    }
    var col = 0;
    var sizeX = 1;
    var sizeY = 1;

    // for the desktop layout, just put it on and let the user move it
    var zIndex = 0;
    var top = 100;
    var left = 100;
    var width = 200;
    var height = 200;

    // update the dashboard with this app
    var newApp = {
      'uuid': appUuid,
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

    console.log('adding app ' + appUuid + ' to dashboard ' + dashboard.index + ' at row ' + row + ', col ' + col);

    dashboard.apps.push(newApp);
    this.setAllDashboards(dashboards);
  };

  this.updateDefaultDashboard = function(dashboardName) {
    var dashboards = this.getAllDashboards();
    for (var i=0; i < dashboards.dashboards.length; i++) {
      if (dashboards.dashboards[i].name === dashboardName) {
        dashboards.defaultDashboard = dashboards.dashboards[i].index;
      }
    }
    this.setAllDashboards(dashboards);
  };

  this.getDefaultDashboardName = function() {
    var dashboards = this.getAllDashboards();
    var defaultDashboardIndex = dashboards.defaultDashboard;
    for (var i=0; i < dashboards.dashboards.length; i++) {
      if (dashboards.dashboards[i].index === defaultDashboardIndex) {
        return dashboards.dashboards[i].name;
      }
    }
  };

  this.mergeApplicationData = function(dashboardApps, marketplaceApps) {
    for (var i=0; i < marketplaceApps.length; i++) {
      // check if this app is on our dashboard
      for (var j=0; j < dashboardApps.length; j++) {
        if (dashboardApps[j].uuid === marketplaceApps[i].uuid) {
          // if it is, then get all relevant info
          dashboardApps[j].icon = marketplaceApps[i].icon;
          dashboardApps[j].url = marketplaceApps[i].url;
          dashboardApps[j].name = marketplaceApps[i].name;
          dashboardApps[j].shortDescription = marketplaceApps[i].shortDescription;
        }
      }
    }
  };

  this.createExampleDashboards = function() {
    console.log('Creating example dashboards...');
    // TODO: Originally this object was placed in a separate json file and fetched
    // via http, but that led to all sorts of issues with testing.
    var dashboards = {
      'name': 'dashboards',
      'user': 'joebloe',
      'defaultDashboard': 0,
      'dashboards': [
        {
          'name': 'Simple Apps',
          'index': 0,
          'layout': 'grid',
          'desktopIcons': [
            {
              'icon': 'img/key-icon.png',
              'text': 'Icon 1',
              'elliptical': false,
              'index': 1,
              'url': '#',
              'top': 100,
              'left': 100
            },
            {
              'icon': 'img/Glossy-Developer-icon.png',
              'text': 'Icon 0',
              'elliptical': false,
              'index': 0,
              'url': '#',
              'top': 100,
              'left': 125
            },
            {
              'icon': 'img/nero-icon.png',
              'text': 'Icon 2',
              'elliptical': false,
              'index': 2,
              'url': '#',
              'top': 100,
              'left': 150
            }
          ],
          'apps': [
            {
              'uuid': '342f3680-18c9-11e4-8c21-0800200c9a66', // purple circle
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
              'uuid': 'd9d3b477-7c21-4cab-bd9f-771ee9379be4', // red square
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
              'uuid': 'c3d895d5-f332-4154-b963-c5dd63f8ca49', // some text
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
              'uuid': '34bc3505-5dcc-4609-bcd6-c014d9f27ce5', //mbrot
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
          ] // end apps in dashboard
        },
        {
          'name': 'Just One Thing',
          'index': 1,
          'layout': 'desktop',
          'desktopIcons': [
            {
              'icon': 'img/key-icon.png',
              'text': 'Icon 1',
              'elliptical': false,
              'index': 1,
              'url': '#',
              'top': 100,
              'left': 100
            },
            {
              'icon': 'img/Glossy-Developer-icon.png',
              'text': 'Icon 0',
              'elliptical': false,
              'index': 0,
              'url': '#',
              'top': 100,
              'left': 125
            },
            {
              'icon': 'img/nero-icon.png',
              'text': 'Icon 2',
              'elliptical': false,
              'index': 2,
              'url': '#',
              'top': 100,
              'left': 150
            }
          ],
          'apps': [
            {
              'uuid': '342f3680-18c9-11e4-8c21-0800200c9a66',
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
          ] // end apps in dashboard
        },
        {
          'name': 'Bouncing Balls',
          'index': 2,
          'layout': 'grid',
          'desktopIcons': [
          ],
          'apps': [
            {
              'uuid': '998437ef-9191-4d57-91a7-6ab049361583',
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
              'uuid': '3af849aa-dad0-4223-b15b-9da3b48d1845',
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
              'uuid': 'e5f52929-3f00-4766-a820-f0452ff74572',
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
              'uuid': '93eb7a1d-618c-4478-a59e-326eccbe86d5',
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
          ] // end apps in dashboard
        }
      ]
    };
    this.setAllDashboards(dashboards);
  };

});


app.service('iwcDashboardApiImpl', function(/*dependencies*/) {
  this.getAllDashboards = function() {};

  this.setAllDashboards = function() {};

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