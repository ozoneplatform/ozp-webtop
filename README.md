# ozp-webtop

[![Build Status](https://travis-ci.org/ozone-development/ozp-webtop.svg?branch=master)](https://travis-ci.org/ozone-development/ozp-webtop)

Next Gen OZONE UI

## Prerequisites
Install Node.js and npm. Head over to [the Node.js website](http://nodejs.org/) if you need to do that.
Next, install [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/) with the command below.

    (sudo) npm install -g bower grunt-cli

## Getting Started
First clone the repo. Then install development dependencies with npm. Install frontend app dependencies with Bower:

    cd ozp-webtop
    npm install && bower install
    
Development tasks are run with Grunt. Run `grunt serve` to bring up a live preview of the webtop. Run `grunt -h` for a full list of Grunt tasks.

## Development Notes

### Use of Yeoman
This app was scaffolded with [Yeoman](http://yeoman.io/). You may want to install it to aid in contributing to this repo. You can install it with npm with the following commands:

    (sudo) npm install -g yo generator-angular
    
If you install `yo`, it will install Grunt and Bower for you. You can then scaffold out new pieces of the app with:

    cd ozp-webtop
    yo angular:directive myNewDirective
    
You can find more at the `generator-angular` [Github repo](https://github.com/yeoman/generator-angular).

### Directory Structure
The directory structure is a result of the Yeoman scaffolding, however some additional directories have been added. The app is structured in the following way:

```
app/            
    examples/       # HTML to use as webtop frames
    fonts/          # Provided by Yeoman
    images/         # Placeholder images 
    mock/           # JSON which mocks a server response
    scripts/        # Contains JavaScript with Angular pieces of the application
        ...
    templates/      # Templates are HTML fragments that are used by one or more directives
    views/          # HTML which corresponds to a route. A view is the composite of HTML and many directives
test/ 
    runner.html     # Spec runner
    spec/           # Child directories correspond to the code in app/scripts/         
        ...
```

## Copyrights
> Software (c) 2014 [Department of Defense](http://defense.gov/ "DoD")

> The United States Government has unlimited rights in this software.  
 
The OZONE Platform Webtop is released to the public as Open Source Software, because it's the Right Thing To Do. Also, it was required by [Section 924 of the 2012 National Defense Authorization Act](http://www.gpo.gov/fdsys/pkg/PLAW-112publ81/pdf/PLAW-112publ81.pdf "NDAA FY12").

Released under the [Apache License, Version 2](http://www.apache.org/licenses/LICENSE-2.0.html "Apache License v2").
