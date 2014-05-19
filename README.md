# ozp-webtop

## Core Directives

This repo is comprised of core Angular directives that will make-up the next generation OZONE User Interface (UI). The directives can be thought of as compononents which will make up the functionality of the UI. The directives are the focus and everything else should be thought of as a placeholder (for now).

## Set Up
Install Node.js and npm. Head over to [the Node.js website](http://nodejs.org/) if you need to do that.
Next, install [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/) with the command below.

    (sudo) npm install -g bower grunt-cli

## Usage
First clone the repo. Then install development dependencies with npm:

    cd ozp-webtop
    npm install
    
Install frontend app dependencies with Bower:

    bower install
    
Development tasks are run with Grunt. The most common are listed below.

    # Run the preview server (opens a browser for you)
    grunt serve
    # Run JSHint on the code
    grunt jshint
