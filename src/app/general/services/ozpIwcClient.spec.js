'use strict';

describe('Service: ozpIwcClient', function () {
  // load the service's module
  beforeEach(module('ozpWebtopApp'));

  // instantiate service
  var iwcConnectedClient, rootScope;
  beforeEach(inject(function ($rootScope, _iwcConnectedClient_) {
    rootScope = $rootScope.$new();
    iwcConnectedClient = _iwcConnectedClient_;

  }));

  it('can get a connected client', function() {
    iwcConnectedClient.getClient().then(function(client) {
      expect(client).isDefined();
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    rootScope.$apply();
  });

});