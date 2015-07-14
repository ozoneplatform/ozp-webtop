'use strict';

/**
*
* @module ozpWebtop.filters
*
*/
angular.module('ozpWebtop.filters', [])

/**
 * Filter for converting date to user friendly format
*/
.filter('cmdate', [
  '$filter', function($filter) {
    return function(input, format) {
      return $filter('date')(new Date(input), format) + ' ' + String(String(new Date()).split('(')[1]).split(')')[0];
    };
  }
]);
