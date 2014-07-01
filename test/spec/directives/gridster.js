'use strict';

describe('Directive: gridster', function () {

    // load the directive's module
    beforeEach(module('ozpWebtopApp'));

    beforeEach(module('templates/gridster.html'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function ($compile) {
        element = angular.element('<gridster></gridster>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.attr('class')).toBe('ng-scope');
    }));
});
