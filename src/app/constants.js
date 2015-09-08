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
 * Flag to use IWC
 *
 * @property useIwc
 * @type Boolean
 */
.constant('useIwc', false)

/**
 * Number of sticky dashboard slots (for each grid and desktop layouts)
 *
 * @property maxStickyBoards
 * @type Integer
 */
.constant('maxStickyBoards', 10)

/**
 * length of delay for tooltips to appear
 * @property tooltipDelay
 * @type Number
 */
.constant('tooltipDelay', 400)

/**
 * maximum number of widget that can be in a dashboard
 * @property dashboardMaxWidgets
 * @type Number
 */
.constant('dashboardMaxWidgets', 15)

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
.constant('highlightFrameOnGridLayoutEvent', 'highlightFrameOnGridLayout')

/**
 * Event fired when a dashboard is closed to remove its frames.
 * @property removeFrameOnDeleteEvent
 * @type String
 */
.constant('removeFramesOnDeleteEvent', 'removeFramesOnDelete')


/**
 * Event fired when app and dashboard data is initially retrieved
 * @property initialDataReceived
 * @type String
 */
.constant('initialDataReceivedEvent', 'initialDataReceived')

/**
 * Event fired when app and dashboard data is initially retrieved
 * @property initialDataReceived
 * @type String
 */
.constant('notificationReceivedEvent', 'notificationReceived')

/**
 * Event fired when app and dashboard data is updated
 */
.constant('libraryDataUpdatedEvent');
