'use strict';

describe('Directive: ozp-gridster-item', function () {
  // load the directive's module
  beforeEach(module('ozpWebtop.dashboardView.grid.gridsterFrame'));

  var element,
    scope,
    $httpBackend;

  beforeEach(inject(function ($rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    scope.tmp = {
      url: 'http://127.0.0.1:9000/test.html'
    };
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    $httpBackend.whenGET('templates/managediframe.html').respond();
    $httpBackend.whenGET('templates/managedframe.html').respond();

    element = angular.element('<li ozp-gridster-item frame="tmp"></li>');
    element = $compile(element)(scope);
    scope.$digest();
    expect(element.attr('class')).toBe('ng-scope ng-isolate-scope');
  }));
});
