'use strict';

describe('Controller: OzpToolbar', function () {

  var scope, rootScope, launchUserPreferencesModalEvent;

  // use IWC for tests?
  beforeEach(function() {
    angular.mock.module('ozpWebtop.constants', function($provide) {
      $provide.constant('useIwc', false);
    });
  });

  beforeEach(module('ozpWebtop.ozpToolbar'));

  beforeEach(inject(function(_$rootScope_, $controller,
                             _launchUserPreferencesModalEvent_) {
    rootScope = _$rootScope_;
    launchUserPreferencesModalEvent = _launchUserPreferencesModalEvent_;

    // Scope setup
    scope = rootScope.$new();

    // For testing $rootScope events
    spyOn(rootScope, '$broadcast').and.callThrough();

    $controller('OzpToolbarCtrl', {
        $scope: scope
      });

  }));

  it('should get a user', function() {
    if(!scope.$$phase) { scope.$apply(); }
    expect(scope.user).toBeDefined();
  });

  it('should fire a launchUserPreferencesModalEvent event', function() {
    var settingsLaunchObj = { launch: 'true' };
    scope.launchSettingsModal();
    expect(rootScope.$broadcast).toHaveBeenCalledWith(
      launchUserPreferencesModalEvent, settingsLaunchObj);
  });
});