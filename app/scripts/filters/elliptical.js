'use strict';

/**
 * ozpManagedFrame includes an html document in the webtop
 *
 * @namespace directives
 * @method elliptical
 * @param {String} text a string of text
 * @param {Number} maxLength the maximum length the string can be
 */
angular.module('ozpWebtopApp.filters')
    .filter('elliptical', function () {
        // Specifying a maxLength is optional
        var LENGTH_DEFAULT = 8;

        return function (text, maxLength) {
            maxLength = maxLength || LENGTH_DEFAULT;
            if (text.length < maxLength) {
                return text;
            } else {
                // If we want to use '&hellip;' we will need to override $sce here
                return text.slice(0, maxLength) + ' ...';
            }

        };
    });
