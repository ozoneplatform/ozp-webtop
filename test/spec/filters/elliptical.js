'use strict';

describe('Filter: elliptical', function () {

  // load the filter's module
  beforeEach(module('ozpWebtopApp'));

  // initialize a new instance of the filter before each test
  var elliptical;
  beforeEach(inject(function ($filter) {
    elliptical = $filter('elliptical');
  }));

  it('should return the input prefixed with "elliptical filter:"', function () {
    var text = 'angularjs';
    expect(elliptical(text)).toBe('elliptical filter: ' + text);
  });

});
