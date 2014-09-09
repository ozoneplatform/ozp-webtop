'use strict';

angular.module('ozpWebtopApp.dashboardView')
  .controller('DesktopController', function ($scope, $rootScope, $location, dashboardApi, marketplaceApi, dashboardChangeMonitor) {
    if(!$scope.dashboards){
      $scope.dashboards = dashboardApi.getDashboards();
    }
    $scope.frames = $scope.dashboards[0].frames;  // to make tests happy
    dashboardChangeMonitor.run();

    $scope.$on('dashboard-change', function() {
      /* isminimized */
      var apiDash = dashboardApi.getDashboards()[dashboardChangeMonitor.dashboardId];
      for(var z in apiDash.frames){
        for(var y in $scope.frames){
          if((apiDash.frames[z].appId === $scope.frames[y].appId) && (apiDash.frames[z].isMinimized !== $scope.frames[y].isMinimized)){
            $scope.frames[y].isMinimized = apiDash.frames[z].isMinimized;
            //
          }
          if((apiDash.frames[z].appId === $scope.frames[y].appId) && (apiDash.frames[z].isMaximized !== $scope.frames[y].isMaximized)){
            $scope.frames[y].isMaximized = apiDash.frames[z].isMaximized;
            //
          }
        }
      }


      /* end isminimized */

      if($scope.frames.length !== apiDash.frames.length){

        /*Make an array of old frames and new frames*/
        var oldFrames = [],
            newFrames = [];
        for(var i in $scope.frames){
          oldFrames.push($scope.frames[i].appId);
        }

        for(var j in apiDash.frames){
          newFrames.push(apiDash.frames[j].appId);
        }
        /*return just the differences between oldFrames and new Frames*/
        Array.prototype.diff = function(a) {
          return this.filter(function(i) {return a.indexOf(i) < 0;});
        };
        //add or remove new frames without reloading the entire scope
        //if there are items in the currentScope that are not in the updated scope from the service, remove theme here
        if(oldFrames.diff(newFrames).length > 0){
          for(var a = 0; a < $scope.frames.length; a++){
            /*if the removed frame is present, splice it out of the local scope*/
            if($scope.frames[a].appId === oldFrames.diff(newFrames)[0]){
              $scope.frames.splice(a, 1);
            }
          }
        }
        //if there are new frames for this dashboard on the services that are not in the local scope
        if(newFrames.diff(oldFrames).length > 0){

          //for item in the dashboardApi on the current Dashboard
          for(var b = 0; b < apiDash.frames.length; b++){

            //if the item from the dashboard api matches the new frame we found in this view
            if(apiDash.frames[b].appId === newFrames.diff(oldFrames)[0]){

              //push that frame to the local scope. since the changes are automatically binded with the view, no refresh
              $scope.frames.push(
                apiDash.frames[b]
              );
              //update the frame size so it fits inside its little widget boundary
              //$scope.updateGridFrameSize(apiDash.frames[b].id);
              //now quickly merge my local scope for frames with the marketplace api to get important stuff on local scope like url, image, name, etc
              dashboardApi.mergeApplicationData($scope.frames, marketplaceApi.getAllApps());
            }
          }
        }
      }
    });

    // TODO: Originally tried sending broadcast events from dashboardChangeMonitor,
    // but that did not work out - led to lots of problems such as the desktop
    // and grid controllers not being loaded/unloaded properly. So instead, we'll
    // just reach into the internal state of the dashboardChangeMonitor to get
    // this info and use $watch on $location.path to trigger the update. To
    // see what happens, just uncomment the console.logs in $on.(...) in
    // grid.js and desktop.js
    $scope.$watch(function() {
      return $location.path();
    }, function() {
      updateDashboard();
    });

    function updateDashboard() {
      var dashboardId = dashboardChangeMonitor.dashboardId;
      for (var i=0; i < $scope.dashboards.length; i++) {
        if ($scope.dashboards[i].id.toString() === dashboardId) {
          $scope.currentDashboard = $scope.dashboards[i];
          $scope.icons = $scope.currentDashboard.desktopIcons;
          $scope.currentDashboardId = $scope.currentDashboard.id;
          $scope.frames = $scope.currentDashboard.frames;

          // TODO: There should be a method in Marketplace to get only my apps
          var allApps = marketplaceApi.getAllApps();
          // Merge application data (app name, icons, descriptions, url, etc)
          // with dashboard app data
          dashboardApi.mergeApplicationData($scope.frames, allApps);

          $scope.max = {};

          sortFrames();

          for (var k = 0, len = $scope.frames.length; k < len; k++) {
            $scope.frames[k].desktopLayout.zIndex = k;
          }
          $scope.max.zIndex = $scope.frames.length - 1;
        }
      }
    // $rootScope.activeFrames = $scope.currentDashboard.frames;
      // $scope.activeFrames = $scope.currentDashboard.frames;
      $rootScope.$broadcast('activeFrames', $scope.frames);
      $rootScope.$broadcast('dashboard-change');
    }

    $scope.isFrameMinimized = function(e) {
      return dashboardApi.getFrameById(e.id).isMinimized;
    };

    $scope.isFrameMaximized = function(e) {
      return dashboardApi.getFrameById(e.id).isMaximized;
    };

    function sortFrames() {
      $scope.frames.sort(function(a, b) {
        return ((a.desktopLayout.zIndex < b.desktopLayout.zIndex) ? -1 :
          ((a.desktopLayout.zIndex > b.desktopLayout.zIndex) ? 1 : 0));
      });
    }

  });