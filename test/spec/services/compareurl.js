'use strict';

describe('Service: Compareurl', function () {

    // load the service's module
    beforeEach(module('ozpWebtopApp'));

    // instantiate service
    var compareUrl;

    beforeEach(inject(function (_compareUrl_) {
        compareUrl = _compareUrl_;
    }));

    it('should do something', function () {
        expect(angular.isFunction(compareUrl)).toBe(true);
    });

    it('should compare origins', function() {
        var location = window.location;
        expect(compareUrl(location)).toBe(true);
    });

});
