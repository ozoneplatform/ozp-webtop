'use strict';

/**
 * Send a message when the window size changes device sizes
 * as defined by Bootstrap:
 *
 * * lt 768px  = extra-small (xs)
 * * gte 768px = small (sm)
 * * gte 992 = medium (md)
 * * gte 1200 = large (lg)
 *
 * ngtype: factory
 *
 * @namespace common
 * @class windowSizeWatcher
 * @constructor
 * @param $rootScope ng $rootScope
 * @param $window ng $window
 * @param deviceSizeChangedEvent event name
 * @param windowSizeChangedEvent event name
 */
angular.module('ozp.common')
.factory('windowSizeWatcher', function ($rootScope, $window,
                                        deviceSizeChangedEvent,
                                        windowSizeChangedEvent) {
    var previousDeviceSize = '';
    var deviceSize = '';
    return {
      /**
       * Activate the windowSizeWatcher
       * @method run
       */
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
            $rootScope.$broadcast(deviceSizeChangedEvent, {
              deviceSize: deviceSize
            });
          }
          $rootScope.$broadcast(windowSizeChangedEvent);

         });
      },
      /**
       * Get the current device size
       *
       * @method getCurrentSize
       * @returns {string} device size, one of xs, sm, md, or lg
       */
      getCurrentSize: function() {
        return deviceSize;
      }
    };
});