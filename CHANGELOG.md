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




