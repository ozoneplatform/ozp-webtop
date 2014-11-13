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
.constant('useIwc', true)

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
 * Event fired when the active dashboard is switched
 *
 * @property dashboardSwitchedEvent
 * @type String
 */
.constant('dashboardSwitchedEvent', 'dashboardSwitched')

/**
 * Event fired when the user updates their preferences (add/remove/rename
 * dashboards, change theme, etc)
 *
 * @property userPreferencesUpdatedEvent
 * @type String
 */
.constant('userPreferencesUpdatedEvent', 'userPreferencesUpdated')

/**
 * Event fired when a frame on the grid layout changes size
 *
 * @property gridFrameSizeChangeEvent
 * @type String
 */
.constant('gridFrameSizeChangeEvent', 'gridFrameSizeChange')

/**
 * Event fired to indicate that the user preferences modal dialog should be
 * displayed
 *
 * @property launchUserPreferencesModalEvent
 * @type String
 */
.constant('launchUserPreferencesModalEvent', 'launchUserPreferencesModal')

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