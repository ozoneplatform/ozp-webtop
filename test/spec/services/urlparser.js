'use strict';

describe('Service: urlParser', function () {

  // load the service's module
  beforeEach(module('ozpWebtopApp'));

  // instantiate service
  var urlParser;
  beforeEach(inject(function (_urlParser_) {
    urlParser = _urlParser_;
  }));

  it('should do something', function () {
    expect(!!urlParser).toBe(true);
  });

});
