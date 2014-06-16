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
    config/         # JSON which mocks a server response
    examples/       # HTML to use as webtop frames
    fonts/          # Provided by Yeoman
    images/         # Placeholder images 
    scripts/        # Contains JavaScript with Angular pieces of the application
        ...
    templates/      # Templates are HTML fragments that are used by one or more directives
    views/          # HTML which corresponds to a route. A view is the composite of HTML and many directives
test/ 
    runner.html     # Spec runner
    spec/           # Child directories correspond to the code in app/scripts/         
        ...
```
