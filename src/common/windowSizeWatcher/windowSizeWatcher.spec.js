'use strict';

describe('ozp.common: windowSizeWatcher', function () {

  // load the module
  beforeEach(module('ozp.common'));

  // initialize a new instance of the service before each test
  var $rootScope, windowSizeWatcher, $window, windowSizeChangedEvent,
    deviceSizeChangedEvent;

  beforeEach(inject(function (_$rootScope_, _windowSizeWatcher_, _$window_,
    _windowSizeChangedEvent_, _deviceSizeChangedEvent_){
    $rootScope = _$rootScope_;
    windowSizeWatcher = _windowSizeWatcher_;
    $window = _$window_;
    windowSizeChangedEvent = _windowSizeChangedEvent_;
    deviceSizeChangedEvent = _deviceSizeChangedEvent_;
    spyOn($rootScope, '$broadcast').and.callThrough();
  }));

  it('should support all Bootstrap device sizes', function () {
    windowSizeWatcher.run();
    // test xs
    $window.innerWidth = 767;
    if(!$rootScope.$$phase) {
      $rootScope.$apply();
    }
    expect(windowSizeWatcher.getCurrentSize()).toEqual('xs');

    // test sm
    $window.innerWidth = 768;
    if(!$rootScope.$$phase) {
      $rootScope.$apply();
    }
    expect(windowSizeWatcher.getCurrentSize()).toEqual('sm');

    // test md
    $window.innerWidth = 992;
    if(!$rootScope.$$phase) {
      $rootScope.$apply();
    }
    expect(windowSizeWatcher.getCurrentSize()).toEqual('md');

    // test lg
    $window.innerWidth = 1200;
    if(!$rootScope.$$phase) {
      $rootScope.$apply();
    }
    expect(windowSizeWatcher.getCurrentSize()).toEqual('lg');
  });

  it('should broadcast an event whenever the device size or window size' +
    ' changes', function() {

    windowSizeWatcher.run();
    // test xs
    $window.innerWidth = 756;
    if(!$rootScope.$$phase) {
     $rootScope.$apply();
    }

    // expect 2 broadcast events - a device size change and a window size change
    expect($rootScope.$broadcast.calls.count()).toEqual(2);

    expect($rootScope.$broadcast).toHaveBeenCalledWith(deviceSizeChangedEvent,
      {deviceSize : 'xs'});
    // window size will change also
    expect($rootScope.$broadcast).toHaveBeenCalledWith(windowSizeChangedEvent);

    $rootScope.$broadcast.calls.reset();

    $window.innerWidth = 755;
    if(!$rootScope.$$phase) {
     $rootScope.$apply();
    }

    // device size didn't change, so we should get a single broadcast event
    // for window size change
    expect($rootScope.$broadcast.calls.count()).toEqual(1);
    // should broadcast windowSizeChangedEvent if deviceSize doesn't change
    expect($rootScope.$broadcast).toHaveBeenCalledWith(windowSizeChangedEvent);

  });

});
