'use strict';

describe('Service: ozpIwcClient', function () {
  // load the service's module
  beforeEach(module('ozpWebtopApp'));

  // instantiate service
  var ozpIwcClient, rootScope;
  beforeEach(inject(function ($rootScope, _ozpIwcClient_) {
    rootScope = $rootScope.$new();
    ozpIwcClient = _ozpIwcClient_;

  }));

  it('can get a connected client', function() {
    ozpIwcClient.getClient().then(function(client) {
      expect(client).isDefined();
    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    rootScope.$apply();
  });

});