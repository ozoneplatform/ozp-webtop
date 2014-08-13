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

  this.updateCurrentDashboardDesktop = function() {};

  this.createExampleDashboards = function() {
    console.log('Creating example dashboards...');
    // TODO: Originally this object was placed in a separate json file and fetched
    // via http, but that led to all sorts of issues with testing.
    var dashboards = {
      'name': 'dashboards',
      'user': 'joebloe',
      'dashboards': [
        {
          'name': 'Great Dashboard',
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
              'uuid': '342f3680-18c9-11e4-8c21-0800200c9a66',
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
              'uuid': 'd9d3b477-7c21-4cab-bd9f-771ee9379be4',
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
              'uuid': 'c3d895d5-f332-4154-b963-c5dd63f8ca49',
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
              'uuid': '34bc3505-5dcc-4609-bcd6-c014d9f27ce5',
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
          'name': 'Secondary Dashboard',
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