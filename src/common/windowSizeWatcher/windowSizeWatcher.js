'use strict';

/**
 * windowSizeWatcher sends a message when the window size changes device sizes
 * as defined by Bootstrap:
 *
 * < 768px  = extra-small (xs)
 * >= 768px = small (sm)
 * >= 992 = medium (md)
 * >= 1200 = large (lg)
 *
 * @namespace ozp.common
 * @method windowSizeWatcher
 * @static
 */
angular.module('ozp.common')
.factory('windowSizeWatcher', function ($rootScope, $window) {
    var previousDeviceSize = '';
    var deviceSize = '';
    return {
      run: function() {
        $rootScope.$watch(function(){
        return $window.innerWidth;
      }, function(value) {
          // invoked each time the window size is changed (as the user drags,
          // no just on mouseup)
          // console.log('window size changed to: ' + value);
          if (value < 768) {
            deviceSize = 'xs';
          } else if (value < 992) {
            deviceSize = 'sm';
          } else if (value < 1200) {
            deviceSize = 'md';
          } else {
            deviceSize = 'lg';
          }

          if (previousDeviceSize !== deviceSize) {
            previousDeviceSize = deviceSize;
            $rootScope.$broadcast('window-size-change', {
              deviceSize: deviceSize,
            });
          }
          $rootScope.$broadcast('window-px-size-change');

         });
      },
      getCurrentSize: function() {
        return deviceSize;
      }
    };
});