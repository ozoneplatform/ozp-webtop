'use strict';

var apis = angular.module('ozpWebtopApp.apis');

// TODO: put this somewhere better
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function generalDashboardModel(persistStrategy, Utilities) {

  return {
    sayHello: function() {
      if (typeof persistStrategy.sayHello !== 'function') {
        console.log('persistStrategy: ' + JSON.stringify(persistStrategy));
      }
      return persistStrategy.sayHello().then(function(response) {
        console.log(response);
        return response;
      });
    },
    getDashboardData: function() {
      return persistStrategy.getDashboardData().then(function(response) {
        return response;
      });
    },
    getDashboards: function() {
      return this.getDashboardData().then(function(response) {
        var dashboardData = response;
        if (dashboardData) {
          return dashboardData.dashboards;
        } else {
          console.log('WARNING: dashboardData is null!');
          return null;
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    _setDashboardData: function(dashboardData) {
      return persistStrategy.setDashboardData(dashboardData).then(function(response) {
        return response;
      });
    },
    setAllDashboards: function(dashboards) {
      var that = this;
      return this.getDashboardData().then(function(dashboardData){
        dashboardData.dashboards = dashboards;
        return that._setDashboardData(dashboardData).then(function(response){
          return response;
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    // Update dashboard layout
    // @param layout should be 'grid' or 'desktop'
    updateLayoutType: function(dashboardId, layout) {
      var that = this;
      return this.getDashboardById(dashboardId).then(function(dashboard){
        var validInputs = ['grid', 'desktop'];
        if (validInputs.indexOf(layout) === -1) {
          return false;
        }
        dashboard.layout = layout;
        return that.saveDashboard(dashboard).then(function(response){
          return response;
        });
      });
    },
    // toggle the value of a key in a frame
    toggleFrameKey: function(frameId, key) {
      var that = this;
      return this.getFrameById(frameId).then(function(frame) {
        if (!frame) {
          return false;
        }
        if (frame[key]) {
          frame[key] = false;
        }
        else {
          console.debug(typeof frame[key]);
          frame[key] = true;
        }
        return that.saveFrame(frame).then(function(resp) {
          if (resp) {
            return frame[key];
          } else {
            return resp;
          }
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    // Update the grid layout of a frame in a dashboard
    updateGridFrame: function(frameId, sizeData) {
      var that = this;
      return this.getFrameById(frameId).then(function(frame) {
        if (!frame) {
          return false;
        }
        frame.gridLayout.sm.row = sizeData.sm.row;
        frame.gridLayout.sm.col = sizeData.sm.col;
        frame.gridLayout.sm.sizeX = sizeData.sm.sizeX;
        frame.gridLayout.sm.sizeY = sizeData.sm.sizeY;

        frame.gridLayout.md.row = sizeData.md.row;
        frame.gridLayout.md.col = sizeData.md.col;
        frame.gridLayout.md.sizeX = sizeData.md.sizeX;
        frame.gridLayout.md.sizeY = sizeData.md.sizeY;
        return that.saveFrame(frame).then(function(response) {
          if (response) {
            return frameId;
          } else {
            return response;
          }
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    // Update the desktop layout of a frame in a dashboard
    // TODO: what about width and height?
    updateDesktopFrame: function(frameId, x, y, width, height, zIndex) {
      var that = this;
      return this.getFrameById(frameId).then(function(frame) {
        if (!frame) {
          return false;
        }
        frame.desktopLayout.left = x;
        frame.desktopLayout.top = y;
        frame.desktopLayout.width = width;
        frame.desktopLayout.height = height;
        frame.desktopLayout.zIndex = zIndex;
        return that.saveFrame(frame).then(function(response) {
          return response;
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    // Check to see if an application is already on a given dashboard
    isAppOnDashboard: function(dashboardId, applicationId) {
      return this.getDashboardById(dashboardId).then(function(dashboard){
        for (var i=0; i < dashboard.frames.length; i++) {
          if (dashboard.frames[i].appId === applicationId) {
            return true;
          }
        }
        return false;
      });
    },
    // Create a new frame in a dashboard for a given application
    // Creates a frame with with both grid and desktop layout data
    createFrame: function(dashboardId, appId, gridMaxRows) {
      var that = this;
      return this.getDashboardById(dashboardId).then(function(dashboard) {
        // Calculate the row to place this frame in (for grid layout)

        // for the grid layout, place new app in first col of first empty row
        // for the desktop layout, just put it on and let user move it
        var usedRows = [];
        for (var i=0; i < dashboard.frames.length; i++) {
          // TODO: arbitrarily chose to use small size
          usedRows.push(dashboard.frames[i].gridLayout.sm.row);
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
            'sm': {
              'row': row,
              'col': col,
              'sizeX': sizeX,
              'sizeY': sizeY
            },
            'md': {
              'row': row,
              'col': col,
              'sizeX': sizeX,
              'sizeY': sizeY
            }
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
        return that.saveDashboard(dashboard).then(function() {
          return newApp;
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    // Remove a frame from a dashboard
    removeFrame: function(frameId) {
      var that = this;
      return this.getDashboards().then(function(dashboards) {
        var dashboardToUpdate;
        for (var i=0; i < dashboards.length; i++) {
          var frames = dashboards[i].frames;
          for (var j=0; j < frames.length; j++) {
            if (frameId === frames[j].id) {
              dashboards[i].frames.splice(j,1);
              dashboardToUpdate = i;
            }
          }
        }
        if (dashboardToUpdate >= 0) {
          return that.saveDashboard(dashboards[dashboardToUpdate]).then(function(saved) {
            return saved;
          }).catch(function(error) {
            console.log('should not have happened: ' + error);
          });
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });

    },
    // Change the user's current dashboard
    updateCurrentDashboardName: function(dashboardName) {
      var that = this;
      return this.getDashboardData().then(function(dashboardData) {
        var dashboardFound = false;
        for (var i=0; i < dashboardData.dashboards.length; i++) {
          if (dashboardData.dashboards[i].name === dashboardName) {
            dashboardData.currentDashboard = dashboardData.dashboards[i].id;
            dashboardFound = true;
          }
        }
        if (dashboardFound) {
          return that._setDashboardData(dashboardData).then(function(response) {
            return response;
          }).catch(function(error) {
            console.log('should not have happened: ' + error);
          });
        } else {
          return false;
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    // Return the name of the user's current dashboard
    getCurrentDashboardName: function() {
      return this.getDashboardData().then(function(dashboards) {
        var currentDashboardId = dashboards.currentDashboard;
        for (var i=0; i < dashboards.dashboards.length; i++) {
          if (dashboards.dashboards[i].id === currentDashboardId) {
            return dashboards.dashboards[i].name;
          }
        }
        return null;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    // Augment the dashboard.frames data with application-specific data
    // Note: data is not persisted, but rather the 'frames' object
    //  is modified by reference
    mergeApplicationData: function(frames, marketplaceApps) {
      for (var i=0; i < marketplaceApps.length; i++) {
        // check if this app is on our dashboard
        for (var j=0; j < frames.length; j++) {
          if (frames[j].appId === marketplaceApps[i].id) {
            // if it is, then get all relevant info
            frames[j].icon = marketplaceApps[i].icons.small;
            frames[j].url = marketplaceApps[i].launchUrls.default;
            frames[j].name = marketplaceApps[i].name;
            frames[j].shortDescription = marketplaceApps[i].shortDescription;
          }
        }
      }
    },

    // Updates the dynamically generated fields for grid frame size in px
    updateFrameSizeOnGrid: function(frameId, size, width, height) {
      // TODO: may need to adjust this someday
      if (size === 'lg') {
        size = 'md';
      }
      var that = this;
      return this.getFrameById(frameId).then(function(frame) {
        frame.gridLayout[size].width = width;
        frame.gridLayout[size].height = height;
        return that.saveFrame(frame).then(function(response) {
          return response;
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },

    // Return the frame size (in px) for a given frame in the grid layout
    // Note that these values are dynamically generated
    getFrameSizeOnGrid: function(frameId) {
      return this.getFrameById(frameId).then(function(frame) {
        var widgetSize = {'sm': {}, 'md': {}};
        widgetSize.sm.width = frame.gridLayout.sm.width;
        widgetSize.sm.height = frame.gridLayout.sm.height;
        widgetSize.md.width = frame.gridLayout.md.width;
        widgetSize.md.height = frame.gridLayout.md.height;
        return widgetSize;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },

    // Save a dashboard
    // TODO: make sure input is a valid dashboard:
    //  dashboard.id should be unique
    //  all frame.id's should be unique
    saveDashboard: function(dashboard) {
      var foundDashboard = false;
      var that = this;
      return this.getDashboards().then(function(dashboards) {
        for (var i=0; i < dashboards.length; i++) {
          if (dashboards[i].id === dashboard.id) {
            dashboards[i] = dashboard;
            foundDashboard = true;
          }
        }
        if (foundDashboard) {
          return that.setAllDashboards(dashboards).then(function(response) {
              return response;
            }).catch(function(error) {
              console.log('should not have happened: ' + error);
            });
        } else {
          return false;
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },

    // Save a frame in a dashboard
    // TODO: make sure input is a valid frame
    saveFrame: function(frame) {
      var that = this;
      return this.getDashboards().then(function(dashboards) {
        var frameFound = false;
        for (var i=0; i < dashboards.length; i++) {
          var frames = dashboards[i].frames;
          for (var j=0; j < frames.length; j++) {
            if (frames[j].id === frame.id) {
              dashboards[i].frames[j] = frame;
              frameFound = true;
            }
          }
        }
        if (frameFound) {
          return that.setAllDashboards(dashboards).then(function(response) {
            return response;
          }).catch(function(error) {
            console.log('should not have happened: ' + error);
          });
        } else {
          return false;
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },

    // Retrieve a frame by id
    getFrameById: function(frameId) {
      return this.getDashboards().then(function(dashboards) {
        for (var i=0; i < dashboards.length; i++) {
          var frames = dashboards[i].frames;
          for (var j=0; j < frames.length; j++) {
            if (frames[j].id === frameId) {
              return frames[j];
            }
          }
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });

    },

    // Retrieve a dashboard by id
    getDashboardById: function(dashboardId) {
      return this.getDashboards().then(function(dashboards) {
        if (!dashboards) {
          return null;
        }
        for (var i=0; i < dashboards.length; i++) {
          if (dashboards[i].id.toString() === dashboardId.toString()) {
            return dashboards[i];
          }
        }
        return null;
      });
    },

    // Delete a dashboard
    removeDashboard: function(dashboardId) {
      var that = this;
      return this.getDashboardData().then(function(dashboardData) {
        var dashboards = dashboardData.dashboards;
        var foundDashboard = false;
        for (var i=0; i < dashboards.length; i++) {
          if (dashboards[i].id.toString() === dashboardId.toString()) {
            dashboards.remove(i);
            foundDashboard = true;
          }
        }
        if (foundDashboard) {
          return that._setDashboardData(dashboardData).then(function(resp) {
            return resp;
          }).catch(function(error) {
            console.log('should not have happened: ' + error);
          });
        } else {
          return false;
        }
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },

    // Create a new dashboard
    createDashboard: function(name) {
      var that = this;
      return this.getDashboardData().then(function(dashboardData) {
        // get new id for board
        return that.getNewDashboardId().then(function(dashboardId) {
          var newBoard = {
            'name': name,
            'id': dashboardId,
            'layout': 'grid',
            'frames': [
            ]
          };
          return that.getDashboards().then(function(dashboards) {
            dashboards.push(newBoard);
            dashboardData.dashboards = dashboards;
            return that._setDashboardData(dashboardData).then(function(response) {
              return response;
            }).catch(function(error) {
              console.log('should not have happened: ' + error);
            });
          }).catch(function(error) {
            console.log('should not have happened: ' + error);
          });
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },

    // Get the next available id for a new dashboard
    // TODO: this assumes ids are integers and not uuids
    getNewDashboardId: function() {
      return this.getDashboards().then(function(dashboards) {
        var existingIds = [];
        var newId = -1;
        for (var i=0; i < dashboards.length; i++) {
          existingIds.push(Number(dashboards[i].id));
        }
        newId = Math.max.apply(Math, existingIds) + 1;
        return newId;
      });
    },
    // Get the user's current dashboard
    getCurrentDashboard: function() {
      var that = this;
      return this.getDashboardData().then(function(dashboardData) {
        return that.getDashboardById(dashboardData.currentDashboard);
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    createExampleDashboards: function() {
      // TODO: Originally this object was placed in a separate json file and fetched
      // via http, but that led to all sorts of issues with testing.
      var dashboardData = {
        'name': 'dashboards',
        'user': 'J Smith',
        'currentDashboard': '0',
        'dashboards': [
          {
            'name': 'Stock Trader',
            'id': '0',
            'layout': 'grid',
            'frames': [
              {
                'appId': 'cd0e3e24-cae8-4886-a0d4-c7e04b5b104e', // Greek analysis
                'id': '2b585b22-5de9-4389-b536-57bcb602bf3a',
                'gridLayout': {
                  'sm': {
                    'row': 0,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 0,
                    'col': 0,
                    'sizeX': 6,
                    'sizeY': 1
                  }
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
                  'sm': {
                    'row': 1,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 1,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  }
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
                  'sm': {
                    'row': 2,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 2
                  },
                  'md': {
                    'row': 1,
                    'col': 3,
                    'sizeX': 3,
                    'sizeY': 2
                  }
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
            'id': '1',
            'layout': 'grid',
            'frames': [
              {
                'appId': '342f3680-18c9-11e4-8c21-0800200c9a66', // purple circle
                'id': '45a08744-686b-4b14-820a-ebc8c24fbfb0',
                'gridLayout': {
                  'sm': {
                    'row': 0,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 1,
                    'col': 1,
                    'sizeX': 1,
                    'sizeY': 1
                  }
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
                  'sm': {
                    'row': 1,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 1,
                    'col': 2,
                    'sizeX': 1,
                    'sizeY': 1
                  }
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
                  'sm': {
                    'row': 2,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 2,
                    'col': 1,
                    'sizeX': 1,
                    'sizeY': 1
                  }
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
                  'sm': {
                    'row': 3,
                    'col': 0,
                    'sizeX': 3,
                    'sizeY': 1
                  },
                  'md': {
                    'row': 2,
                    'col': 2,
                    'sizeX': 1,
                    'sizeY': 1
                  }
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
            'id': '2',
            'layout': 'desktop',
            'frames': [
              {
                'appId': '342f3680-18c9-11e4-8c21-0800200c9a66',
                'id': '04648023-6ab0-448d-83a1-bb378639237f',
                'gridLayout': {
                  'sm': {
                    'col': 0,
                    'row': 0,
                    'sizeX': 3,
                    'sizeY': 3
                  },
                  'md': {
                    'col': 1,
                    'row': 1,
                    'sizeX': 3,
                    'sizeY': 3
                  }
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
            'id': '3',
            'layout': 'grid',
            'frames': [
              {
                'appId': '998437ef-9191-4d57-91a7-6ab049361583',
                'id': '6c84a76c-f149-4c4d-90a8-1df397ed588b',
                'gridLayout': {
                  'sm': {
                    'col': 0,
                    'row': 0,
                    'sizeX': 1,
                    'sizeY': 1
                  },
                  'md': {
                    'col': 0,
                    'row': 0,
                    'sizeX': 3,
                    'sizeY': 2
                  }
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
                  'sm': {
                    'col': 1,
                    'row': 0,
                    'sizeX': 1,
                    'sizeY': 1
                  },
                  'md': {
                    'col': 3,
                    'row': 0,
                    'sizeX': 3,
                    'sizeY': 2
                  }
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
                  'sm': {
                    'col': 2,
                    'row': 0,
                    'sizeX': 1,
                    'sizeY': 1
                  },
                  'md': {
                    'col': 0,
                    'row': 2,
                    'sizeX': 3,
                    'sizeY': 2
                  }
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
                  'sm': {
                    'col': 1,
                    'row': 1,
                    'sizeX': 1,
                    'sizeY': 1
                  },
                  'md': {
                    'col': 3,
                    'row': 2,
                    'sizeX': 3,
                    'sizeY': 2
                  }
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

      return this._setDashboardData(dashboardData).then(function(response) {
        return response;
      });
    }
  };
}

/**
 * Angular service which provides a local storage interface to the dashboard api.
 *
 * @namespace apis
 * @class localStorageDashboardApiImpl
 * @constructor
 * @param {Object} $http The AngularJS HTTP service
 * @param {Object} LocalStorage the local storage service
 * @param {Object} Utilities the utilites
 */
apis.service('dashboardModelLocalStorage', function(localStorageInterface, Utilities) {
  var model = generalDashboardModel(localStorageInterface, Utilities);
  for (var prop in model) {
    if (model.hasOwnProperty(prop)) {
      this[prop] = model[prop];
    }
  }
});

/**
 * Angular service which uses the Inter-Widget Communication (IWC) API to store and retrieve
 * dashboards.
 *
 * @class iwcDashboardApiImpl
 * @constructor
 */
apis.service('dashboardModelIwc', function(iwcInterface, Utilities) {
  var model = generalDashboardModel(iwcInterface, Utilities);
  for (var prop in model) {
    if (model.hasOwnProperty(prop)) {
      this[prop] = model[prop];
    }
  }
});

/**
 * Angular service which provides an abstraction of the implementations used to store and retrieve
 * dashboard information.
 *
 * @class dashboardApi
 * @constructor
 */
apis.factory('dashboardApi', function($injector, useIwc) {
  if (useIwc) {
    return $injector.get('dashboardModelIwc');
  } else if (useIwc === false){
    return $injector.get('dashboardModelLocalStorage');

  }
  else {
    console.log('ERROR: useIwc is undefined!');
  }
});
