'use strict';

describe('Directive: ozpToolbar', function () {

  // load the directive's module
  beforeEach(module('ozpWebtopApp'));

  beforeEach(module('templates/toptoolbar.html'));
  beforeEach(module('templates/bottomtoolbar.html'));
  beforeEach(module('templates/ozpbutton.html'));

  var element,
    scope,
    attrs;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ozp-toolbar location="top" class="ozp-toolbar-top"></ozp-toolbar>');
    element = $compile(element)(scope);
    scope.$digest();
    expect(element.children().length).toBeGreaterThan(0);
  }));
});
