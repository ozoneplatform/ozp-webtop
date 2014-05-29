'use strict';

describe('Service: Compareurl', function () {

  // load the service's module
  beforeEach(module('ozpWebtopApp'));

  // instantiate service
  var Compareurl;
  beforeEach(inject(function (_Compareurl_) {
    Compareurl = _Compareurl_;
  }));

  it('should do something', function () {
    expect(!!Compareurl).toBe(true);
  });

});
