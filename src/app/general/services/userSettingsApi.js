'use strict';

var apis = angular.module('ozpWebtopApp.apis');

function generalUserSettingsdModel(persistStrategy) {

  return {
    getUserSettings: function() {
      return persistStrategy.getUserSettings().then(function(response) {
        return response;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    updateAllUserSettings: function(userSettings) {
      return persistStrategy.setUserSettingsData(userSettings).then(function(response) {
        return response;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
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
    createExampleUserSettings: function() {
      var userSettings = {
        'theme': 'dark',
        'autohideToolbars': false
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
 * @namespace apis
 * @constructor
 */
apis.service('userSettingsModelLocalStorage', function(localStorageInterface) {
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
 * @constructor
 */
apis.service('userSettingsModelIwc', function(iwcInterface) {
  var model = generalUserSettingsdModel(iwcInterface);
  for (var prop in model) {
    if (model.hasOwnProperty(prop)) {
      this[prop] = model[prop];
    }
  }
});

/**
 * Angular service which provides an abstraction of the implementations used to
 * store and retrieve user settings information.
 *
 * @class userSettingsApi
 * @constructor
 */
apis.factory('userSettingsApi', function($injector, useIwc) {
  if (useIwc) {
    return $injector.get('userSettingsModelIwc');
  } else if (useIwc === false){
    return $injector.get('userSettingsModelLocalStorage');

  }
  else {
    console.log('ERROR: useIwc is undefined!');
  }
});
