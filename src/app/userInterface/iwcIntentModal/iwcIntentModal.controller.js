'use strict';

angular.module('ozpWebtop.iwcIntentModal', ['ui.bootstrap', 'ozpWebtop.models']);
/**
* Controller for IWC Intent Chooser modal
*
* @param $scope
* @param $modalInstance
* @param $restInterface
* @constructor
*/
angular.module('ozpWebtop.iwcIntentModal').controller(
  'iwcIntentModalInstanceCtrl', function($scope, $window, $modalInstance,$log, client,inFlightIntent) {
    inFlightIntent = inFlightIntent || {};
    inFlightIntent.entity = inFlightIntent.entity || {};
    inFlightIntent.entity.intent = inFlightIntent.entity.intent || {};

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                            $scope properties
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $scope.handlerChoices = inFlightIntent.entity.handlerChoices || [];
    $scope.type = inFlightIntent.entity.intent.type;
    $scope.action = inFlightIntent.entity.intent.action;


    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //                          methods
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Sends IWC intent payload data for an intent handler selection.
     *
     * @method respondSelected
     * @param payload the data to send to the IWC intents.api
     * @returns {Promise}
     */
    function respondSelected (payload){
      return client.intents().set(inFlightIntent.resource,payload).catch(function(err){
        $log.error('Unexpected error on IWC intent choosing: ', err);
        $modalInstance.dismiss('cancel');
      });
    }

    /**
    * Handler invoked when an application is clicked
    *
    * @method choiceSelected
    * @param handler application selected
    */
    $scope.handlerSelected = function(handler) {
      $scope.selectedHandler = handler.resource;
    };

    /**
    * Returns true if the given handler is selected, false
    * otherwise
    *
    * @method isAppSelected
    * @param app the application to check
    * @returns {boolean}
    */
    $scope.isHandlerSelected = function(handler) {
      return $scope.selectedHandler === handler.resource;
    };

    /**
     * Sends IWC response to always use the selected handling application.
     * @method useHandlerAlways
     */
    $scope.useHandlerAlways = function(){
      //TODO: update handler payload to set the preference. Currently just behaves like $scope.useHandler
      var handlerPayload = {
        contentType: inFlightIntent.entity.contentType,
        entity: {
          'state': 'delivering',
          'handler' : {
            'resource':$scope.selectedHandler,
            'reason': 'userSelected'
          }
        }
      };

      respondSelected(handlerPayload).then(function(){
          $modalInstance.close();
      });
    };

    /**
     * Sends IWC response to use the selected handling application. This choice does not persist.
     * @method useHandler
     */
    $scope.useHandler = function(){
      var handlerPayload = {
        contentType: inFlightIntent.entity.contentType,
        entity: {
          'state': 'delivering',
          'handler' : {
            'resource':$scope.selectedHandler,
            'reason': 'userSelected'
          }
        }
      };

      respondSelected(handlerPayload).then(function(){
        $modalInstance.close();
      });
    };

    /**
     * Handler invoked when modal is dismissed via the cancel button
     *
     * @method cancel
     */
    $scope.cancel = function () {
      var userCanceledPayload = {
        contentType: inFlightIntent.contentType,
        entity: {
          reply: {
            contentType: inFlightIntent.contentType,
            entity: 'User canceled the selection.'
          },
          state: 'complete'
        }
      };

      client.intents().set(inFlightIntent.resource, userCanceledPayload);
      $modalInstance.dismiss('cancel');
    };

});
