# 0.4.1 (2015-03-31)



## Bug fixes
### styling

* Added hover to main toolbars and fixed modal close icon ([59b1b313](git@github.com:ozone-development/ozp-webtop/commit/59b1b313))

### app-toolbar

* Style app-toolbar hovers ([27d46414](git@github.com:ozone-development/ozp-webtop/commit/27d46414))

### icons

* Close icon in notifications demo ([e16cdde7](git@github.com:ozone-development/ozp-webtop/commit/e16cdde7))

* Added hovers ([6074dd2d](git@github.com:ozone-development/ozp-webtop/commit/6074dd2d))

### restInterface

* Automatically retry a failed/aborted PUT request ([ab254ffe](git@github.com:ozone-development/ozp-webtop/commit/ab254ffe))




# 0.4.0 (2015-03-18)

## Features
### version.txt

* Add a version.txt file to the output directories (build/ and bin/) ([75a4469b](git@github.com:ozone-development/ozp-webtop/commit/75a4469b))

### config

* Add support for OzoneConfig.js config file ([19ee1cdf](git@github.com:ozone-development/ozp-webtop/commit/19ee1cdf))

### dashboardModals

* Fixes create and edit dashboard modals, allowing users to edit any dashboard or create new empty dashboards. Closes #424 #408 #428 ([9e9ef898](git@github.com:ozone-development/ozp-webtop/commit/9e9ef898))

### dashboardApi

* Provide name of missing apps ([759bde91](git@github.com:ozone-development/ozp-webtop/commit/759bde91))



## Bug fixes
### styling

* Matched navbar height ([f329c6be](git@github.com:ozone-development/ozp-webtop/commit/f329c6be))

* Matched navbar height ([842ddb5e](git@github.com:ozone-development/ozp-webtop/commit/842ddb5e))

* Updated old favicon with new ([b2c75fc1](git@github.com:ozone-development/ozp-webtop/commit/b2c75fc1))

* replaced all glyphicons ([e50db4aa](git@github.com:ozone-development/ozp-webtop/commit/e50db4aa))

* Adding colors to icons ([59625e01](git@github.com:ozone-development/ozp-webtop/commit/59625e01))

* Add App Modal buttons ([fd394bac](git@github.com:ozone-development/ozp-webtop/commit/fd394bac))

### ozpManagedFrame

* Set min height & min width on frames, increase … …height of chrome draggable space to be entire widget top bar. ([755970b1](git@github.com:ozone-development/ozp-webtop/commit/755970b1))

### *

* Disable IE compatibility mode ([a27eb4a2](git@github.com:ozone-development/ozp-webtop/commit/a27eb4a2))

* Fixes broken logic when creating urls loaded into iframes ([57c48f7a](git@github.com:ozone-development/ozp-webtop/commit/57c48f7a))

* Default dashboard state would get overwritten when creating new boards ([f51e2d2c](git@github.com:ozone-development/ozp-webtop/commit/f51e2d2c))

* Dashboard state fix when changing layouts ([fbf3124f](git@github.com:ozone-development/ozp-webtop/commit/fbf3124f))

* Handle frames with no matching application data ([43fc8a04](git@github.com:ozone-development/ozp-webtop/commit/43fc8a04))

* Dashboard removal now removes widgets. Widgets now are able to trigger unload on close ([0a6cef58](git@github.com:ozone-development/ozp-webtop/commit/0a6cef58))

### addApplicationsModal

* Fixes broken link on Find more apps button ([53b1e920](git@github.com:ozone-development/ozp-webtop/commit/53b1e920))

### desktopLayout

* fixes IE desktop layout bug ([98183e7a](git@github.com:ozone-development/ozp-webtop/commit/98183e7a))

### newDashboard

* New dashboards now allow a user to select default layout (grid or desktop). If a layout is not specified, grid is used. Fixes #451 ([78d93e06](git@github.com:ozone-development/ozp-webtop/commit/78d93e06))

* New dashboards now allow a user to select default layout (grid or desktop). If a layout is not specified, grid is used. Fixes #451 ([3bde9f72](git@github.com:ozone-development/ozp-webtop/commit/3bde9f72))

### defaultURL

* Fixes issue where if user goes to base webtop URL, no dashboards are shown. This fix directs the user to their first dashboard. Fixes #461 ([150c8089](git@github.com:ozone-development/ozp-webtop/commit/150c8089))

### editDashboardModal

* Fix edit dashboard link ([976d0e5b](git@github.com:ozone-development/ozp-webtop/commit/976d0e5b))

### icon

* Fixed color of "Minimize" icon ([c66e0e82](git@github.com:ozone-development/ozp-webtop/commit/c66e0e82))

### urlWidgetLauncher

* Fix broken feature ([8ae8f110](git@github.com:ozone-development/ozp-webtop/commit/8ae8f110))




# 0.3.3 (2015-02-04)






# 0.3.2 (2015-01-23)






# 0.3.1 (2015-01-23)



## Bug fixes
### dashboardApi, dashboardViewCtrl

* fix bug where duplicate default dashboards are created ([d39d7766](git@github.com:ozone-development/ozp-webtop/commit/d39d7766))

### ozpDataUtility

* use ng-src for images to prevent error ([584d1847](git@github.com:ozone-development/ozp-webtop/commit/584d1847))




# 0.3.0 (2015-01-22)

## Features
### addApplicationsModal, appToolbar, dashboardView

* add applications modal ([9b705bdc](git@github.com:ozone-development/ozp-webtop/commit/9b705bdc))

### dashboardToolbar

* remove zulu clock ([3f85dfd6](git@github.com:ozone-development/ozp-webtop/commit/3f85dfd6))

### userPreferencesModal

* enhance color scheme ([25d19e8c](git@github.com:ozone-development/ozp-webtop/commit/25d19e8c))

* add close icon (x) to modal ([418d40b7](git@github.com:ozone-development/ozp-webtop/commit/418d40b7))

### addApplicationsModal

* disable open buttons if no apps have been selected ([37b2e698](git@github.com:ozone-development/ozp-webtop/commit/37b2e698))

### appToolbar

* support adding applications to a new dashboard ([6ed58a29](git@github.com:ozone-development/ozp-webtop/commit/6ed58a29))

* show 32x32 app icons in toolbar and active/inactive indicator bar ([d9cfef99](git@github.com:ozone-development/ozp-webtop/commit/d9cfef99))

* add delete dashboard functionality ([e39908c1](git@github.com:ozone-development/ozp-webtop/commit/e39908c1))

### appToolbar, dashboardToolbar, dashboardView

* consolidate full screen mode and change icons ([c13684ff](git@github.com:ozone-development/ozp-webtop/commit/c13684ff))

### appToolbar, dashboardToolbar

* move dashboard dropdown and layout buttons to bottom toolbar ([2a7b0497](git@github.com:ozone-development/ozp-webtop/commit/2a7b0497))

### appToolbar, ozpToolbar

* launch webtop preferences from app toolbar instead of ozp toolbar ([baa5c39e](git@github.com:ozone-development/ozp-webtop/commit/baa5c39e))

### all

* use IWC to get application data and store application state ([705e7eb4](git@github.com:ozone-development/ozp-webtop/commit/705e7eb4))

### dashboardView/grid, appToolbar

* scroll to frame and highlight when icon clicked ([36abfaf3](git@github.com:ozone-development/ozp-webtop/commit/36abfaf3))

### ozpToolbar

* update to latest version of common OZP toolbar ([267df36a](git@github.com:ozone-development/ozp-webtop/commit/267df36a))

### *

* Add support for sticky state for dashboards ([f7c035bb](git@github.com:ozone-development/ozp-webtop/commit/f7c035bb))

* redesign of sticky dashboard feature ([c683c353](git@github.com:ozone-development/ozp-webtop/commit/c683c353))

### editDashboardModal

* Add form validation for dashboard name ([07136cec](git@github.com:ozone-development/ozp-webtop/commit/07136cec))

### iwcConnectedClient

* Support configurable IWC bus URL via query parameter ([5da203e7](git@github.com:ozone-development/ozp-webtop/commit/5da203e7))



## Bug fixes
### userPreferencesModal

* fix bug that broke functionality of user preferences modal ([dffcb4c7](git@github.com:ozone-development/ozp-webtop/commit/dffcb4c7))

### dashboardApi, appToolbar

* fix icons in app toolbar when creating a new dashboard ([bd9cc370](git@github.com:ozone-development/ozp-webtop/commit/bd9cc370))

### dashboardView, models, appLauncher, appToolbar

* fix max limit of 10 rows on grid layout ([f939ae15](git@github.com:ozone-development/ozp-webtop/commit/f939ae15))

### addApplicationsModal

* display apps in lexical order ([2d9066fc](git@github.com:ozone-development/ozp-webtop/commit/2d9066fc))

### dashboardView/chrome

* hide minimize and maximize buttons on grid layout ([db7d8481](git@github.com:ozone-development/ozp-webtop/commit/db7d8481))

### modals

* adjust modal width based on windown size ([2c3af74d](git@github.com:ozone-development/ozp-webtop/commit/2c3af74d))

* removed stray css definition ([498acbf0](git@github.com:ozone-development/ozp-webtop/commit/498acbf0))

### tools/ozpDataUtility

* bug fix ([95d45ee4](git@github.com:ozone-development/ozp-webtop/commit/95d45ee4))

### userPreferences

* remove theme selection ([162a196d](git@github.com:ozone-development/ozp-webtop/commit/162a196d))

### appToolbar, less

* fix bugs when integrating with OZP bootstrap fork ([24a2baa3](git@github.com:ozone-development/ozp-webtop/commit/24a2baa3))

### less

* remove bootstrap override for navbar-right li elements ([d35ca26a](git@github.com:ozone-development/ozp-webtop/commit/d35ca26a))

### ozpToolbar

* fix full screen mode ([697c1a13](git@github.com:ozone-development/ozp-webtop/commit/697c1a13))

### appToolbar

* fix divider height in application toolbar ([494bf7ad](git@github.com:ozone-development/ozp-webtop/commit/494bf7ad))

* Show error if user tries to create more than max number of dashboards (currently 10) ([982b8f4d](git@github.com:ozone-development/ozp-webtop/commit/982b8f4d))

### *

* various desktop layout enhancements ([fef7bbea](git@github.com:ozone-development/ozp-webtop/commit/fef7bbea))

* Create empty dashboard if user has none ([26d29708](git@github.com:ozone-development/ozp-webtop/commit/26d29708))

### dashboardApi

* #352 Frame size is no longer saved when the frame.isMaximized flag is set to true, ensuring the user can toggle the maximize button to return to the original size/location of the widget ([82adaf29](git@github.com:ozone-development/ozp-webtop/commit/82adaf29))

### dataUtility

* IWC client promise connection ([aaf2407d](git@github.com:ozone-development/ozp-webtop/commit/aaf2407d))

### desktopView

* Set Z-Index of Fullscreen widgets to highest value. Set desktop view to fixed to prevent scrolling. Added double-click chrome bar to maximize (like windows desktop environments).  Closes #341 and #343 ([96565a9b](git@github.com:ozone-development/ozp-webtop/commit/96565a9b))

### constants

* Set IWC constant to true. I had incorrectly changed it before. ([b0b78dda](git@github.com:ozone-development/ozp-webtop/commit/b0b78dda))




# 0.2.0 (2014-10-22)

## Features
### dashboardApi, appToolbar, dashboardView

* support non-singleton applications ([e4c978e9](git@github.com:ozone-development/ozp-webtop/commit/e4c978e9))



## Bug fixes
### gruntfile

* copy jquery-ui images directory to build/assets to fix 404 error ([ff4d86ff](git@github.com:ozone-development/ozp-webtop/commit/ff4d86ff))




