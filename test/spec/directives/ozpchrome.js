'use strict';

describe('Directive: ozpChrome', function () {

  // load the directive's module
  beforeEach(module('ozpWebtopApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ozp-chrome></ozp-chrome>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ozpChrome directive');
  }));
});
