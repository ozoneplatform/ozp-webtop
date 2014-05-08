'use strict';

describe('Directive: ozpTopToolbar', function () {

    // Load the directive's module
    beforeEach(module('ozpWebtopApp.directives'));

    // Load the template module
    beforeEach(module('Templates'));

    var element,
    scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    beforeEach(inject(function($rootScope, $compile) {
        element = angular.element('<div ozp-top-toolbar></div>');
 
        scope = $rootScope;
 
        scope.search = '';
 
        $compile(element)(scope);
        scope.$digest();
    }));

    it('should include a search bar', function () {
        var searchBar = element.find('input[type="text"]');
        expect(searchBar.length).toEqual(1);
        expect(searchBar).toHaveClass('ozp-search');
    });

    //it('')

});
