'use strict';

describe('Controller: OzpToolbar', function () {

  var scope, rootScope;

  // use IWC for tests?
  beforeEach(function() {
    angular.mock.module('ozpWebtop.constants', function($provide) {
      $provide.constant('useIwc', false);
    });
  });

  beforeEach(module('ozpWebtop.ozpToolbar'));

  beforeEach(inject(function(_$rootScope_, $controller) {
    rootScope = _$rootScope_;

    // Scope setup
    scope = rootScope.$new();

    $controller('OzpToolbarCtrl', {
        $scope: scope
      });

  }));

  xit('should get a user', function() {
    if(!scope.$$phase) { scope.$apply(); }
    expect(scope.user).toBeDefined();
  });
});