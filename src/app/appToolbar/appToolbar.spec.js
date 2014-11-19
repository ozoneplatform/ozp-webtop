'use strict';

describe('App Toolbar', function () {

  var scope, marketplaceApi, dashboardApi, launchUserPreferencesModalEvent;

  // use IWC for tests?
  beforeEach(function() {
    angular.mock.module('ozpWebtop.constants', function($provide) {
      $provide.constant('useIwc', false);
    });
  });

  // load the filter's module
  beforeEach(module('ozpWebtop.appToolbar'));

  beforeEach(inject(function($rootScope, $controller, _marketplaceApi_,
    _dashboardApi_, _launchUserPreferencesModalEvent_) {
    scope = $rootScope.$new();
    marketplaceApi = _marketplaceApi_;
    dashboardApi = _dashboardApi_;
    marketplaceApi.createExampleMarketplace();
    launchUserPreferencesModalEvent = _launchUserPreferencesModalEvent_;

    // create example dashboards
    dashboardApi.createExampleDashboards().then(function() {

    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    scope.layout = 'grid';
    $controller('ApplicationToolbarCtrl', {$scope: scope});

    // For testing $rootScope events
    spyOn($rootScope, '$broadcast').and.callThrough();

    $rootScope.$apply();
  }));

  var allowedLayouts = ['grid','desktop'];

  it('should expose the layout', function() {
    expect(scope.layout).toBeDefined();
  });

  it('webtop should have layout grid or desktop', function() {
    expect(allowedLayouts).toContain(scope.layout);
  });

  it('should get a list of dashboards from the dashboardApi', function() {
      if(!scope.$$phase) { scope.$apply(); }
      expect(scope.dashboards.length).toBeGreaterThan(0);
  });

  it('should expose a setCurrentDashboard method', function() {
    var dashboard = 'test dashboard foo';
    scope.loadDashboard(dashboard);
    expect(scope.currentDashboard).toBe(dashboard);
  });

  it('should expose $scope.apps', function() {
    if(!scope.$$phase) { scope.$apply(); }
    expect(scope.apps).toBeDefined();
  });

  it('should fire a launchUserPreferencesModalEvent event', function() {
    var settingsLaunchObj = { launch: 'true' };
    scope.launchSettingsModal();
    expect(scope.$broadcast).toHaveBeenCalledWith(
      launchUserPreferencesModalEvent, settingsLaunchObj);
  });

  //WebTop is built off config file, since there are no api's currently that we would be able to get myApps, this makes sure the hard coded objects have values
  // ** Had to comment these out because the appToolbar apps come in dynamically after the activeFrames are added to scope
  // it('should have more than 0 apps in myApps', function(){
  //   expect(scope.myApps.length).toBeGreaterThan(0);
  // });

  // it('should have more than 0 apps in myPinnedApps', function(){
  //   expect(scope.myPinnedApps.length).toBeGreaterThan(0);
  // });
  // TODO: more tests


});