'use strict';

describe('Directive: ozpToolbar', function () {

    // load the directive's module
    beforeEach(module('ozpWebtopApp'));

    beforeEach(module('templates/toptoolbar.html'));
    beforeEach(module('templates/bottomtoolbar.html'));
    beforeEach(module('templates/ozpbutton.html'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function ($compile) {
        element = angular.element('<ozp-toolbar location="top" class="ozp-toolbar-top"></ozp-toolbar>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.children().length).toBeGreaterThan(0);
    }));

    it('should load a top and bottom toolbar when asked', inject(function($compile) {
        element = angular.element('<div><ozp-toolbar location="top"></ozp-toolbar>' +
                      '<ozp-toolbar location="bottom"></ozp-toolbar></div>');
        element = $compile(element)(scope);
        scope.$digest();
        var tbs = element.find('ozp-toolbar');

        var top = angular.element(tbs[0]);
        expect(top.attr('location')).toBe('top');

        var bottom = angular.element(tbs[1]);
        expect(bottom.attr('location')).toBe('bottom');
    }));
});
