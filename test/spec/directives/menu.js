'use strict';

describe('Directive: menu', function () {

    // load the directive's module
    beforeEach(module('ozpWebtopApp.directives'));

    beforeEach(module('templates/ozpbutton.html'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    xit('should show a menu', inject(function($compile) {
        element = angular.element('<ozp-menu></ozp-menu>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.children().length).toBeGreaterThan(0);
    }));
});
