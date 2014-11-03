angular.module('OzpDataUtility', [
  'ozpIwcClient'
]);
angular.module('OzpDataUtility').controller('MainController', ['ozpIwcClient']);

angular.module('OzpDataUtility').controller('MainController', function($scope, $rootScope, $http, $interval, iwcClient) {

  $scope.ozpBusInfo = {
    'url': 'http://ozone-development.github.io/iwc',
    'connected': false
  };

  var dashboardDataResource = '/dashboard-data';

  function connectToBus() {
    $scope.ozpBusInfo.connected = false;
    $scope.iwcClient = new iwcClient.Client({
      peerUrl: $scope.ozpBusInfo.url
    });

    $scope.iwcClient.on('connected', function() {
      console.log('client connected to ozp bus successfully');
      $scope.ozpBusInfo.connected = true;
      if(!$scope.$$phase) { $scope.$apply(); }
    });
  };

  function disconnectFromBus() {
   console.log('disconnecting from ozp bus...');
   $scope.iwcClient.disconnect();
   $scope.ozpBusInfo.connected = false;
   };

  $scope.refresh = function() {
    if ($scope.ozpBusInfo.connected) {
      disconnectFromBus();
    }
    connectToBus();
    $scope.appListings = [];
    $scope.dashboardData = [];
    getApplications().then(function() {
      getDashboards().then(function() {
      });
    });
  };

  function getApplicationResources() {
    return $scope.iwcClient.api('system.api')
      .get('/application')
      .then(function (reply) {
        return reply.entity;
      });
  };

  function saveAppData(appResource, appListings) {
    return $scope.iwcClient.api('system.api').get(appResource).then(function(appData) {
      appListings.push(appData.entity);
    });
  }

  function getDashboardData() {
    return $scope.iwcClient.api('data.api')
      .get(dashboardDataResource)
      .then(function (reply) {
        return reply.entity;
      });
  }

  function getDashboards() {
    $scope.loadingDashboards = true;
    return getDashboardData().then(function(dashboardData) {
      try {
        var num = dashboardData.dashboards.length;
      } catch (err) {
        $scope.invalidDashboards = true;
        $scope.loadingDashboards = false;
        if(!$scope.$$phase) { $scope.$apply(); }
        return;
      }
      $scope.invalidDashboards = false;
      $scope.dashboardData = dashboardData;
      var dashboards = $scope.dashboardData.dashboards;
      // match up app names with those from mp
      for (var a=0; a < dashboards.length; a++) {
        dashboards[a].validApps = [];
        dashboards[a].invalidApps = [];
        for (var b=0; b < dashboards[a].frames.length; b++) {
          for (var c=0; c < $scope.appListings.length; c++) {
            if (dashboards[a].frames[b].appId === $scope.appListings[c].id) {
              dashboards[a].validApps.push($scope.appListings[c].name);
            } else if (dashboards[a].frames[b].appName === $scope.appListings[c].name) {
              console.log('warning: got invalidated app: ' + $scope.appListings[c].name);
              dashboards[a].invalidApps.push($scope.appListings[c].name);
              $scope.dashboardData.dashboards[a].frames[b].appId = $scope.appListings[c].id;
            }
          }
        }
      }
      $scope.loadingDashboards = false;
      if(!$scope.$$phase) { $scope.$apply(); }
    });
  };

  function getApplications() {
    $scope.loadingMarketplace = true;
    return getApplicationResources().then(function(apps) {
    console.log('got ' + apps.length + ' apps from MP');
    $scope.appListings = [];
    return apps.reduce(function (previous, current) {
            return previous.then(function () {
              var promise = saveAppData(current, $scope.appListings);
              return promise;
            }).catch(function (error) {
              console.log('should not have happened: ' + error);
            });
          }, Promise.resolve()).then(function () {
            // all application data obtained
            console.log('finished getting app data for ' + $scope.appListings.length + ' apps');
            $scope.loadingMarketplace = false;
            if(!$scope.$$phase) { $scope.$apply(); }
          });

    });
  };

  function setData(dst, resource, entity) {
    return $scope.iwcClient.api(dst)
      .set(resource, {"entity": entity})
      .then(function (response) {
        if (response) {
          console.log('updated OK');
          return true;
        } else {
          console.log('update failed');
          return false;
        }
      });
  }

  $scope.syncDashboardData = function() {
    return setData('data.api', dashboardDataResource, $scope.dashboardData);
  };

  $scope.reloadDashboardData = function() {
    $http.get('dashboard-data.json').success(function(data) {
      console.log(data);
      setData('data.api', dashboardDataResource, data).then(function() {
         $scope.syncDashboardData().then(function() {
           $scope.refresh();
         })
      });
    });


  };

  // initialization
  $scope.refresh();

});

