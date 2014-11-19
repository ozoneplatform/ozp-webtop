'use strict';
angular.module('StickyStateDemo.controllers', []);

angular.module('StickyStateDemo.controllers')

.controller('MainCtrl', function ($scope, $rootScope, $state) {

    $scope.data = {
      viewId: '1',
      viewIds: ['1','2','3','4','5'],
      stickyViewIds: ['1','2','3']
    };

    $scope.launchSmallView = function() {
      var viewId = $scope.data.viewId;
      var stickySlot = getStickySlotNumber(viewId);
      if (stickySlot === false) {
        console.log('viewId ' + viewId + ' is not sticky');
        $state.go('contentview.small-nonstick', {viewId: viewId});
      } else {
        console.log('viewId ' + viewId + ' has sticky slot ' + stickySlot);
        $state.go('contentview.small' + '-sticky-' + stickySlot, {viewId: viewId});
      }
    };

    $scope.launchLargeView = function() {
      var viewId = $scope.data.viewId;
      var stickySlot = getStickySlotNumber(viewId);
      if (stickySlot === false) {
        console.log('viewId ' + viewId + ' is not sticky');
        $state.go('contentview.large-nonstick', {viewId: viewId});
      } else {
        console.log('viewId ' + viewId + ' has sticky slot ' + stickySlot);
        $state.go('contentview.large' + '-sticky-' + stickySlot, {viewId: viewId});
      }
    };

    function getStickySlotNumber (viewId) {
      var slotsTaken = 0;
      for (var i=0; i < $scope.data.viewIds.length; i++) {
        for (var j=0; j < $scope.data.stickyViewIds.length; j++) {
          if ($scope.data.viewIds[i] === $scope.data.stickyViewIds[j]) {
            if ($scope.data.viewIds[i] === viewId) {
              return slotsTaken;
            }
            slotsTaken += 1;
          }
        }
      }
      return false;
    }
  })

.controller('ContentViewCtrl', function ($scope) {
  })

.controller('SmallViewCtrl', function ($scope, $sce, $stateParams) {
  $scope.data = {
    'url': 'http://www.xkcd.com'
  };
  $scope.iframeUrl = $sce.trustAsResourceUrl($scope.data.url);

  $scope.viewId = $stateParams.viewId;

  $scope.loadUrl = function(recentUrl) {
    if (recentUrl) {
      var url = recentUrl;
      $scope.data.url = url;
    } else {
      var url = $scope.data.url;
    };
    $scope.iframeUrl = $sce.trustAsResourceUrl(url);

  };

  $scope.handleKeyup = function($event) {
    if ($event.keyCode === 13) {
      $scope.loadUrl();
    }
  };
  })

.controller('LargeViewCtrl', function ($scope, $sce, $stateParams) {
  $scope.data = {
    'url': 'http://www.xkcd.com'
  };
  $scope.iframeUrl = $sce.trustAsResourceUrl($scope.data.url);

  $scope.viewId = $stateParams.viewId;

  $scope.loadUrl = function(recentUrl) {
    if (recentUrl) {
      var url = recentUrl;
      $scope.data.url = url;
    } else {
      var url = $scope.data.url;
    };
    $scope.iframeUrl = $sce.trustAsResourceUrl(url);

  };

  $scope.handleKeyup = function($event) {
    if ($event.keyCode === 13) {
      $scope.loadUrl();
    }
  };
  });