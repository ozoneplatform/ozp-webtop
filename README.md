# ozp-webtop

[![Build Status](https://travis-ci.org/ozone-development/ozp-webtop.svg?branch=master)](https://travis-ci.org/ozone-development/ozp-webtop)

Next Gen OZONE Webtop UI

## Prerequisites
Install Node.js and npm. Head over to [the Node.js website](http://nodejs.org/)
if you need to do that.
Next, install [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/) with
the command below.

    (sudo) npm install -g bower grunt-cli

## Getting Started
First clone the repo. Then install development dependencies with npm. Install
frontend app dependencies with Bower:

    cd ozp-webtop
    npm install && bower install
    
## Getting Webtop to run Locally
It cannot be run with Sudo (locally)

1. Have installed:
    `nvm 5.3.0`
    `npm 3.3.12`
    `gulp 3.9.0`
    `node 5.3.0`
2. bower
    - If you run `which bower` and it returns something move on to step 3.
    - Otherwise: go into `.npmrc` and change it to `prefix = ${HOME}/npm-global`
        - installing bower with `npm install -g bower` it should go to your home directory (if it works, delete it). 
        - Set your path variable to `${HOME}/npm-global/bin`
    - now isntall with `(sudo) npm install -g bower grunt-cli` in npm 5.3.0 (use `nvm use 5.3.0`)
    - Also may need to run `sudo chown -R $USER:$GROUP ~/.npm ` and `sudo chown -R $USER:$GROUP ~/.config ` if not owned by current user. may need to do for the /tmp/user folder as well
3. Run `npm install && bower install`
4. go into `/ozp-webtop/src/OzoneConfig.js` and change the API_URL to `http://localhost:8001`
5. Run grunt serve
    - If there is an enospc error, you may need to run `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
    
    

## Grunt Tasks
Development tasks are run with Grunt:

 - `grunt` - run all tests, build, and create production version
 - `grunt serve`
     * Launch Webtop locally (see Important Links section below)
 - `grunt build` - build and execute unit tests
 - `grunt gh-pages` - run after a `grunt build` to publish the build files to
 [gh-pages](http://ozone-development.github.io/ozp-webtop/)
 - `grunt release:type` and `git push --tags` to create a patch, minor, or
 major release (updates changelog, versions, and creates tag)
 - `grunt run` - serve the production version of the application

Run `grunt -h` for a full list of Grunt tasks

## Important Links
* [local](http://localhost:9100)
* [gh-pages](http://ozone-development.github.io/ozp-webtop/tools/index.html)

## Use of IWC
By default, IWC is used to to retrieve the application information
(`system.api`) and to store the dashboard data (`data.api`). To check on the
 status of IWC, marketplace, and the backend, as well as to reset the
 data, use the [OZP Data Utility](http://ozone-development.github.io/ozp-webtop/tools/ozpDataUtility/index.html)

## Use of ng-boilerplate
This app was created from the
[ng-boilerplate template](https://github.com/ngbp/ngbp).
See ngbp for details describing the directory layout, gruntfile, and testing
structure

## Responsive Design
Currently, Webtop is semi-responsive, supporting devices >= 768px ('small'
devices, as defined by Bootstrap)

## Contributing
See the [wiki](https://github.com/ozone-development/ozp-webtop/wiki/Pull-Request-Checklist)
 for a list of guidelines for submitting pull requests

## Copyrights
> Software (c) 2014 [Department of Defense](http://defense.gov/ "DoD")

> The United States Government has unlimited rights in this software.

The OZONE Platform Webtop is released to the public as Open Source Software,
because it's the Right Thing To Do. Also, it was required by [Section 924 of the 2012 National Defense Authorization Act](http://www.gpo.gov/fdsys/pkg/PLAW-112publ81/pdf/PLAW-112publ81.pdf "NDAA FY12")

Released under the
[Apache License, Version 2](http://www.apache.org/licenses/LICENSE-2.0.html "Apache License v2").
