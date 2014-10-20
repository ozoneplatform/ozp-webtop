'use strict';

describe('Filter: elliptical', function () {

  // load the filter's module
  beforeEach(module('ozp.common'));

  // initialize a new instance of the filter before each test
  var elliptical;

  beforeEach(inject(function ($filter) {
    elliptical = $filter('elliptical');
  }));

  it('should return the first 8 characters followed by ellipsis', function () {
    var text = 'angularjs';
    expect(elliptical(text, true)).toBe('angularj ...');
  });

});
