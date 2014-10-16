'use strict';

/**
 * Constants used throughout the application
 *
 * ngtype: constant
 *
 * @class constants
 * @static
 */
angular.module('ozpWebtopApp.constants')
/**
 * URL of OZONE bus used by the application
 *
 * @property iwcOzoneBus
 * @type String
 */
.constant('iwcOzoneBus', 'http://ozone-development.github.io/iwc/')
//.constant('iwcOzoneBus', 'http://localhost:9044')
/**
 * Flag to use IWC
 *
 * @property useIwc
 * @type Boolean
 */
.constant('useIwc', false);