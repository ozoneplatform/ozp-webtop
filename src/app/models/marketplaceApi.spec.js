'use strict';

describe('Service: marketplaceApi', function () {
  // load the service's module
  beforeEach(module('ozpWebtop.models.marketplace'));

  // instantiate service
  var marketplaceApi, rootScope;
  beforeEach(inject(function ($rootScope, _marketplaceApi_) {
    rootScope = $rootScope.$new();
    marketplaceApi = _marketplaceApi_;
    marketplaceApi.createExampleMarketplace().then(function() {
      // done creating marketplace
    });
    if(!rootScope.$$phase) { rootScope.$apply(); }
  }));

  it('can retrieve all apps', function(done) {
    marketplaceApi.getAllApps().then(function(apps) {
      var appNames = [];
      for (var i = 0; i < apps.length; i++) {
        appNames.push(apps[i].name);
      }
      var idx = appNames.indexOf('Purple Circle');
      var purpleCircleApp = apps[idx];
      expect(purpleCircleApp.name).toBe('Purple Circle');
      expect(purpleCircleApp.shortDescription).toBeDefined();
      expect(purpleCircleApp.description).toBeDefined();
      expect(purpleCircleApp.launchUrls.default).toBeDefined();
      expect(purpleCircleApp.icons.small).toBeDefined();
      expect(purpleCircleApp.id).toBeDefined();
      expect(purpleCircleApp.tags).toBeDefined();
      done();
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    if(!rootScope.$$phase) { rootScope.$apply(); }

  });
});