'use strict';

/**
 * Utility functions
 *
 * @namespace general
 * @constructor
 */
angular.module('ozpWebtopApp.general').factory('Utilities', function() {

  // TODO: make self-executing?
  var utilities = function() {

    return {
      // Generate uuid
      generateUuid: function () {
        // borrowed from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;  // jshint ignore:line
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x7|0x8)).toString(16); // jshint ignore:line
        });
        return uuid;
      },
      // Eliminate duplicate values from an array
      eliminateDuplicates: function (arr) {
        var i,
        len=arr.length,
        out=[],
        obj={};

        for (i=0;i<len;i++) {
          obj[arr[i]]=0;
        }
        for (i in obj) {
          out.push(i);
        }
        return out;
      }
    };
  };

  return utilities;
});