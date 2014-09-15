'use strict';

describe('Service: userSettingsApi', function () {
  // load the service's module
  beforeEach(module('ozpWebtopApp'));

  // instantiate service
  var userSettingsApi;
  beforeEach(inject(function (_userSettingsApi_) {
    userSettingsApi = _userSettingsApi_;
    userSettingsApi.createExampleUserSettings();
  }));

  it('can retrieve all settings', function() {

    var settings = userSettingsApi.getUserSettings();
    expect(settings.theme).toBeDefined();
    expect(settings.autohideToolbars).toBeDefined();
  });

  it('should have a updateUserSettingByKey method', function() {
    userSettingsApi.updateUserSettingByKey('isAppboardHidden', true);
    console.log(userSettingsApi.getUserSettings().isAppboardHidden);
    expect(userSettingsApi.getUserSettings().isAppboardHidden).toEqual(true);

    userSettingsApi.updateUserSettingByKey('isDashboardHidden', true);
    expect(userSettingsApi.getUserSettings().isDashboardHidden).not.toEqual(false);
  });

});