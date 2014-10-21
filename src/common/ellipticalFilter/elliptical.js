'use strict';

angular.module('ozp.common')
/**
 * elliptical filter
 *
 * ngtype: filter
 *
 * @class elliptical
 * @static
 * @namespace ozp.common
 */
.filter('elliptical', function () {
  // Specifying a maxLength is optional
  var LENGTH_DEFAULT = 8;

  /**
   * Truncate a string of text and add an ellipsis
   *
   * @method elliptical
   * @param {String} text a string of text
   * @param {Boolean} ellipOption a flag if an ellipsis is desired
   * @param {Number} [maxLength] the maximum length the string can be
   * @return {String} truncated input, optionally with an ellipsis
   */
  return function (text, ellipOption, maxLength) {
    maxLength = maxLength || LENGTH_DEFAULT;

    var shortenedText = text.slice(0, maxLength);
    if (ellipOption && shortenedText !== text) {
      shortenedText += ' ...';
    }
    // Note: If we want to use '&hellip;' we will need use ngBindHtml
    return shortenedText;
  };
});
