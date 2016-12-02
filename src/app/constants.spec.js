'use strict';

describe('constants', function () {
  // load the service's module
  beforeEach(module('ozpWebtop'));

  var useIwc, deviceSizeChangedEvent, windowSizeChangedEvent,
    dashboardStateChangedEvent,
    fullScreenModeToggleEvent, highlightFrameOnGridLayoutEvent, removeFramesOnDeleteEvent;

  beforeEach(inject(function (_useIwc_, _deviceSizeChangedEvent_,
                              _windowSizeChangedEvent_,
                              _dashboardStateChangedEvent_,
                              _fullScreenModeToggleEvent_,
                              _highlightFrameOnGridLayoutEvent_,
                              _removeFramesOnDeleteEvent_
    ) {
    useIwc = _useIwc_;
    deviceSizeChangedEvent = _deviceSizeChangedEvent_;
    windowSizeChangedEvent = _windowSizeChangedEvent_;
    dashboardStateChangedEvent = _dashboardStateChangedEvent_;
    fullScreenModeToggleEvent = _fullScreenModeToggleEvent_;
    highlightFrameOnGridLayoutEvent = _highlightFrameOnGridLayoutEvent_;
    removeFramesOnDeleteEvent = _removeFramesOnDeleteEvent_;

  }));

  it('should define useIwc', function () {
    expect(useIwc).toBeDefined();
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

  it('should define fullScreenModeToggleEvent', function() {
    expect(fullScreenModeToggleEvent).toBe('fullScreenModeToggle');
  });

  it('should define highlightFrameOnGridLayoutEvent', function() {
    expect(highlightFrameOnGridLayoutEvent).toBe('highlightFrameOnGridLayout');
  });
});
