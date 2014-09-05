'use strict';

var app = angular.module('ozpWebtopApp.apis');

app.service('localStorageMarketplaceApiImpl', function($http, LocalStorage) {
  var cache = new LocalStorage(localStorage, JSON);

  this.getAllApps = function() {
    var marketplace = cache.getItem('marketplace');
    return marketplace.apps;
  };

  this.createExampleMarketplace = function() {
    // TODO: Originally this object was placed in a separate json file and fetched
    // via http, but that led to all sorts of issues with testing.
    var marketplace = {
      'name': 'marketplace',
      'apps': [
        {
          'name': 'Purple Circle',
          'icon': 'assets/mock/img/maps.png',
          'shortDescription': 'The best circle in town',
          'description': 'The purple circle application allows users to...',
          'version': '1.0.1',
          'keywords': ['purple', 'circle'],
          'url': 'http://ozone-development.github.io/ozp-demo/circle/circle.html',
          'id': '342f3680-18c9-11e4-8c21-0800200c9a66'
        },
        {
          'name': 'Red Square',
          'icon': 'assets/mock/img/UserFolder.png',
          'shortDescription': 'A red polygon with four equal sides',
          'description': 'The Red Square is a marvel of modern engineering...',
          'version': '1.4.1',
          'keywords': ['red', 'square'],
          'url': 'http://ozone-development.github.io/ozp-demo/square/square.html',
          'id': 'd9d3b477-7c21-4cab-bd9f-771ee9379be4'
        },
        {
          'name': 'Some Text',
          'icon': 'assets/mock/img/Network-icon.png',
          'shortDescription': 'A brilliant string of text',
          'description': 'The text shown in this application is one of the best...',
          'version': '0.9.8',
          'keywords': ['some', 'text'],
          'url': 'http://ozone-development.github.io/ozp-demo/text/text.html',
          'id': 'c3d895d5-f332-4154-b963-c5dd63f8ca49'
        },
        {
          'name': 'Mandelbrot',
          'icon': 'assets/mock/img/MusicFolder.png',
          'shortDescription': 'A beautiful set of complex numbers',
          'description': 'Benoit Mandelbrot would be so proud of this...',
          'version': '5.5.2',
          'keywords': ['benoit', 'mandelbrot'],
          'url': 'http://ozone-development.github.io/ozp-demo/mbrot/mbrot.html',
          'id': '34bc3505-5dcc-4609-bcd6-c014d9f27ce5'
        },
        {
          'name': 'Clock',
          'icon': 'assets/mock/img/MusicFolder.png',
          'shortDescription': 'A clock that tells time',
          'description': 'Provides the date and time in any country...',
          'version': '2.2.5',
          'keywords': ['clock', 'date', 'time'],
          'url': 'http://somewhere.clock/clock',
          'id': '19179c15-4cbb-45af-9fde-c6b35a343424'
        },
        {
          'name': 'People Counter',
          'icon': 'assets/mock/img/MusicFolder.png',
          'shortDescription': 'Population counter',
          'description': 'Provides the population in any given country...',
          'version': '3.5.4',
          'keywords': ['population', 'counter', 'people'],
          'url': 'http://somewhere.popcounter/popcounter',
          'id': 'bc6b3ac9-4f68-4d92-966d-f50170914997'
        },
        {
          'name': 'Green Bouncing Ball',
          'icon': 'assets/mock/img/green_ball.png',
          'shortDescription': 'Bouncing Ball IWC demo - Green',
          'description': 'Balls that bounce and talk to each other',
          'version': '1.0.0',
          'keywords': ['bouncing', 'ball', 'demo'],
          'url': 'http://ozone-development.github.io/ozp-demo/bouncingBalls/index.html?color=green',
          'id': '998437ef-9191-4d57-91a7-6ab049361583'
        },
        {
          'name': 'Blue Bouncing Ball',
          'icon': 'assets/mock/img/blue_ball.png',
          'shortDescription': 'Bouncing Ball IWC demo - Blue',
          'description': 'Balls that bounce and talk to each other',
          'version': '1.0.0',
          'keywords': ['bouncing', 'ball', 'demo'],
          'url': 'http://ozone-development.github.io/ozp-demo/bouncingBalls/index.html?color=blue',
          'id': '3af849aa-dad0-4223-b15b-9da3b48d1845'
        },
        {
          'name': 'Red Bouncing Ball',
          'icon': 'assets/mock/img/red_ball.png',
          'shortDescription': 'Bouncing Ball IWC demo - Red',
          'description': 'Balls that bounce and talk to each other',
          'version': '1.0.0',
          'keywords': ['bouncing', 'ball', 'demo'],
          'url': 'http://ozone-development.github.io/ozp-demo/bouncingBalls/index.html?color=red',
          'id': 'e5f52929-3f00-4766-a820-f0452ff74572'
        },
        {
          'name': 'Black Bouncing Ball',
          'icon': 'assets/mock/img/black_ball.png',
          'shortDescription': 'Bouncing Ball IWC demo - Black',
          'description': 'Balls that bounce and talk to each other',
          'version': '1.0.0',
          'keywords': ['bouncing', 'ball', 'demo'],
          'url': 'http://ozone-development.github.io/ozp-demo/bouncingBalls/index.html?color=black',
          'id': '93eb7a1d-618c-4478-a59e-326eccbe86d5'
        },
        {
          'name': 'Incident List',
          'icon': 'assets/mock/img/alert-icon.png',
          'shortDescription': 'Aggregates network incidents from monitoring, virus detection, and intrusion detection systems on the corporate network',
          'description': 'Aggregates network incidents from monitoring, virus detection, and intrusion detection systems on the corporate network',
          'version': '1.0.0',
          'keywords': ['incident'],
          'url': 'http://ozone-development.github.io/ozp-demo/incidentList/index.html',
          'id': '7702a592-3235-4ce7-af2a-ed806756b92c'
        },
        {
          'name': 'Greek Analysis',
          'icon': 'assets/mock/img/math-icon.png',
          'shortDescription': 'This is the Greek Analysis app',
          'description': 'This is the Greek Analysis app',
          'version': '1.0.0',
          'keywords': ['greek analysis', 'stock'],
          'url': 'http://ozone-development.github.io/ozp-demo/greekAnalysis/index.html',
          'id': 'cd0e3e24-cae8-4886-a0d4-c7e04b5b104e'
        },
        {
          'name': 'Stock Trader',
          'icon': 'assets/mock/img/bull-icon.png',
          'shortDescription': 'This is the Stock Trader app',
          'description': 'This is the Stock Trader app',
          'version': '1.0.0',
          'keywords': ['trader', 'stock'],
          'url': 'http://ozone-development.github.io/ozp-demo/stockTrader/index.html',
          'id': 'f38e10db-eb3f-4b90-8ec5-cb0a7dbd9191'
        },
        {
          'name': 'Chart',
          'icon': 'assets/mock/img/stock-chart-icon.png',
          'shortDescription': 'This is the Chart app',
          'description': 'This is the Chart app',
          'version': '1.0.0',
          'keywords': ['chart', 'stock'],
          'url': 'http://ozone-development.github.io/ozp-demo/chart/index.html',
          'id': '00605b24-baff-4270-b0b5-2b6bd6455883'
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