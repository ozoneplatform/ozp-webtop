'use strict';

describe('Directive: ozpIcon', function () {

    // load the directive's module
    beforeEach(module('ozpWebtopApp'));

    beforeEach(module('templates/ozpicon.html'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
        scope.icon = {
            icon: 'example.png',
            text: 'Some text'
        };
    }));

    it('should attach an image', inject(function ($compile) {
        element = angular.element('<ozp-icon></ozp-icon>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.find('img').length).toBe(1);
    }));
});
