'use strict';

describe('Service: Compareurl', function () {
  // load the service's module
  beforeEach(module('ozp.common'));

  // instantiate service
  var compareUrl;

  beforeEach(inject(function (_compareUrl_) {
    compareUrl = _compareUrl_;
  }));

  // TODO: re-enable this
  xit('test compareUrl function', function () {
    expect(angular.isFunction(compareUrl)).toBe(true);
  });

  // TODO: re-enable this
  xit('should compare origins', function() {
    var location = window.location;
    expect(compareUrl(location)).toBe(true);
  });
});
