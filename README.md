# ozp-webtop

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

## Grunt Tasks
Development tasks are run with Grunt:

 - `grunt` - run all tests, build, and create production version
 - `grunt serve`
     * Launch Webtop locally (see Important Links section below)
 - `grunt build` - build and execute unit tests
 - `grunt release:type` and `git push --tags` to create a patch, minor, or
 major release (updates changelog, versions, and creates tag)
 - `grunt run` - serve the production version of the application

Run `grunt -h` for a full list of Grunt tasks

## Important Links
* [local](http://localhost:9100)

## Use of IWC
By default, IWC is used to to retrieve the application information
(`system.api`) and to store the dashboard data (`data.api`). To check on the
 status of IWC, marketplace, and the backend, as well as to reset the
 data, use the [OZP Data Utility](http://ozoneplatform.github.io/ozp-webtop/tools/ozpDataUtility/index.html)

## Use of ng-boilerplate
This app was created from the
[ng-boilerplate template](https://github.com/ngbp/ngbp).
See ngbp for details describing the directory layout, gruntfile, and testing
structure

## Responsive Design
Currently, Webtop is semi-responsive, supporting devices >= 768px ('small'
devices, as defined by Bootstrap)

## Contributing
See the [wiki](https://github.com/ozoneplatform/ozp-webtop/wiki/Pull-Request-Checklist)
 for a list of guidelines for submitting pull requests

## Copyrights
> Software (c) 2014 [Department of Defense](http://defense.gov/ "DoD")

> The United States Government has unlimited rights in this software.

The OZONE Platform Webtop is released to the public as Open Source Software,
because it's the Right Thing To Do. Also, it was required by [Section 924 of the 2012 National Defense Authorization Act](http://www.gpo.gov/fdsys/pkg/PLAW-112publ81/pdf/PLAW-112publ81.pdf "NDAA FY12")

Released under the
[Apache License, Version 2](http://www.apache.org/licenses/LICENSE-2.0.html "Apache License v2").
