'use strict';

describe('Controller: ChromeCtrl', function () {

  // load the controller's module
  beforeEach(module('ozpWebtop.dashboardView.chrome'));

  var ctrl;
  var models;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $injector, $rootScope) {

    models = $injector.get('models');
    scope = $rootScope.$new();
    ctrl = $controller('ChromeCtrl', { $scope: scope });
    if(!$rootScope.$$phase) { $rootScope.$apply(); }
  }));

  xit('should minimize a frame', function () {
    // TODO: Minimize a frame and test that it is done
  });

  xit('should maximize a frame', function () {
    // TODO: Maximize a frame and ensure it is done
  });

  describe('#toggleFrameMinimized', function() {
    beforeEach(function() {
      scope.dashboardId = 'burger-board';
      scope.frame = { id: 'pizza-board' };
      scope.layout = '3d';
      spyOn(models, 'toggleFrameKey');
    });

    it('should call `toggleFrameKey` on the models service with the app\'s ID', function() {
      scope.toggleFrameMinimized();
      expect(models.toggleFrameKey).toHaveBeenCalledWith('pizza-board', 'isMinimized');
    });

    it('should emit a dashboardStateChangedEvent', inject(function($rootScope, dashboardStateChangedEvent) {
      spyOn($rootScope, '$broadcast');
      scope.toggleFrameMinimized();

      expect($rootScope.$broadcast).toHaveBeenCalledWith(dashboardStateChangedEvent, {
        dashboardId: 'burger-board',
        layout: '3d'
      });
    }));
  });

});