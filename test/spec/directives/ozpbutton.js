'use strict';

describe('Directive: ozpButton', function () {

  // load the directive's module
  beforeEach(module('ozpWebtopApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ozp-button></ozp-button>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ozpButton directive');
  }));
});
