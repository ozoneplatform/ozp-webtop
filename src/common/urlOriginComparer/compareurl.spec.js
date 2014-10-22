'use strict';

describe('Service: Compareurl', function () {
  // load the service's module
  beforeEach(module('ozp.common'));

  // instantiate service
  var compareUrl;

  beforeEach(inject(function (_compareUrl_) {
    compareUrl = _compareUrl_;
  }));

  it('should compare origins', function() {
    var location = window.location;
    console.log('location: ' + location);
    expect(compareUrl(location)).toBe(true);
  });

  it('should return false if ports do not match', function() {
    var location = window.location.toString();
    // change location from http://localhost:9018/context.html to
    // http://localhost:10/context.html
    var re = /[\d]+/;
    location = location.replace(re, '10');
    expect(compareUrl(location)).toBe(false);
  });

  it('should return false if domains do not match', function() {
    var location = window.location.toString();
    var re = /localhost/;
    location = location.replace(re, 'remotehost');
    expect(compareUrl(location)).toBe(false);
  });
});
