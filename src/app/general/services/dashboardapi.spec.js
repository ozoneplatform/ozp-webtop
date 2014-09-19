'use strict';

describe('Service: dashboardApi', function () {

  beforeEach(function() {
    angular.mock.module('ozpWebtopApp.constants', function($provide) {
      $provide.constant('useIwc', false);
    });
  });

  // load the service's module
  beforeEach(module('ozpWebtopApp'));

  // Dashboards service
  var dashboardApi, rootScope;

  beforeEach(inject(function ($rootScope, _dashboardApi_) {

    rootScope = $rootScope.$new();

    dashboardApi = _dashboardApi_;

    dashboardApi.createExampleDashboards().then(function() {
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    rootScope.$apply();

  }));

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                      Data retrieval
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Get all dashboard data
  it('should have a getDashboardData method', function(done) {
    dashboardApi.getDashboardData().then(function(dashboardData) {
      expect(dashboardData.user).toBeDefined();
      expect(dashboardData.name).toBeDefined();
      expect(dashboardData.defaultDashboard).toBeDefined();
      expect(dashboardData.dashboards).toBeDefined();
      done();
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }

  });

  // Get all dashboards
  it('should have a getDashboards method', function(done) {
    dashboardApi.getDashboards().then(function(dashboards) {
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
      done();
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  // Get a single dashboard
  it('should have a getDashboardById method', function(done) {
    dashboardApi.getDashboardById(0).then(function (dashboard0) {
      expect(dashboard0.id).toEqual('0');
      done();
    }).catch(function (error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  it('should have a getDashboardById method that accepts strings', function(done) {
    // it should work if you pass in a string as well
    dashboardApi.getDashboardById('0').then(function (dashboard0) {
      expect(dashboard0.id).toEqual('0');
      done();
    }).catch(function (error) {
      expect(error).toEqual('should not have happened');
    });
    if (!rootScope.$$phase) {
      rootScope.$apply();
    }
  });

  it('should have a getDashboardById method that returns null when not found', function(done) {
    // null is returned if no dashboard with given id is found
    dashboardApi.getDashboardById(9324).then(function(nullBoard) {
      expect(nullBoard).toBeNull();
      done();
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if (!rootScope.$$phase) {
      rootScope.$apply();
    }
  });

  // Get a single frame
  it('should have a getFrameById method', function(done) {
    dashboardApi.getDashboardById(0).then(function(dashboard) {
      dashboardApi.getFrameById(dashboard.frames[0].id).then(function(frame) {
        var sameFrame = dashboard.frames[0];
        expect(frame).toEqual(sameFrame);
        done();
      }).catch(function(error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  // Get the size of a frame on grid layout (in pixels)
  it('should have a getFrameSizeOnGrid method', function(done) {
    dashboardApi.getDashboardById(0).then(function(dashboard) {
      var frame = dashboard.frames[0];
      dashboardApi.getFrameSizeOnGrid(frame.id).then(function(frameSize) {
        // Since these values are dynamically generated, they will be undefined
        // at first
        expect(frameSize.width).not.toBeDefined();
        expect(frameSize.height).not.toBeDefined();

        frame.gridLayout.width = 120;
        frame.gridLayout.height = 120;
        dashboardApi.saveFrame(frame).then(function(response) {
          expect(response).toEqual(true);
          dashboardApi.getFrameSizeOnGrid(frame.id).then(function(frameSize) {
            expect(frameSize.width).toBeDefined();
            expect(frameSize.height).toBeDefined();
            done();
          }).catch(function(error) {
            expect(error).toEqual('should not have happened');
          });
        }).catch(function(error) {
          expect(error).toEqual('should not have happened');
        });
      }).catch(function(error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  // Get the name of the default dashbard
  it('should have a getDefaultDashboardName method', function(done) {
    dashboardApi.getDashboardData().then(function(dashboardData) {
      var defaultDashboardId = dashboardData.defaultDashboard;
      dashboardApi.getDashboardById(defaultDashboardId).then(function(dashboard) {
        dashboardApi.getDefaultDashboardName().then(function(name) {
          expect(name).toEqual(dashboard.name);
          done();
        }).catch(function(error) {
          expect(error).toEqual('should not have happened');
        });
      }).catch(function(error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                      Data creation
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  it('should have a createFrame method', function(done) {
    var dashboardId = 0;
    var appId = '12345678';
    var gridMaxRows = 10;
    dashboardApi.createFrame(dashboardId, appId, gridMaxRows).then(function (frame) {
      // Check that the frame returned has also been saved in the dashboard
      dashboardApi.getFrameById(frame.id).then(function (frameFromBoard) {
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
        done();
      }).catch(function (error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function (error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  it('should have a createFrame method that handles a full grid', function(done) {
    // If all the rows in the grid are used up, this should return null and
    // add nothing to the dashboard
    var dashboardId = 0;
    var appId = '12345678';
    var gridMaxRows = 1;
    dashboardApi.getDashboardById(dashboardId).then(function(dashboard) {
      var framesBefore = dashboard.frames.length;
      dashboardApi.createFrame(dashboardId, appId, gridMaxRows).then(function(frame) {
        dashboardApi.getDashboardById(dashboardId).then(function(dashboard) {
          var framesAfter = dashboard.frames.length;
          expect(frame).toBeNull();
          expect(framesBefore).toEqual(framesAfter);
          done();
        }).catch(function(error) {
          expect(error).toEqual('should not have happened');
        });
      }).catch(function(error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  it('should have a createDashboard method', function(done) {
    var name = 'My New Dashboard';
    dashboardApi.createDashboard(name).then(function(response) {
      expect(response).toEqual(true);
      dashboardApi.getDashboards().then(function(dashboards) {
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
        done();
      }).catch(function(error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                      Data updates
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // save all dashboard data
  it('should have a "private" setDashboardData method', function() {
    expect(dashboardApi._setDashboardData).toBeDefined();
  });

  // set all dashboards
  it('should have a setAllDashboards method', function(done) {
    dashboardApi.getDashboards().then(function(dashboards) {
      // create a new dashboard
      dashboards[0].frames[0].appId = 'somethingdifferent';
      dashboardApi.setAllDashboards(dashboards).then(function(response) {
        expect(response).toEqual(true);
        dashboardApi.getDashboards().then(function(dashboards) {
          expect(dashboards[0].frames[0].appId).toEqual('somethingdifferent');
          done();
        }).catch(function(error) {
          expect(error).toEqual('should not have happened');
        });
      }).catch(function(error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }

  });

  // save a single dashboard
  it('should have a saveDashboard method', function() {
    expect(dashboardApi.saveDashboard).toBeDefined();
  });

  // save a single frame inside a dashboard
  it('should have a saveFrame method', function(done) {
    // create a new frame and save to dashboard
    var dashboardId = 0;
    var appId = '12345678';
    var gridMaxRows = 10;
    dashboardApi.createFrame(dashboardId, appId, gridMaxRows).then(function (newFrame) {
      // modify new frame and save
      newFrame.appId = '98765';
      newFrame.gridLayout.sizeY = 4;
      dashboardApi.saveFrame(newFrame).then(function (frameSaved) {
        expect(frameSaved).toEqual(true);
        // verify frame was saved in dashboard
        dashboardApi.getFrameById(newFrame.id).then(function (frameInBoard) {
          expect(frameInBoard).toEqual(newFrame);
          done();
        }).catch(function (error) {
          expect(error).toEqual('should not have happened');
        });
      }).catch(function (error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function (error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  it('should have a saveFrame method that returns false on invalid frame', function(done) {
    // if a frameid is given that does not match any frames in the user's
    // dashboards, false is returned and no update is performed
    // modify new frame and save
    var dashboardId = 0;
    var appId = '12345678';
    var gridMaxRows = 10;
    dashboardApi.createFrame(dashboardId, appId, gridMaxRows).then(function (newFrame) {
      dashboardApi.getDashboards().then(function (dashboardsBefore) {
        newFrame.id = '3848583992';
        dashboardApi.saveFrame(newFrame).then(function (frameSaved) {
          dashboardApi.getDashboards().then(function (dashboardsAfter) {
            expect(frameSaved).toEqual(false);
            expect(dashboardsBefore).toEqual(dashboardsAfter);
            done();
          }).catch(function (error) {
            expect(error).toEqual('should not have happened');
          });
        }).catch(function (error) {
          expect(error).toEqual('should not have happened');
        });
      }).catch(function (error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function (error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  // update the frame size (in pixels) on grid layout
  it('should have a updateFrameSizeOnGrid method', function(done) {
    dashboardApi.getDashboardById(0).then(function(dashboard) {
      var frame = dashboard.frames[0];
      var width = 120, height = 240;
      dashboardApi.updateFrameSizeOnGrid(frame.id, width, height).then(function(update) {
        expect(update).toEqual(true);
        dashboardApi.getFrameById(frame.id).then(function(frame) {
          expect(frame.gridLayout.width).toEqual(width);
          expect(frame.gridLayout.height).toEqual(height);
          done();
        }).catch(function(error) {
          expect(error).toEqual('should not have happened');
        });
      }).catch(function(error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  // update the default dashboard
  it('should have a updateDefaultDashboardName method - return false on invalid dashboard name', function(done) {
    // test a dashboard that doesn't exist
    dashboardApi.updateDefaultDashboardName('doesntexist').then(function (update) {
      expect(update).toEqual(false);
      done();
    }).catch(function (error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  it('should have a updateDefaultDashboardName method', function(done) {
    dashboardApi.getDefaultDashboardName().then(function(currentDefaultDashboard) {
      dashboardApi.getDashboardById(1).then(function(dashboard) {
        var newDefault = dashboard.name;
        expect(currentDefaultDashboard).not.toEqual(newDefault);
        expect(newDefault).toBeTruthy();
        dashboardApi.updateDefaultDashboardName(newDefault).then(function(update) {
          expect(update).toEqual(true);
          dashboardApi.getDefaultDashboardName().then(function(updatedDefaultName) {
            expect(updatedDefaultName).toEqual(newDefault);
            done();
          }).catch(function(error) {
            expect(error).toEqual('should not have happened');
          });
        }).catch(function(error) {
          expect(error).toEqual('should not have happened');
        });
      }).catch(function(error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  // update the desktop layout of a frame
  it('should have a updateDesktopFrame method', function(done) {
    dashboardApi.getDashboardById(0).then(function (dashboard) {
      var frame = dashboard.frames[0];
      var newLeft = 100;
      var newTop = 250;
      var newZIndex = 3;
      var newWidth = 100;
      var newHeight = 100;

      dashboardApi.updateDesktopFrame(frame.id, newLeft, newTop, newWidth, newHeight,
        newZIndex).then(function (update) {
          expect(update).toEqual(true);
          dashboardApi.getFrameById(frame.id).then(function (frame) {
            expect(frame.desktopLayout.left).toEqual(newLeft);
            expect(frame.desktopLayout.top).toEqual(newTop);
            expect(frame.desktopLayout.zIndex).toEqual(newZIndex);
            expect(frame.desktopLayout.width).toEqual(newWidth);
            expect(frame.desktopLayout.height).toEqual(newHeight);
            done();
          }).catch(function (error) {
            expect(error).toEqual('should not have happened');
          });
        }).catch(function (error) {
          expect(error).toEqual('should not have happened');
        });
    }).catch(function (error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

    it('should have a updateDesktopFrame method that returns false on invalid frame id', function(done) {
      // update should fail on invalid frame id
      var newLeft = 100;
      var newTop = 250;
      var newZIndex = 3;
      dashboardApi.getDashboardData().then(function(oldDashboardData) {
        dashboardApi.updateGridFrame('asdfkjk43222222', newLeft, newTop,
          newZIndex).then(function(update) {
            dashboardApi.getDashboardData().then(function(newDashboardData) {
              expect(update).toEqual(false);
              expect(oldDashboardData).toEqual(newDashboardData);
              done();
            }).catch(function(error) {
              expect(error).toEqual('should not have happened');
            });
          }).catch(function(error) {
            expect(error).toEqual('should not have happened');
          });
      }).catch(function(error) {
        expect(error).toEqual('should not have happened');
      });

      if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  // update the grid layout of a frame
  it('should have a updateGridFrame method', function(done) {
    dashboardApi.getDashboardById(0).then(function (dashboard) {
      var frame = dashboard.frames[0];
      var newRow = 4;
      var newCol = 3;
      var newSizeX = 2;
      var newSizeY = 1;
      dashboardApi.updateGridFrame(frame.id, newRow, newCol,
        newSizeX, newSizeY).then(function (update) {
          expect(update).toEqual(frame.id);
          dashboardApi.getFrameById(frame.id).then(function (frame) {
            expect(frame.gridLayout.row).toEqual(newRow);
            expect(frame.gridLayout.col).toEqual(newCol);
            expect(frame.gridLayout.sizeX).toEqual(newSizeX);
            expect(frame.gridLayout.sizeY).toEqual(newSizeY);
            done();
          }).catch(function (error) {
            expect(error).toEqual('should not have happened');
          });
        }).catch(function (error) {
          expect(error).toEqual('should not have happened');
        });
    }).catch(function (error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  it('should have a updateGridFrame method that works in a loop', function(done) {
    var doUpdate = function (frameId) {
      var newRow = 4;
      var newCol = 3;
      var newSizeX = 5;
      var newSizeY = 5;
      return dashboardApi.updateGridFrame(frameId, newRow, newCol,
        newSizeX, newSizeY).then(function (update) {
          expect(update).toEqual(frameId);
          return dashboardApi.getFrameById(frameId).then(function(frame) {
            expect(frame.gridLayout.sizeX).toEqual(newSizeX);
            expect(frame.gridLayout.sizeY).toEqual(newSizeY);
          }).catch(function (error) {
            expect(error).toEqual('should not have happened');
          });
        }).catch(function (error) {
          expect(error).toEqual('should not have happened');
        });
    };

    dashboardApi.getDashboardById(0).then(function(dashboard) {
      var frames = dashboard.frames;

      frames.reduce(function(previous, current) {
        return previous.then(function() {
          rootScope.$evalAsync(function() {
            var promise = doUpdate(current.id);
            return promise;
          });
        });
      }, Promise.resolve()).then(function() {
        done();
      });

    }).catch(function (error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  it('should have a updateGridFrame method and return false on invalid frame', function(done) {
    // update should fail on invalid frame id
    var newRow = 4;
    var newCol = 3;
    var newSizeX = 2;
    var newSizeY = 1;
    dashboardApi.getDashboardData().then(function(oldDashboardData) {
      dashboardApi.updateGridFrame('asdfkjk43222222', newRow, newCol,
        newSizeX, newSizeY).then(function(update) {
          expect(update).toEqual(false);
          dashboardApi.getDashboardData().then(function(newDashboardData) {
            expect(oldDashboardData).toEqual(newDashboardData);
            done();
          }).catch(function(error) {
            expect(error).toEqual('should not have happened');
          });
        }).catch(function(error) {
          expect(error).toEqual('should not have happened');
        });
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  // update the layout type of a dashboard
  it('should have a updateLayoutType method and return false on invalid layout type', function(done) {
    // method should return false unless passed 'grid' or 'desktop'
    dashboardApi.updateLayoutType(0, 'gridster').then(function (update) {
      expect(update).toEqual(false);
      done();
    }).catch(function (error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  it('should have a updateLayout method and return false on invalid layout type', function(done) {
    dashboardApi.updateLayoutType(0, 'desktopy').then(function (update) {
      expect(update).toEqual(false);
      done();
    }).catch(function (error) {
      expect(error).toEqual('should not have happened');
    });

    if (!rootScope.$$phase) {
      rootScope.$apply();
    }
  });

  it('should have a updateLayout method and support desktop layout', function(done) {
    dashboardApi.updateLayoutType(0, 'desktop').then(function (update) {
      dashboardApi.getDashboardById(0).then(function (dashboard) {
        var newLayout = dashboard.layout;
        expect(newLayout).toEqual('desktop');
        expect(update).toEqual(true);
        done();
      }).catch(function (error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function (error) {
      expect(error).toEqual('should not have happened');
    });

    if (!rootScope.$$phase) {
      rootScope.$apply();
    }
  });

  it('should have a updateLayout method and support grid layout', function(done) {
    dashboardApi.updateLayoutType(0, 'grid').then(function(update) {
      dashboardApi.getDashboardById(0).then(function(dashboard) {
        var newLayout = dashboard.layout;
        expect(newLayout).toEqual('grid');
        expect(update).toEqual(true);
        done();
      }).catch(function(error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if (!rootScope.$$phase) {
      rootScope.$apply();
    }
  });


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                      Data removal
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // remove a frame from a dashboard
  it('should have a removeFrame method', function(done) {
    dashboardApi.getDashboards().then(function(dashboards) {
      var origFrames = dashboards[0].frames;
      var originalFrameCount = origFrames.length;
      dashboardApi.removeFrame(origFrames[0].id).then(function(removed) {
        expect(removed).toEqual(true);
        dashboardApi.getDashboards().then(function(dashboards) {
          var newFrames = dashboards[0].frames;
          expect(originalFrameCount).toEqual(newFrames.length+1);
          // make sure it removed the correct frame
          for (var i=0; i < newFrames.length; i++) {
            expect(newFrames[i].id).not.toEqual(origFrames[0].id);
          }
          done();
        }).catch(function(error) {
          expect(error).toEqual('should not have happened');
        });
      }).catch(function(error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  // remove a dashboard
  it('should have a removeDashboard method', function(done) {
    dashboardApi.getDashboards().then(function(dashboards) {
      var origDashboardCount = dashboards.length;
      var dashboardRemoved = dashboards[1].id;
      dashboardApi.removeDashboard(1).then(function(removed) {
        dashboardApi.getDashboards().then(function(dashboards) {
          expect(removed).toEqual(true);
          expect(origDashboardCount).toEqual(dashboards.length+1);
          for (var i=0; i < dashboards.length; i++) {
            expect(dashboards[i].id).not.toEqual(dashboardRemoved);
          }
          done();
        }).catch(function(error) {
          expect(error).toEqual('should not have happened');
        });
      }).catch(function(error) {
          expect(error).toEqual('should not have happened');
      });
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }

  });

  it('should return false for removeDashboard that doesnt exist', function(done) {
    dashboardApi.removeDashboard(218384).then(function(removed) {
      expect(removed).toEqual(false);
      done();
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  it('should have a toggleFrameKey method', function(done) {
    dashboardApi.getDashboardById(0).then(function(dashboard) {
      var frameId = dashboard.frames[0].id;
      // frame default state is to not be minimized or maximized
      // isMinimized expect first pass to set as true (minimized)
      dashboardApi.toggleFrameKey(frameId, 'isMinimized').then(function(resp) {
        expect(resp).toEqual(true);
        dashboardApi.getDashboardById(0).then(function(updatedDashboard) {
          expect (updatedDashboard.frames[0].isMinimized).toEqual(true);
          // isMinimized expect second pass to set as false (minimized)
          dashboardApi.toggleFrameKey(frameId, 'isMinimized').then(function(resp) {
            expect(resp).toEqual(false);
            dashboardApi.getDashboardById(0).then(function(updatedDashboard) {
              expect(updatedDashboard.frames[0].isMinimized).toEqual(false);
              done();
            }).catch(function(error) {
              expect(error).toEqual('should not have happened');
            });
          }).catch(function(error) {
            expect(error).toEqual('should not have happened');
          });
        }).catch(function(error) {
          expect(error).toEqual('should not have happened');
        });
      }).catch(function(error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }

  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                      Misc
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // combine dashboard data with application data
  it('should have a mergeApplicationData method', function() {
    // build marketplace apps
    dashboardApi.getDashboardById(0).then(function(dashboard) {
      var frames = dashboard.frames;
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
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

  });

  // determine if an application exists in a dashboard
  it('should have a isAppOnDashboard method', function(done) {
    dashboardApi.getDashboardById(0).then(function(dashboard) {
      var validAppId = dashboard.frames[0].appId;
      dashboardApi.isAppOnDashboard(0, validAppId).then(function(appFound) {
        expect(appFound).toEqual(true);
        done();
      }).catch(function(error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }

  });

  it('should return false when isAppOnDashboard is given an invalid id', function(done) {
    dashboardApi.isAppOnDashboard(0, 'nothere').then(function(appFound) {
      expect(appFound).toEqual(false);
      done();
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  it('should have a getNewDashboardId method', function(done) {
    // TODO: better test - this assumes we have 4 existing boards (0,1,2, and 3)
    // expect(dashboardApi.getNewDashboardId()).toEqual(4);

    var newDashboardId;

    dashboardApi.getNewDashboardId().then(function(response) {
      newDashboardId = response;
      expect(newDashboardId).toEqual(4);
      done();
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });
    if(!rootScope.$$phase) { rootScope.$apply(); }

  });

  xit('should say hello', function() {
    var promise = dashboardApi.sayHello();
    var resolvedValue;
    promise.then(function(value) {
      resolvedValue = value;
    });
    expect(resolvedValue).toBeUndefined();

    rootScope.$apply();
    expect(resolvedValue).toEqual('hello, world');
  });

});