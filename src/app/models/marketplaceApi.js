'use strict';

/**
 * Marketplace model
 *
 * @module ozpWebtop.models.marketplace
 * @requires ozpWebtop.constants
 * @requires ozpWebtop.services.iwcInterface
 * @requires ozpWebtop.services.localStorageInterface
 */
angular.module('ozpWebtop.models.marketplace', [
  'ozpWebtop.constants',
  'ozpWebtop.services.iwcInterface',
  'ozpWebtop.services.localStorageInterface']);

var models = angular.module('ozpWebtop.models.marketplace');

function generalMarketplacedModel(persistStrategy) {

  return {
    /**
     * Get all application listings
     *
     * @method getAllApps
     * @returns {*}
     */
    getAllApps: function() {
      return persistStrategy.getApps().then(function(response) {
        return response.apps;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    },
    /**
     * Create example marketplace listings (test purposes only)
     *
     * @method createExampleMarketplace
     */
    createExampleMarketplace: function() {
      // TODO: Originally this object was placed in a separate json file and fetched
      // via http, but that led to all sorts of issues with testing.
      var marketplace = {
        'name': 'marketplace',
        'apps': [
          {
            'name': 'AirMail',
            'id': 'f2355f7c-bd8f-440c-b6f4-fe6bea787ecb',
            'description': 'This app delivers your mail super fast!',
            'shortDescription': 'Air mail delivery service',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'air mail'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/AirMail16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/AirMail32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/AirMail.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/airMail/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Bread Basket',
            'id': '484423df-8ee6-4880-8111-88eea14b97b2',
            'description': 'All the fresh bread you could possible want, delivered to you in a basket',
            'shortDescription': 'A basket full of fresh bread',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'bread'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/BreadBasket16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/BreadBasket32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/BreadBasket.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/breadBasket/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'ChartCourse',
            'id': 'c3ae4b4f-0d60-42f6-9005-c87d852e4812',
            'description': 'Never get lost again with this utility to chart your course',
            'shortDescription': 'An easy to use course charting application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'chart',
              'course'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/ChartCourse16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/ChartCourse32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/ChartCourse.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/chartCourse/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Chatterbox',
            'id': '34643c12-c600-4188-ab44-993681751f6c',
            'description': 'Keep in touch with all of your friends using this chatting application',
            'shortDescription': 'Chat application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'chart',
              'course'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/ChatterBox16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/ChatterBox32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/ChatterBox.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/chatterBox/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Clipboard',
            'id': '4bfd3e29-af51-4f0a-ae5f-2609d52f1e58',
            'description': 'Clipboard long description',
            'shortDescription': 'Clipboard application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'clipboard'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/Clipboard16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/Clipboard32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/Clipboard.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/clipboard/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Hatch Latch',
            'id': '65a026aa-fe21-4aa4-b455-e7c8e3c1160d',
            'description': 'Hatch Latch long description',
            'shortDescription': 'Hatch Latch application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'hatch latch'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/HatchLatch16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/HatchLatch32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/HatchLatch.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/hatchLatch/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'JotSpot',
            'id': '21c6715e-a204-4ae8-a041-625a644e65b1',
            'description': 'JotSpot long description',
            'shortDescription': 'JotSpot application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'jot'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/JotSpot16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/JotSpot32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/JotSpot.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/jotSpot/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Journal Forge',
            'id': '3ddeb636-dd93-4875-88d6-ff0da56c98ee',
            'description': 'Journal Forge long description',
            'shortDescription': 'Journal Forge application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'journal'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/JournalForge16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/JournalForge32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/JournalForge.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/journalForge/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Lunar Lantern',
            'id': '904a99cf-9da5-4b07-aecd-e1cbff534bb7',
            'description': 'Lunar Lantern long description',
            'shortDescription': 'Lunar Lantern application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'lunar',
              'lantern'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/LunarLantern16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/LunarLantern32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/LunarLantern.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/lunarLantern/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'MAPP',
            'id': 'eefabf60-07e2-4c05-af2b-52bb065f6a0f',
            'description': 'MAPP long description',
            'shortDescription': 'MAPP application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'mapp'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/MAPP16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/MAPP32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/MAPP.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/mapp/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Manilla',
            'id': '065f48ea-5d10-41c3-91b6-4a4fab6815bd',
            'description': 'Manilla long description',
            'shortDescription': 'Manilla application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'manilla'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/Manilla16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/Manilla32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/Manilla.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/manilla/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Music Box',
            'id': '096c4ea4-3f36-4686-97a5-cf8344aa2c47',
            'description': 'Music Box long description',
            'shortDescription': 'Music Box application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'music'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/MusicBox16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/MusicBox32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/MusicBox.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/musicBox/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'MyCalc',
            'id': 'f527bb3f-3e12-4ee3-981b-60bab758c92f',
            'description': 'MyCalc long description',
            'shortDescription': 'MyCalc application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'calculator'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/MyCalc16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/MyCalc32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/MyCalc.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/myCalc/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Photogenic',
            'id': '24cd22cf-df98-448b-99c0-713453d95508',
            'description': 'Photogenic long description',
            'shortDescription': 'Photogenic application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'photo'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/Photogenic16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/Photogenic32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/Photogenic.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/photogenic/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Playback',
            'id': '4b3d46df-a536-4ba5-a2a9-bb3df476249f',
            'description': 'Playback long description',
            'shortDescription': 'Playback application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'playback'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/Playback16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/Playback32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/Playback.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/playback/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Plot Possum',
            'id': '8c9716db-00f1-4086-a413-03a2891fcf27',
            'description': 'Plot Possum long description',
            'shortDescription': 'Plot Possum application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'plot',
              'possum'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/PlotPossum16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/PlotPossum32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/PlotPossum.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/plotPossum/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'PrimeSight',
            'id': 'f7011769-166a-4ee1-92c8-714b0b3bbb22',
            'description': 'PrimeSight long description',
            'shortDescription': 'PrimeSight application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'prime',
              'sight'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/PrimeSight16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/PrimeSight32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/PrimeSight.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/primeSight/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'SearchWell',
            'id': 'b198c1e0-d8ec-4f8b-8032-691d5083dc66',
            'description': 'SearchWell long description',
            'shortDescription': 'SearchWell application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'search',
              'well'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/SearchWell16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/SearchWell32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/SearchWell.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/searchWell/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Skybox',
            'id': 'ef87ff9b-c04a-4a50-9877-c12fedbfc72f',
            'description': 'Skybox long description',
            'shortDescription': 'Skybox application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'sky',
              'box'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/Skybox16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/Skybox32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/Skybox.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/skybox/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'TreeNote',
            'id': 'ea8dd56d-ae2c-4f5e-85ff-02f32cb73fc0',
            'description': 'TreeNote long description',
            'shortDescription': 'TreeNote application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'tree',
              'note'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/TreeNote16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/TreeNote32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/TreeNote.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/treeNote/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Whiteboard Graphs',
            'id': '61e6cda6-4ee4-4301-a77d-e350fc2cf186',
            'description': 'Whiteboard Graphs long description',
            'shortDescription': 'Whiteboard Graphs application',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'whiteboard',
              'graph'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/WhiteboardGraphs16.png',
              'medium': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/WhiteboardGraphs32.png',
              'large': 'https://raw.githubusercontent.com/ozone-development/center-ui/master/app/images/sample-listings/WhiteboardGraphs.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/centerSampleListings/whiteboardGraphs/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Purple Circle',
            'id': '342f3680-18c9-11e4-8c21-0800200c9a66',
            'description': 'The purple circle application allows users to...',
            'shortDescription': 'The best circle in town',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'purple',
              'circle'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'assets/mock/img/maps.png',
              'large': 'assets/mock/img/maps.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/circle/circle.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Red Square',
            'id': 'd9d3b477-7c21-4cab-bd9f-771ee9379be4',
            'description': 'The Red Square is a marvel of modern engineering...',
            'shortDescription': 'A red polygon with four equal sides',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'red',
              'square'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'assets/mock/img/UserFolder.png',
              'large': 'assets/mock/img/UserFolder.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/square/square.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Some Text',
            'id': 'c3d895d5-f332-4154-b963-c5dd63f8ca49',
            'description': 'The text shown in this application is one of the best...',
            'shortDescription': 'A brilliant string of text',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'text'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'assets/mock/img/Network-icon.png',
              'large': 'assets/mock/img/Network-icon.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/text/text.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Mandelbrot',
            'id': '34bc3505-5dcc-4609-bcd6-c014d9f27ce5',
            'description': 'Benoit Mandelbrot would be so proud of this...',
            'shortDescription': 'A beautiful set of complex numbers',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'mandelbrot'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'assets/mock/img/MusicFolder.png',
              'large': 'assets/mock/img/MusicFolder.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/mbrot/mbrot.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Clock',
            'id': '19179c15-4cbb-45af-9fde-c6b35a343424',
            'description': 'Provides the date and time in any country...',
            'shortDescription': 'A clock that tells time',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'clock'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'assets/mock/img/MusicFolder.png',
              'large': 'assets/mock/img/MusicFolder.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://somewhere.clock/clock',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'People Counter',
            'id': 'bc6b3ac9-4f68-4d92-966d-f50170914997',
            'description': 'Provides the population in any given country...',
            'shortDescription': 'Population counter',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': false
            },
            'tags': [
              'demo',
              'population',
              'counter',
              'people'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'assets/mock/img/MusicFolder.png',
              'large': 'assets/mock/img/MusicFolder.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://somewhere.popcounter/popcounter',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Green Bouncing Ball',
            'id': '998437ef-9191-4d57-91a7-6ab049361583',
            'description': 'Balls that bounce and talk to each other',
            'shortDescription': 'Bouncing Ball IWC demo - Green',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': true
            },
            'tags': [
              'demo',
              'bouncing',
              'ball',
            ],
            'intents': [

            ],
            'icons': {
              'small': 'assets/mock/img/green_ball.png',
              'large': 'assets/mock/img/green_ball.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/bouncingBalls/index.html?color=green',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Blue Bouncing Ball',
            'id': '3af849aa-dad0-4223-b15b-9da3b48d1845',
            'description': 'Balls that bounce and talk to each other',
            'shortDescription': 'Bouncing Ball IWC demo - Blue',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': true
            },
            'tags': [
              'demo',
              'bouncing',
              'ball',
            ],
            'intents': [

            ],
            'icons': {
              'small': 'assets/mock/img/blue_ball.png',
              'large': 'assets/mock/img/blue_ball.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/bouncingBalls/index.html?color=blue',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Red Bouncing Ball',
            'id': 'e5f52929-3f00-4766-a820-f0452ff74572',
            'description': 'Balls that bounce and talk to each other',
            'shortDescription': 'Bouncing Ball IWC demo - Red',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': true
            },
            'tags': [
              'demo',
              'bouncing',
              'ball',
            ],
            'intents': [

            ],
            'icons': {
              'small': 'assets/mock/img/red_ball.png',
              'large': 'assets/mock/img/red_ball.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/bouncingBalls/index.html?color=red',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Black Bouncing Ball',
            'id': '93eb7a1d-618c-4478-a59e-326eccbe86d5',
            'description': 'Balls that bounce and talk to each other',
            'shortDescription': 'Bouncing Ball IWC demo - Black',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': true
            },
            'tags': [
              'demo',
              'bouncing',
              'ball',
            ],
            'intents': [

            ],
            'icons': {
              'small': 'assets/mock/img/black_ball.png',
              'large': 'assets/mock/img/black_ball.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/bouncingBalls/index.html?color=black',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Incident List',
            'id': '7702a592-3235-4ce7-af2a-ed806756b92c',
            'description': 'Aggregates network incidents from monitoring, virus detection, and intrusion detection systems on the corporate network',
            'shortDescription': 'Aggregates network incidents from monitoring, virus detection, and intrusion detection systems on the corporate network',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 400,
              'height': 200,
              'singleton': true
            },
            'tags': [
              'demo',
              'incident'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'assets/mock/img/alert-icon.png',
              'large': 'assets/mock/img/alert-icon.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/incidentList/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Greek Analysis',
            'id': 'cd0e3e24-cae8-4886-a0d4-c7e04b5b104e',
            'description': 'This is the Greek Analysis app',
            'shortDescription': 'This is the Greek Analysis app',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 400,
              'height': 200,
              'singleton': true
            },
            'tags': [
              'demo',
              'greek',
              'stock'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'assets/mock/img/math-icon.png',
              'large': 'assets/mock/img/math-icon.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/greekAnalysis/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Stock Trader',
            'id': 'f38e10db-eb3f-4b90-8ec5-cb0a7dbd9191',
            'description': 'This is the Stock Trader app',
            'shortDescription': 'This is the Stock Trader app',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': true
            },
            'tags': [
              'demo',
              'trader',
              'stock'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'assets/mock/img/bull-icon.png',
              'large': 'assets/mock/img/bull-icon.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/stockTrader/index.html',
              'test': ''

            },
            '_links': {

            }
          },
          {
            'name': 'Chart',
            'id': '00605b24-baff-4270-b0b5-2b6bd6455883',
            'description': 'This is the Chart app',
            'shortDescription': 'This is the Chart app',
            'type': 'application',
            'state': 'active',
            'uiHints': {
              'width': 200,
              'height': 200,
              'singleton': true
            },
            'tags': [
              'demo',
              'chart',
              'stock'
            ],
            'intents': [

            ],
            'icons': {
              'small': 'assets/mock/img/stock-chart-icon.png',
              'large': 'assets/mock/img/stock-chart-icon.png'
            },
            'screenShots': [

            ],
            'launchUrls': {
              'default': 'http://ozone-development.github.io/ozp-demo/chart/index.html',
              'test': ''

            },
            '_links': {

            }
          }
        ]
      };
      return persistStrategy.setApps(marketplace).then(function(response) {
        return response;
      }).catch(function(error) {
        console.log('should not have happened: ' + error);
      });
    }
  };
}

/**
 * Angular service which provides a local storage interface to the marketplace
 * api
 *
 * @private
 * @constructor
 */
models.service('marketplaceModelLocalStorage', function(localStorageInterface) {
  var model = generalMarketplacedModel(localStorageInterface);
  for (var prop in model) {
    if (model.hasOwnProperty(prop)) {
      this[prop] = model[prop];
    }
  }
});

/**
 * Angular service which uses the Inter-Widget Communication (IWC) API to store
 * and retrieve marketplace data
 *
 * @private
 * @constructor
 */
models.service('marketplaceModelIwc', function(iwcInterface) {
  var model = generalMarketplacedModel(iwcInterface);
  for (var prop in model) {
    if (model.hasOwnProperty(prop)) {
      this[prop] = model[prop];
    }
  }
});

/**
 * Service used to store and retrieve marketplace data (app listings)
 *
 * May be configured with different persistence mechanisms including IWC
 * and Local Storage
 *
 * ngtype: factory
 *
 * @class marketplaceApi
 * @static
 * @namespace models
 */
models.factory('marketplaceApi', function($injector, useIwc) {
  if (useIwc) {
    return $injector.get('marketplaceModelIwc');
  } else if (useIwc === false){
    return $injector.get('marketplaceModelLocalStorage');

  }
  else {
    console.log('ERROR: useIwc is undefined!');
  }
});
