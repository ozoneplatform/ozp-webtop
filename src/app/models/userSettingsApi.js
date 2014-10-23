'use strict';

/**
 * User Settings model
 *
 * @module ozpWebtop.models.userSettings
 * @requires ozpWebtop.constants
 * @requires ozpWebtop.services.iwcInterface
 * @requires ozpWebtop.services.localStorageInterface
 */
angular.module('ozpWebtop.models.userSettings', [
  'ozpWebtop.constants',
  'ozpWebtop.services.iwcInterface',
  'ozpWebtop.services.localStorageInterface']);

var models = angular.module('ozpWebtop.models.userSettings');

function generalUserSettingsdModel(persistStrategy) {

  return {
    /**
     * Get all user settings for the current user
     *
     * @method getUserSettings
     * @returns {*} All user settings for the current user
     */
    getUserSettings: function() {
      return persistStrategy.getUserSettings().then(function(response) {
        return response;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Update all settings for the current user
     *
     * @method updateAllUserSettings
     * @param {Obj} userSettings All user settings for current user
     * @returns {Boolean} True if updated successfully, false on error
     */
    updateAllUserSettings: function(userSettings) {
      return persistStrategy.setUserSettingsData(userSettings).then(function(response) {
        return response;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
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
      var that = this;
      return this.getUserSettings().then(function(userSettings) {
        userSettings[key] = value;
        return that.updateAllUserSettings(userSettings).then(function(response) {
          return response;
        }).catch(function(error) {
          console.log('should not have happened: ' + error);
        });
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Create default settings for the current user - for testing only
     *
     * @method createExampleUserSettings
     * @returns {*}
     */
    createExampleUserSettings: function() {
      var userSettings = {
        'theme': 'dark'
      };
      return this.updateAllUserSettings(userSettings).then(function(response) {
        return response;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    }
  };
}

/**
 * Angular service which provides a local storage interface to the userSettings api.
 *
 * @private
 * @constructor
 */
models.service('userSettingsModelLocalStorage', function(localStorageInterface) {
  var model = generalUserSettingsdModel(localStorageInterface);
  for (var prop in model) {
    if (model.hasOwnProperty(prop)) {
      this[prop] = model[prop];
    }
  }
});

/**
 * Angular service which uses the Inter-Widget Communication (IWC) API to store
 * and retrieve user settings.
 *
 * ngtype: service
 *
 * @private
 * @constructor
 */
models.service('userSettingsModelIwc', function(iwcInterface) {
  var model = generalUserSettingsdModel(iwcInterface);
  for (var prop in model) {
    if (model.hasOwnProperty(prop)) {
      this[prop] = model[prop];
    }
  }
});

/**
 * Service used to store and retrieve user settings
 *
 * May be configured with different persistence mechanisms including IWC
 * and Local Storage
 *
 * ngtype: factory
 *
 * @class userSettingsApi
 * @static
 * @namespace models
 */
models.factory('userSettingsApi', function($injector, useIwc) {
  if (useIwc) {
    return $injector.get('userSettingsModelIwc');
  } else if (useIwc === false){
    return $injector.get('userSettingsModelLocalStorage');

  }
  else {
    console.log('ERROR: useIwc is undefined!');
  }
});
