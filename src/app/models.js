'use strict';

/**
 * models and Data Access Layer for webtop
 *
 * @module ozpWebtop.models
 * @requires ozp.common.utilities
 * @requires ozpWebtop.constants
 * @requires ozpWebtop.services.iwcInterface
 * @requires ozpWebtop.services.restInterface
 */
angular.module('ozpWebtop.models', [
  'ozp.common.utilities', 'ozpWebtop.constants',
  'ozpWebtop.services.iwcInterface',
  'ozpWebtop.services.restInterface']);

var models = angular.module('ozpWebtop.models');

/**
 * Models and Data Access Layer for webtop. The service itself 'caches' data
 * from the server for both webtop data and Listing (application) data. Data
 * is always read locally. When data is written to the server, it is written
 * to the local 'cache' first, then asynchronously sent to the server in a
 * 'fire and forget' manner. If the write fails, we will ignore it and hope
 * it succeeds next time. This has the benefit of making all the code
 * synchronous, which, in addition to being much faster, greatly simplifies
 * the API
 *
 * ngtype: factory
 *
 * @class models
 * @static
 * @namespace models
 */

models.factory('models', function($sce, $q, $log, $http, $window, useIwc,
                                  iwcInterface, restInterface, Utilities) {

  var cachedWebtopData = null;
  var cachedApplicationData = null;

  /**
   * Set all webtop data
   *
   * @method setWebtopData
   * @param webtopData
   * @returns {Promise}
   * @private
   */
  function setWebtopData (webtopData) {
    // first, cache this data locally
    cachedWebtopData = angular.copy(webtopData);
    if (useIwc) {
      return iwcInterface.setWebtopData(webtopData);
    } else {
      return restInterface.setWebtopData(webtopData);
    }
  }


  return {
    /**
     * Transform the raw Listing data into a format used for webtop
     *
     * TODO: At some point it would be nice to eliminate this...
     */
    setApplicationData: function(applicationData) {
      if (!applicationData.length) {
        $log.warn('WARNING: no listings found for current user!');
      } else {
       $log.info('found ' + applicationData.length + ' app listings for current user');
      }
      var apps = [];
      for (var i=0; i < applicationData.length; i++) {
        // TODO: get shortDescription, state, type from backend
        apps.push({'name': applicationData[i].listing.title, 'id': applicationData[i].listing.id,
        'description': 'Description', 'descriptionShort': 'Short description', 'state': 'active', 'type': 'application',
        'uiHints': {'width': 200, 'height': 200, 'singleton': false}, 'icons': {
            'small': applicationData[i].listing.small_icon.url, 'large': applicationData[i].listing.large_icon.url},
          'launchUrls': {
            'default': applicationData[i].listing.launch_url}});
      }
      cachedApplicationData = apps;
    },
    /**
     * Get application data
     * @returns {*}
     */
    getApplicationData: function() {
      return cachedApplicationData;
    },
    /**
     * Set the initial dashboard-data
     *
     * This should be invoked at application startup, after the webtop data
     * is retrieved from the server
     */
    setInitialWebtopData: function(webtopData) {
      if (!webtopData.dashboards || webtopData.dashboards.length < 1) {
        // create default dashboard
        $log.warn('WARNING: no dashboardData found for current user!');
        // TODO: use actual user name or remove
        var newWebtopData = {
          'name': 'dashboards',
          'currentDashboard': '0',
          'userSettings': {},
          'persist': true,
          'dashboards': []
        };

        var newBoard = {
          'name': 'Default',
          'id': '0',
          'stickyIndex': 0,
          'layout': 'grid',
          'frames': [
          ]
        };
        newWebtopData.dashboards.push(newBoard);
        if (setWebtopData(newWebtopData)) {
          $log.info('default board created OK');
          return true;
        } else {
          $log.error('Failed to create initial dashboard data');
          return false;
        }
      } else {
        $log.info('found ' + webtopData.dashboards.length + ' dashboards for current user');
        cachedWebtopData = angular.copy(webtopData);
        return true;
      }
    },
    /**
     * Get all webtop data via deep copy
     *
     * @method getWebtopData
     * @returns webtop data
     */
    getWebtopData: function() {
      return angular.copy(cachedWebtopData);
    },
    /**
     * Check that we have received Listing and Webtop data
     */
    dataCached: function() {
      if (cachedWebtopData && cachedApplicationData) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * Get all dashboards
     *
     * @method getDashboards
     * @returns dashboards
     */
    getDashboards: function() {
      var data = this.getWebtopData();
      if (data) {
        return data.dashboards;
      } else {
        $log.warn('WARNING: dashboardData is null!');
        return null;
      }
    },
    /**
     * Set all dashboards
     *
     * @method setAllDashboards
     * @param dashboards
     * @returns true on success
     */
    setAllDashboards: function(dashboards) {
      var webtopData = this.getWebtopData();
      webtopData.dashboards = dashboards;
      return setWebtopData(webtopData);
    },
    /**
     * Update dashboard layout
     * @method updateLayoutType
     * @param dashboardId
     * @param layout 'grid' or 'desktop'
     * @returns updated dashboard
     */
    updateLayoutType: function(dashboardId, layout) {
      var dashboard = this.getDashboardById(dashboardId);
      var validInputs = ['grid', 'desktop'];
      if (validInputs.indexOf(layout) === -1) {
        $log.error('updateLayoutType received invalid dashboard layout: ' + layout);
        return false;
      }
      dashboard.layout = layout;
      return this.saveDashboard(dashboard);
      //return dashboard;
    },
    /**
     * Toggle the value of a key in a frame
     *
     * @method toggleFrameKey
     * @param frameId
     * @param key
     * @returns {Promise}
     */
    toggleFrameKey: function(frameId, key) {
      var frame = this.getFrameById(frameId);
      if (!frame) {
        return false;
      }
      if (frame[key]) {
        frame[key] = false;
      }
      else {
        frame[key] = true;
      }
      if (this.saveFrame(frame)) {
        return frame[key];
      } else {
        return false;
      }
    },
    /**
     * Update the grid layout of a frame in a dashboard
     *
     * @method updateGridFrame
     * @param frameId
     * @param sizeData
     * @returns frameId if update succeeded
     */
    updateGridFrame: function(frameId, sizeData) {
      var frame = this.getFrameById(frameId);
      if (!frame) {
        $log.warn('Grid frame not found: ' + frameId);
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
      this.saveFrame(frame);
      return frameId;
    },
    /**
     * Update the desktop layout of a frame in a dashboard
     * TODO: what about width and height?
     * @method updateDesktopFrame
     * @param frameId
     * @param x
     * @param y
     * @param width
     * @param height
     * @param zIndex
     * @returns {Promise}
     */
    updateDesktopFrame: function(frameId, x, y, width, height, zIndex) {
      var frame = this.getFrameById(frameId);
      if (!frame) {
        $log.error('Error: frame with id ' + frameId + ' not found');
        return false;
      }
      if(!frame.isMaximized) {
        frame.desktopLayout.left = x;
        frame.desktopLayout.top = y;
        frame.desktopLayout.width = width;
        frame.desktopLayout.height = height;
        frame.desktopLayout.zIndex = zIndex;
      }
      return this.saveFrame(frame);
    },
    /**
     * Remove a frame from a dashboard
     * @method removeFrame
     * @param frameId
     * @returns
     */
    removeFrame: function(frameId) {
      var dashboards = this.getDashboards();
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
        return this.saveDashboard(dashboards[dashboardToUpdate]);
      }
    },
    /**
     * Change the user's current dashboard
     *
     * @method updateDashboard
     * @param updatedDashboardData
     * @returns {}
     */
    updateDashboard: function(updatedDashboard) {
      var dashboard = this.getDashboardById(updatedDashboard.id);
      dashboard.name = updatedDashboard.name;
      // if the layout changes, we need to change the stickyIndex too
      if (dashboard.layout !== updatedDashboard.layout) {
        $log.debug('dashboard layout changed for board ' + dashboard.name);
        var stickyIndex = this.getNextStickyIndex(updatedDashboard.layout);
        dashboard.layout = updatedDashboard.layout;
        dashboard.stickyIndex = stickyIndex;
        $log.debug('changing stickyIndex of board ' + dashboard.name + ' to ' + stickyIndex);
        this.saveDashboard(dashboard);
      } else {
        $log.debug('dashboard ' + dashboard.name + ' layout did not change');
      }
      return dashboard;
    },
    /**
     * Return the name of the user's current dashboard
     *
     * @method getCurrentDashboardName
     * @returns {String}
     */
    getCurrentDashboardName: function() {
      var webtopData = this.getWebtopData();
      var currentDashboardId = webtopData.currentDashboard;
      for (var i=0; i < webtopData.dashboards.length; i++) {
        if (webtopData.dashboards[i].id === currentDashboardId) {
          return webtopData.dashboards[i].name;
        }
      }
    },
    /**
     * Augment the dashboard.frames data with application-specific data
     * Note: data is not persisted, but rather the 'frames' object is modified
     * by reference
     * @method mergeApplicationData
     * @param frames
     * @param marketplaceApps
     */
    mergeApplicationData: function(frames) {
      var marketplaceApps = this.getApplicationData();

      for (var j=0; j < frames.length; j++) {
        var foundApp = false;
        for (var i=0; i < marketplaceApps.length; i++) {
          if (frames[j].appId === marketplaceApps[i].id) {
            foundApp = true;
            // if it is, then get all relevant info
            frames[j].icon = {};
            frames[j].icon.small = marketplaceApps[i].icons.small;
            frames[j].icon.large = marketplaceApps[i].icons.large;
            frames[j].url = marketplaceApps[i].launchUrls.default;
            var utils = new Utilities();
            var newUrl = utils.updateQueryString('ozpIwc.peer', $window.OzoneConfig.IWC_URL, frames[j].url);
            frames[j].trustedUrl = $sce.trustAsResourceUrl(newUrl);
            frames[j].name = marketplaceApps[i].name;
            frames[j].descriptionShort = marketplaceApps[i].descriptionShort;
            // TODO: get this data for real
            frames[j].singleton = false;
            break;
          }
        }
        if (!foundApp) {
          $log.warn('Found a frame with no corresponding application. Name: ' + frames[j].name);
          frames[j].trustedUrl = 'assets/appNotFound/index.html';
          frames[j].name = frames[j].name + ': Not Found';
          frames[j].singleton = false;
        }
      }
    },
    /**
     * Save a dashboard
     * TODO: make sure input is a valid dashboard:
     * - dashboard.id should be unique
     * - all frame.id's should be
     * @method saveDashboard
     * @param dashboard
     * @returns {}
     */
    saveDashboard: function(dashboard) {
      var foundDashboard = false;
      var dashboards = this.getDashboards();
      for (var i=0; i < dashboards.length; i++) {
        if (dashboards[i].id === dashboard.id) {
          dashboards[i] = dashboard;
          foundDashboard = true;
        }
      }
      if (foundDashboard) {
        return this.setAllDashboards(dashboards);
      } else {
        return false;
      }
    },
    /**
     * Save a frame in a dashboard
     * TODO: make sure input is a valid frame
     *
     * @method saveFrame
     * @param frame
     * @returns {}
     */
    saveFrame: function(frame) {
      var dashboards = this.getDashboards();
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
        return this.setAllDashboards(dashboards);
      } else {
        $log.error('frame ' + frame.id + ' not found');
        return false;
      }
    },
    /**
     * Retrieve a frame by id
     * @method getFrameById
     * @param frameId
     * @returns {}
     */
    getFrameById: function(frameId) {
      var dashboards = this.getDashboards();
      for (var i=0; i < dashboards.length; i++) {
        var frames = dashboards[i].frames;
        for (var j=0; j < frames.length; j++) {
          if (frames[j].id === frameId) {
            return frames[j];
          }
        }
      }
    },
    /**
     * Retrieve a dashboard by id
     * @method getDashboardById
     * @param dashboardId
     * @returns {}
     */
    getDashboardById: function(dashboardId) {
      var dashboards = this.getDashboards();
      if (!dashboards) {
        return null;
      }
      for (var i=0; i < dashboards.length; i++) {
        if (dashboards[i].id.toString() === dashboardId.toString()) {
          return dashboards[i];
        }
      }
      return null;
    },
    /**
     * Delete a dashboard
     * @method removeDashboard
     * @param dashboardId
     * @returns true if dashboard was found and removed, false otherwise
     */
    removeDashboard: function(dashboardId) {
      var dashboardData = this.getWebtopData();
      var dashboards = dashboardData.dashboards;
      var idxToRemove = -1;
      for (var i=0; i < dashboards.length; i++) {
        if (dashboards[i].id.toString() === dashboardId.toString()) {
          idxToRemove = i;
        }
      }
      if (idxToRemove >= 0) {
        dashboardData.dashboards.splice(idxToRemove,1);
        $log.debug('removed dashboard idx ' + idxToRemove);
        return setWebtopData(dashboardData);
      } else {
        $log.warn('Cannot remove dashboard with id ' + dashboardId + ', does not exit');
        return false;
      }
    },
    /**
     * Create a new dashboard
     * @method createDashboard
     * @param name
     * @returns {}
     */
    createDashboard: function(dashboard) {
      if(!dashboard.layout){
        dashboard.layout = 'grid';
      }
      var dashboardData = this.getWebtopData();
      var dashboardId = this.getNewDashboardId();
      var nextStickyIndex = this.getNextStickyIndex(dashboard.layout);
      $log.debug('creating new board with sticky slot ' + nextStickyIndex);
      var newBoard = {
        'name': dashboard.name,
        'id': dashboardId,
        'stickyIndex': nextStickyIndex,
        'layout': dashboard.layout,
        'frames': []
      };
      var dashboards = this.getDashboards();
      dashboards.push(newBoard);
      dashboardData.dashboards = dashboards;
      return setWebtopData(dashboardData);
      // return {'dashboardId':dashboardId, 'nextStickyIndex':nextStickyIndex };
    },
    /**
     * Get the next available id for a new dashboard
     * TODO: this assumes ids are integers and not uuids
     * @method getNewDashboardId
     * @returns {Promise}
     */
    getNewDashboardId: function() {
      var dashboards = this.getDashboards();
      var existingIds = [];
      var newId = -1;
      // just a simple test to determine if the dashboardData is valid. Should
      // do something better eventually
      if (Object.prototype.toString.call( dashboards ) === '[object Array]') {
        for (var i=0; i < dashboards.length; i++) {
          existingIds.push(Number(dashboards[i].id));
        }
        if (!dashboards || dashboards.length === 0) {
          newId = 0;
        } else {
          newId = Math.max.apply(Math, existingIds) + 1;
        }
        return newId.toString();
      } else {
        $log.error('ERROR: Invalid dashboard data in getNewDashboardId');
      }
    },
    /**
     * Get the next available sticky slot for a new dashboard
     */
    getNextStickyIndex: function(dashboardLayout) {
      var dashboards = this.getDashboards();
      var gridUsedStickySlots = [];
      var desktopUsedStickySlots = [];
      for (var i = 0; i < dashboards.length; i++) {
        if (dashboards[i].layout === 'grid') {
          gridUsedStickySlots.push(dashboards[i].stickyIndex);
        } else if (dashboards[i].layout === 'desktop') {
          desktopUsedStickySlots.push(dashboards[i].stickyIndex);
        } else {
          $log.error('Invalid dashboard layout');
        }
      }
      // TODO: use constants.maxStickyBoards
      for (var j=0; j < 10; j++) {
        if (dashboardLayout === 'grid') {
          if (gridUsedStickySlots.indexOf(j) < 0) {
            return j;
          }
        } else if (dashboardLayout === 'desktop') {
          if (desktopUsedStickySlots.indexOf(j) < 0) {
            return j;
          }
        } else {
          $log.error('Invalid layout passed to getNextStickyIndex: ' + dashboardLayout);
        }
      }
      $log.error('WARNING: Sticky dashboard slots are full!');
    },
    /**
     * Get the user's current dashboard
     * @method getCurrentDashboard
     * @returns {Promise}
     */
    getCurrentDashboard: function() {
      var dashboardData = this.getWebtopData();
      try {
        if (dashboardData.currentDashboard === undefined ||
            dashboardData.currentDashboard === {} ||
            dashboardData.currentDashboard === null) {
          return null;
        }
      } catch (err) {
        return null;
      }
      return this.getDashboardById(dashboardData.currentDashboard);
    },
    cascadeWindows: function(dashboardId, origin, frameSize) {
      var topOffset = 30;
      var leftOffset = 30;
      var dashboard = this.getDashboardById(dashboardId);
      for (var i=0; i < dashboard.frames.length; i++) {
        try {
          dashboard.frames[i].desktopLayout.zIndex = i;
          dashboard.frames[i].desktopLayout.top = origin.y + (i*topOffset);
          dashboard.frames[i].desktopLayout.left = origin.x + (i * leftOffset);
          dashboard.frames[i].desktopLayout.width = frameSize.x;
          dashboard.frames[i].desktopLayout.height = frameSize.y;
          dashboard.frames[i].isMaximized = false;
        }
        catch (err) {
          $log.error('Error in cascadeWindows on board ' + i + ':'  +
            JSON.stringify(err));
        }
      }
      return this.saveDashboard(dashboard);
    },
    /**
     * Get all user settings for the current user
     *
     * @method getUserSettings
     * @returns {*} All user settings for the current user
     */
    getUserSettings: function() {
      return this.getWebtopData().userSettings;
    },
    /**
     * Update all settings for the current user
     *
     * @method updateAllUserSettings
     * @param {Obj} userSettings All user settings for current user
     * @returns {Boolean} True if updated successfully, false on error
     */
    updateAllUserSettings: function(userSettings) {
      var webtopData = this.getWebtopData();
      webtopData.userSettings = userSettings;
      return setWebtopData(webtopData);
    },
    /**
     * Update a specific setting for the current user
     *
     * @method updateUserSettingsByKey
     * @param {String} key Name of user setting to update
     * @param {*} value Value of setting
     * @returns {Boolean} True if updated successfully, false on error
     */
    updateUserSettingByKey: function(key, value) {
      var webtopData = this.getWebtopData();
      if (!webtopData.userSettings) {
        webtopData.userSettings = {};
      }
      webtopData.userSettings[key] = value;
      return setWebtopData(webtopData);
    },
    /**
     * Update the backend that a notification has been dismissed
     *
     * @method dismissNotification
     * @param {Object} notification object
     * @returns {object} New object with notifications, empty if error.
     */
    dismissNotification: function(notification){
      restInterface.dismissNotification(notification).then(function(data, err){
        if(err){
          return {};
        }
        return data;
      });
    }
  };
});
