'use strict';

describe('Filter: elliptical', function () {

  // load the filter's module
  beforeEach(module('ozp.common.ellipticalFilter'));

  // initialize a new instance of the filter before each test
  var elliptical;

  beforeEach(inject(function ($filter) {
    elliptical = $filter('elliptical');
  }));

  it('should return the first 8 characters followed by ellipsis', function () {
    var text = 'angularjs';
    expect(elliptical(text, true)).toBe('angularj ...');
  });

  it('should return the matching text if shorter than the max length',
    function() {
      var text = 'short67';
      expect(elliptical(text, false)).toBe(text);
      // specifying an ellipsis shouldn't do anything
      expect(elliptical(text, true)).toBe(text);
  });

  it('should support truncation without an ellipsis', function() {
    var text = 'somethinglonger';
    expect(elliptical(text, false)).toBe('somethin');
  });

  it('should support custom truncation lengths', function() {
    var text = 'short';
    expect(elliptical(text, false, 3)).toBe('sho');
    expect(elliptical(text, true, 3)).toBe('sho ...');

    text = 'this is something longer';
    expect(elliptical(text, false, 12)).toBe('this is some');
    expect(elliptical(text, true, 12)).toBe('this is some ...');
  });

});
