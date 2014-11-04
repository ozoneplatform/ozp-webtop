'use strict';

describe('Service: userSettingsApi', function () {
  // load the service's module
  beforeEach(module('ozpWebtop.models.userSettings'));

  // instantiate service
  var userSettingsApi, rootScope;
  beforeEach(inject(function ($rootScope, _userSettingsApi_) {
    userSettingsApi = _userSettingsApi_;
    rootScope = $rootScope.$new();
    userSettingsApi.createExampleUserSettings();
  }));

  it('can get all settings', function(done) {
    var settings = {'theme': 'dark', 'data': 'stuff'};
    userSettingsApi.updateAllUserSettings(settings).then(function(response) {
      expect(response).toEqual(true);
      userSettingsApi.getUserSettings().then(function(updatedSettings) {
        expect(updatedSettings.data).toEqual('stuff');
        done();
      }).catch(function(error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

  it('can retrieve all settings', function(done) {

    userSettingsApi.getUserSettings().then(function(settings) {
      expect(settings.theme).toBeDefined();
      done();
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }

  });

  it('should have a updateUserSettingByKey method', function(done) {
    userSettingsApi.updateUserSettingByKey('fullScreenMode', true).then(function(resp) {
      expect(resp).toEqual(true);
      userSettingsApi.getUserSettings().then(function(settings) {
        expect(settings.fullScreenMode).toEqual(true);
        done();
      }).catch(function(error) {
        expect(error).toEqual('should not have happened');
      });
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }
  });

});