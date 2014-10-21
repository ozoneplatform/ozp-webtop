'use strict';

describe('Directive: ozpButton', function () {
  // load the directive's module
  beforeEach(module('ozpWebtopApp'));
  beforeEach(module('dashboardView/button/ozpbutton.tpl.html'));

  var element,
      scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.button = {
      url:  'http://www.example.com/',
      icon: 'example.png',
      text: 'descriptive text',
      elliptical: false
    };
    element = angular.element('<ozp-button></ozp-button>');
    element = $compile(element)(scope);
    scope.$digest();
  }));

  it('should attach an image', inject(function () {
    expect(element.find('img').attr('src')).toBe(scope.button.icon);
  }));

  // TODO: fix this if we are actually using the ozpButton directive
  xit('should attach a URL', inject(function () {
    expect(element.find('.btn').attr('ng-href')).toBe(scope.button.url);
  }));

  it('should attach text', inject(function () {
    expect(element.find('span').html()).toBe(scope.button.text.slice(0,8));
  }));
});

