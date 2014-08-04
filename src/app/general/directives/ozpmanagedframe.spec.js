'use strict';

describe('Directive: ozpManagedFrame', function () {
  // load the directive's module
  beforeEach(module('ozpWebtopApp'));

  beforeEach(module('general/templates/managedframe.tpl.html'));
  beforeEach(module('general/templates/managediframe.tpl.html'));
  beforeEach(module('components/chrome/ozpchrome.tpl.html'));

  var element,
    scope,
    $httpBackend;

  beforeEach(inject(function ($rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    scope.frame = {
      'frameId': 'q1w2e3r4',
      'index': 0,
      'zIndex': 1,
      // this origin yields a normal frame during testing
      //   any other would yield an iframe
      'url': 'http://localhost:8080/demoApps/square/square.html',
      'registryUrl': '#',
      'version': '1.2.3',
      'size': {
        'top': 125,
        'left': 100,
        'horizontalSize': 200,
        'verticalSize': 200
      },
      'windowState': 'normal',
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
