'use strict';

/**
 * elliptical Filter to truncate a string of text and add an ellipsis, if
 * desired by the state
 *
 * @namespace filters
 * @method elliptical
 * @param {String} text a string of text
 * @param {Boolean} ellipOption a flag if an ellipsis is desired
 * @param {Number} [maxLength] the maximum length the string can be
 */
angular.module('ozpWebtopApp.general')
  .filter('elliptical', function () {
    // Specifying a maxLength is optional
    var LENGTH_DEFAULT = 8;

    return function (text, ellipOption, maxLength) {
      maxLength = maxLength || LENGTH_DEFAULT;

      // If text is shorter than maxLength, or if we don't want an ellisis...
      if (text.length < maxLength || !ellipOption) {
        // Do nothing.
        return text;
      } else {
        // Note: If we want to use '&hellip;' we will need use ngBindHtml
        return text.slice(0, maxLength) + ' ...';
      }
    };
  });
