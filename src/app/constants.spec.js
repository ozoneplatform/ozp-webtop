'use strict';

describe('constants', function () {
  // load the service's module
  beforeEach(module('ozpWebtop'));

  var useIwc, iwcOzoneBus, deviceSizeChangedEvent, windowSizeChangedEvent,
    dashboardStateChangedEvent, dashboardSwitchedEvent,
    userPreferencesUpdatedEvent,
    gridFrameSizeChangeEvent, launchUserPreferencesModalEvent,
    fullScreenModeToggleEvent;

  beforeEach(inject(function (_useIwc_, _iwcOzoneBus_, _deviceSizeChangedEvent_,
                              _windowSizeChangedEvent_,
                              _dashboardStateChangedEvent_,
                              _dashboardSwitchedEvent_,
                              _userPreferencesUpdatedEvent_,
                              _gridFrameSizeChangeEvent_,
                              _launchUserPreferencesModalEvent_,
                              _fullScreenModeToggleEvent_
    ) {
    useIwc = _useIwc_;
    iwcOzoneBus = _iwcOzoneBus_;
    deviceSizeChangedEvent = _deviceSizeChangedEvent_;
    windowSizeChangedEvent = _windowSizeChangedEvent_;
    dashboardStateChangedEvent = _dashboardStateChangedEvent_;
    dashboardSwitchedEvent = _dashboardSwitchedEvent_;
    userPreferencesUpdatedEvent = _userPreferencesUpdatedEvent_;
    gridFrameSizeChangeEvent = _gridFrameSizeChangeEvent_;
    launchUserPreferencesModalEvent = _launchUserPreferencesModalEvent_;
    fullScreenModeToggleEvent = _fullScreenModeToggleEvent_;

  }));

  it('should define useIwc', function () {
    expect(useIwc).toBeDefined();
  });

  it('should define iwcOzoneBus', function() {
    expect(iwcOzoneBus).toBe('http://ozone-development.github.io/iwc/');
  });

  it('should define deviceSizeChangedEvent', function() {
    expect(deviceSizeChangedEvent).toBe('deviceSizeChange');
  });

  it('should define windowSizeChangedEvent', function() {
    expect(windowSizeChangedEvent).toBe('windowSizeChange');
  });

  it('should define dashboardStateChangedEvent', function() {
    expect(dashboardStateChangedEvent).toBe('dashboardStateChange');
  });

  it('should define dashboardSwitchedEvent', function() {
    expect(dashboardSwitchedEvent).toBe('dashboardSwitched');
  });

  it('should define userPreferencesUpdatedEvent', function() {
    expect(userPreferencesUpdatedEvent).toBe('userPreferencesUpdated');
  });

  it('should define gridFrameSizeChangeEvent', function() {
    expect(gridFrameSizeChangeEvent).toBe('gridFrameSizeChange');
  });

  it('should define launchUserPreferencesModalEvent', function() {
    expect(launchUserPreferencesModalEvent).toBe('launchUserPreferencesModal');
  });
  it('should define fullScreenModeToggleEvent', function() {
    expect(fullScreenModeToggleEvent).toBe('fullScreenModeToggle');
  });
});