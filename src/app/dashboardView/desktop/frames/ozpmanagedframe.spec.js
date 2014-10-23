'use strict';

describe('Directive: ozpManagedFrame', function () {
  // load the directive's module
  beforeEach(module('ozpWebtop.dashboardView.desktop.managedFrame'));

  beforeEach(module('dashboardView/templates/managedframe.tpl.html'));
  beforeEach(module('dashboardView/templates/managediframe.tpl.html'));
  beforeEach(module('dashboardView/chrome/ozpchrome.tpl.html'));

  var element,
    scope,
    $httpBackend;

  beforeEach(inject(function ($rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    scope.frame = {
      'id': '342f3680-18c9-11e4-8c21-0800200c9a66',
      'appId': '194f3680-18c9-11e4-8c21-0800200c9b98',
      'gridLayout': {
        'row': 1,
        'col': 1,
        'sizex': 1,
        'sizey': 1
      },
      'desktopLayout': {
        'zIndex': 0,
        'top': 25,
        'left': 100,
        'width': 200,
        'height': 200
      },
      // this origin yields a normal frame during testing
      //   any other would yield an iframe
      'url': 'http://localhost:8080/demoApps/square/square.html',
      'name': 'Square',
      'icon': 'images/UserFolder.png'
    };
  }));

  it('should make hidden element visible', inject(function ($compile) {
    $httpBackend.whenGET('http://localhost:8080/demoApps/square/square.html').respond();

    element = angular.element('<ozp-managed-frame></ozp-managed-frame>');
    element = $compile(element)(scope);
    scope.$digest();
    expect(element.children().length).toBeGreaterThan(0);
  }));
});
