'use strict';

describe('Directive: ozpButton', function () {
  // load the directive's module
  beforeEach(module('ozpWebtopApp'));
  beforeEach(module('components/button/ozpbutton.tpl.html'));

  var element,
      scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    scope.button = {
      url:  'http://www.example.com/',
      icon: 'example.png',
      text: 'descriptive text',
      elliptical: false
    };
  }));

  it('should should attach an image', inject(function ($compile) {
    element = angular.element('<ozp-button></ozp-button>');
    element = $compile(element)(scope);
    scope.$digest();
    expect(element.find('img').length).toBe(1);
  }));
});

