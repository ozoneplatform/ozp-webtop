'use strict';

angular.module('ozpWebtop.contactModal', ['ui.bootstrap',
'ozpWebtop.models','ozpWebtop.services.ozpInterface']);
/**
* Controller for contact modal
*
* @param $scope
* @param $modalInstance
* @param ozpInterface interface for backend communication
* @constructor
*/
var getTarget = function ( address ) {
  if (address) {
    var addressPrefix = address.substring(0,7);
  var target = (addressPrefix === 'mailto:') ? '_self' : '_blank';
  return target;
  }
  return null;
};

angular.module('ozpWebtop.contactModal').controller(
'contactModalInstanceCtrl', function($scope, $window, $modalInstance) {

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //                           initialization
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  $scope.HELP_URL = $window.OzoneConfig.HELP_URL;
  $scope.HELP_URL_TARGET = getTarget($scope.HELP_URL);

  $scope.FEEDBACK_ADDRESS = $window.OzoneConfig.FEEDBACK_ADDRESS;
  $scope.FEEDBACK_ADDRESS_TARGET = getTarget($scope.FEEDBACK_ADDRESS);

  $scope.HELPDESK_ADDRESS = $window.OzoneConfig.HELPDESK_ADDRESS;
  $scope.HELPDESK_ADDRESS_TARGET = getTarget($scope.HELPDESK_ADDRESS);

  $scope.REQUEST_ADDRESS = $window.OzoneConfig.REQUEST_ADDRESS;
  $scope.REQUEST_ADDRESS_TARGET = getTarget($scope.REQUEST_ADDRESS);

  $scope.SOCIAL_CHIRP_ADDRESS = $window.OzoneConfig.SOCIAL_CHIRP_ADDRESS;
  $scope.SOCIAL_CHIRP_ADDRESS_TARGET = getTarget($scope.SOCIAL_CHIRP_ADDRESS);

  $scope.SOCIAL_PIN_ADDRESS = $window.OzoneConfig.SOCIAL_PIN_ADDRESS;
  $scope.SOCIAL_PIN_ADDRESS_TARGET = getTarget($scope.SOCIAL_PIN_ADDRESS);

  $scope.SOCIAL_CHAT_ADDRESS = $window.OzoneConfig.SOCIAL_CHAT_ADDRESS;
  $scope.SOCIAL_CHAT_ADDRESS_TARGET = getTarget($scope.SOCIAL_CHAT_ADDRESS);

  $scope.SOCIAL_BLOG_ADDRESS = $window.OzoneConfig.SOCIAL_BLOG_ADDRESS;
  $scope.SOCIAL_BLOG_ADDRESS_TARGET = getTarget($scope.SOCIAL_BLOG_ADDRESS);

  /**
  * Handler invoked when dialog is closed via Ok button
  *
  * @method for ok button
  */
  $scope.ok = function () {
    $modalInstance.close();
  };

  /**
  * Handler invoked when modal is dismissed via the cancel button
  *
  * @method cancel
  */
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});


