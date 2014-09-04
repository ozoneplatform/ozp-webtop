/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'build',
  compile_dir: 'bin',

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests.
   */
  app_files: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
    jsunit: [ 'src/**/*.spec.js' ],
    
    coffee: [ 'src/**/*.coffee', '!src/**/*.spec.coffee' ],
    coffeeunit: [ 'src/**/*.spec.coffee' ],

    atpl: [ 'src/app/**/*.tpl.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],

    html: [ 'src/index.html' ],
    less: 'src/less/main.less'
  },

  /**
   * This is a collection of files used during testing only.
   */
  test_files: {
    js: [
      'vendor/angular-mocks/angular-mocks.js'
    ]
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [
      'vendor/jquery/dist/jquery.js',
      'vendor/jquery-ui/jquery-ui.min.js',
      'vendor/angular/angular.js',
      'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'vendor/placeholders/angular-placeholders-0.0.1-SNAPSHOT.min.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-ui-utils/modules/route/route.js',
      'vendor/angular-gridster/dist/angular-gridster.min.js',
      'vendor/javascript-detect-element-resize/detect-element-resize.js',
      'vendor/ozp-classification/jquery.classification.js',
      'vendor/ozp-classification/ozp-classification.js' // WARNING: things after ozp-classification are not being included!!!!
    ],
    css: [
      'vendor/ozp-classification/classification.css',
      'vendor/jquery-ui/themes/ui-darkness/jquery-ui.min.css',
      'vendor/jquery-ui/themes/ui-darkness/theme.css',
      'vendor/angular-gridster/dist/angular-gridster.min.css'
    ],
    assets: [
      'vendor/components-font-awesome/fonts/FontAwesome.otf',
      'vendor/components-font-awesome/fonts/fontawesome-webfont.eot',
      'vendor/components-font-awesome/fonts/fontawesome-webfont.svg',
      'vendor/components-font-awesome/fonts/fontawesome-webfont.ttf',
      'vendor/components-font-awesome/fonts/fontawesome-webfont.woff',
      'vendor/bootstrap/fonts/glyphicons-halflings-regular.eot',
      'vendor/bootstrap/fonts/glyphicons-halflings-regular.svg',
      'vendor/bootstrap/fonts/glyphicons-halflings-regular.ttf',
      'vendor/bootstrap/fonts/glyphicons-halflings-regular.woff',
      'vendor/ubuntu-font/ubuntu-l.eot',
      'vendor/ubuntu-font/ubuntu-l.ttf',
      'vendor/ubuntu-font/ubuntu-li.eot',
      'vendor/ubuntu-font/ubuntu-li.ttf',
      'vendor/ubuntu-font/ubuntu-b.eot',
      'vendor/ubuntu-font/ubuntu-b.ttf',
      'vendor/ubuntu-font/ubuntu-bi.eot',
      'vendor/ubuntu-font/ubuntu-bi.ttf',
      'vendor/ubuntu-font/ubuntu-m.eot',
      'vendor/ubuntu-font/ubuntu-m.ttf',
      'vendor/ubuntu-font/ubuntu-mi.eot',
      'vendor/ubuntu-font/ubuntu-mi.ttf',
      'vendor/ubuntu-font/ubuntu-r.eot',
      'vendor/ubuntu-font/ubuntu-r.ttf'
    ]
  }
};
