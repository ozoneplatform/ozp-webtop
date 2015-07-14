'use strict';

describe('Directive: ozpChrome', function () {
  // load the directive's module
  beforeEach(module('ozpWebtop.dashboardView.chrome'));

  beforeEach(module('userInterface/dashboardView/chrome/ozpchrome.tpl.html'));

  var element,
      scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    scope.frame = {
      name: 'ChromeName',
      icon: 'chromeIcon.png'
    };
  }));

  xit('should have a chrome icon', inject(function ($compile) {
    element = angular.element('<ozp-chrome></ozp-chrome>');
    element = $compile(element)(scope);
    scope.$digest();
    expect(element.find('img').length).toBe(1);
  }));
});
