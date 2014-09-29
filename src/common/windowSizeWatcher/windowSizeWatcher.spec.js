'use strict';

describe('ozp.common: windowSizeWatcher', function () {

  // load the module
  beforeEach(module('ozp.common'));

  // initialize a new instance of the service before each test
  var windowSizeWatcher;

  beforeEach(inject(function (_windowSizeWatcher_) {
    windowSizeWatcher = _windowSizeWatcher_;
  }));

  it('should have a run method', function () {
    expect(typeof windowSizeWatcher.run).toEqual('function');
  });

});
