'use strict';

var app = angular.module('ozpWebtopApp.apis');

app.service('localStorageMarketplaceApiImpl', function($http, LocalStorage) {
  var cache = new LocalStorage(localStorage, JSON);

  this.getAllApps = function() {
    var marketplace = cache.getItem('marketplace');
    return marketplace.apps;
  };

  this.createExampleMarketplace = function() {
    console.log('Creating example marketplace');
    // TODO: Originally this object was placed in a separate json file and fetched
    // via http, but that led to all sorts of issues with testing.
    var marketplace = {
      'name': 'marketplace',
      'apps': [
        {
          'name': 'Purple Circle',
          'icon': 'img/maps.png',
          'shortDescription': 'The best circle in town',
          'description': 'The purple circle application allows users to...',
          'version': '1.0.1',
          'keywords': ['purple', 'circle'],
          'url': 'http://127.0.0.1:9006/circle/circle.html',
          'uuid': '342f3680-18c9-11e4-8c21-0800200c9a66'
        },
        {
          'name': 'Red Square',
          'icon': 'img/UserFolder.png',
          'shortDescription': 'A red polygon with four equal sides',
          'description': 'The Red Square is a marvel of modern engineering...',
          'version': '1.4.1',
          'keywords': ['red', 'square'],
          'url': 'http://127.0.0.1:9006/square/square.html',
          'uuid': 'd9d3b477-7c21-4cab-bd9f-771ee9379be4'
        },
        {
          'name': 'Some Text',
          'icon': 'img/Network-icon.png',
          'shortDescription': 'A brilliant string of text',
          'description': 'The text shown in this application is one of the best...',
          'version': '0.9.8',
          'keywords': ['some', 'text'],
          'url': 'http://127.0.0.1:9006/text/text.html',
          'uuid': 'c3d895d5-f332-4154-b963-c5dd63f8ca49'
        },
        {
          'name': 'Mandelbrot',
          'icon': 'img/MusicFolder.png',
          'shortDescription': 'A beautiful set of complex numbers',
          'description': 'Benoit Mandelbrot would be so proud of this...',
          'version': '5.5.2',
          'keywords': ['benoit', 'mandelbrot'],
          'url': 'http://127.0.0.1:9006/mbrot/mbrot.html',
          'uuid': '34bc3505-5dcc-4609-bcd6-c014d9f27ce5'
        },
        {
          'name': 'Clock',
          'icon': 'img/MusicFolder.png',
          'shortDescription': 'A clock that tells time',
          'description': 'Provides the date and time in any country...',
          'version': '2.2.5',
          'keywords': ['clock', 'date', 'time'],
          'url': 'http://somewhere.clock/clock',
          'uuid': '19179c15-4cbb-45af-9fde-c6b35a343424'
        },
        {
          'name': 'People Counter',
          'icon': 'img/MusicFolder.png',
          'shortDescription': 'Population counter',
          'description': 'Provides the population in any given country...',
          'version': '3.5.4',
          'keywords': ['population', 'counter', 'people'],
          'url': 'http://somewhere.popcounter/popcounter',
          'uuid': 'bc6b3ac9-4f68-4d92-966d-f50170914997'
        },
        {
          'name': 'Green Bouncing Ball',
          'icon': 'img/green_ball.png',
          'shortDescription': 'Bouncing Ball IWC demo - Green',
          'description': 'Balls that bounce and talk to each other',
          'version': '1.0.0',
          'keywords': ['bouncing', 'ball', 'demo'],
          'url': 'http://127.0.0.1:9005/index.html?color=green',
          'uuid': '998437ef-9191-4d57-91a7-6ab049361583'
        },
        {
          'name': 'Blue Bouncing Ball',
          'icon': 'img/blue_ball.png',
          'shortDescription': 'Bouncing Ball IWC demo - Blue',
          'description': 'Balls that bounce and talk to each other',
          'version': '1.0.0',
          'keywords': ['bouncing', 'ball', 'demo'],
          'url': 'http://127.0.0.1:9005/index.html?color=blue',
          'uuid': '3af849aa-dad0-4223-b15b-9da3b48d1845'
        },
        {
          'name': 'Red Bouncing Ball',
          'icon': 'img/red_ball.png',
          'shortDescription': 'Bouncing Ball IWC demo - Red',
          'description': 'Balls that bounce and talk to each other',
          'version': '1.0.0',
          'keywords': ['bouncing', 'ball', 'demo'],
          'url': 'http://127.0.0.1:9005/index.html?color=red',
          'uuid': 'e5f52929-3f00-4766-a820-f0452ff74572'
        },
        {
          'name': 'Black Bouncing Ball',
          'icon': 'img/black_ball.png',
          'shortDescription': 'Bouncing Ball IWC demo - Black',
          'description': 'Balls that bounce and talk to each other',
          'version': '1.0.0',
          'keywords': ['bouncing', 'ball', 'demo'],
          'url': 'http://127.0.0.1:9005/index.html?color=black',
          'uuid': '93eb7a1d-618c-4478-a59e-326eccbe86d5'
        }
      ]
    };
    cache.setItem('marketplace', marketplace);
  };

});


app.service('iwcMarketplaceApiImpl', function(/*dependencies*/) {
  this.getAllApps = function() {};

  this.createExampleMarketplace = function() {};
});


app.factory('marketplaceApi', function($window, $injector) {
  // TODO: what to key off of to determine if IWC impl should be used?
  if ($window.iwc) {
    return $injector.get('iwcMarketplaceApiImpl');
  } else {
    return $injector.get('localStorageMarketplaceApiImpl');
  }
});