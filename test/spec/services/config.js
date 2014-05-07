'use strict';

describe('Service: Config', function () {

    // load the service's module
    beforeEach(module('ozpWebtopApp.services'));

    var Config, $httpBackend, $q, defer;

    var dummyData = ['eins', 'zwei', 'drei', 'vier'];

    // For background on this spec - see link below, and Angular's docs for $httpBackend
    // http://stackoverflow.com/questions/15833462/angularjs-need-help-to-unit-test-a-factory-with-promise

    beforeEach(inject(function (_Config_, _$httpBackend_, _$q_) {
        Config = _Config_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        defer = $q.defer();
        // Fake a backend response
        $httpBackend.whenGET('config/menu.json').respond(dummyData);
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a request for json data', function () {
        $httpBackend.expectGET('config/menu.json');
        Config.configure();
        $httpBackend.flush();
    });

    it('should have a Config.configure() function', function() {
        expect(angular.isFunction(Config.configure)).toBe(true);
    });

    it('Config.configure() should return data', function() {
        var data;

        Config.configure().then(function (result) {
            data = result;
        });

        $httpBackend.flush();
        expect(data).toEqual(dummyData);
    });

});
