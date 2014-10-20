'use strict';

describe('constants', function () {
  // load the service's module
  beforeEach(module('ozpWebtopApp'));

  var useIwc, iwcOzoneBus;
  beforeEach(inject(function (_useIwc_, _iwcOzoneBus_) {
    useIwc = _useIwc_;
    iwcOzoneBus = _iwcOzoneBus_;

  }));

  it('should define useIwc', function () {
    expect(useIwc).toBeDefined();
  });

  xit('should define iwcOzoneBus', function() {
    expect(iwcOzoneBus).toBe('http://ozone-development.github.io/iwc/');
  });

});