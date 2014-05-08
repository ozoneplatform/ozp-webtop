beforeEach(function() {
    this.addMatchers({

        // Jasmine matcher to check if an element has a given class
        toHaveClass: function(cls) {
            this.message = function() {
                return "Expected '" + angular.mock.dump(this.actual) + "' to have class '" + cls + "'.";
            };

            return this.actual.hasClass(cls);
        }
    });
});