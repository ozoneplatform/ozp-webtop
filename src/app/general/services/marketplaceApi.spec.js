'use strict';

describe('Service: marketplaceApi', function () {
  // load the service's module
  beforeEach(module('ozpWebtopApp'));

  // instantiate service
  var marketplaceApi;
  beforeEach(inject(function (_marketplaceApi_) {
    marketplaceApi = _marketplaceApi_;
  }));

  it('Marketplace can create a sample marketplace and retrieve all apps', function() {

    var apps = marketplaceApi.getAllApps();
    var appNames = [];
    for (var i = 0; i < apps.length; i++) {
      appNames.push(apps[i].name);
    }
    var idx = appNames.indexOf('Purple Circle');
    var purpleCircleApp = apps[idx];
    expect(purpleCircleApp.name).toBe('Purple Circle');
    expect(purpleCircleApp.version).toBeDefined();
    expect(purpleCircleApp.shortDescription).toBeDefined();
    expect(purpleCircleApp.description).toBeDefined();
    expect(purpleCircleApp.url).toBeDefined();
    expect(purpleCircleApp.icon).toBeDefined();
    expect(purpleCircleApp.id).toBeDefined();
    expect(purpleCircleApp.keywords).toBeDefined();
  });
});