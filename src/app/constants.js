'use strict';

/**
 * Constants used throughout the application
 *
 * @module ozpWebtop.constants
 */
angular.module('ozpWebtop.constants', []);

/**
 * Constants used throughout the application
 *
 * ngtype: constant
 *
 * @class constants
 * @static
 */
angular.module('ozpWebtop.constants')
/**
 * URL of OZONE bus used by the application
 *
 * @property defaultIwcOzoneBus
 * @type String
 */
.constant('defaultIwcOzoneBus', 'http://ozone-development.github.io/iwc/')
//.constant('defaultIwcOzoneBus', 'http://localhost:9044')
/**
 * Flag to use IWC
 *
 * @property useIwc
 * @type Boolean
 */
.constant('useIwc', true)

/**
 * Number of sticky dashboard slots (for each grid and desktop layouts)
 *
 * @property maxStickyBoards
 * @type Integer
 */
.constant('maxStickyBoards', 10)

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                              Events
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * Event fired when the window size changes across device size boundaries as
 * defined by Bootstrap (xs, sm, md, lg)
 *
 * @property deviceSizeChangedEvent
 * @type String
 */
.constant('deviceSizeChangedEvent', 'deviceSizeChange')

/**
 * Event fired when the window size changes by 1px or more
 *
 * @property windowSizeChangedEvent
 * @type String
 */
.constant('windowSizeChangedEvent', 'windowSizeChange')

/**
 * Event fired when the state of the active dashboard changes (frames are
 * added or removed, shown or hidden, etc)
 *
 * @property dashboardStateChangedEvent
 * @type String
 */
.constant('dashboardStateChangedEvent', 'dashboardStateChange')

/**
 * Event fired when full-screen mode is changed
 * @property fullScreenChangeEvent
 * @type String
 */
.constant('fullScreenModeToggleEvent', 'fullScreenModeToggle')


/**
 * Event fired when app icon is clicked in the app toolbar in grid layout
 * @property highlightFrameOnGridLayoutEvent
 * @type String
 */
.constant('highlightFrameOnGridLayoutEvent', 'highlightFrameOnGridLayout');
