'use strict';

angular.module('ozpWebtop.services.responseObserver', [])
    .factory('responseObserver', function($q, $window) {
        return {
            'responseError': function(error) {
                if (error.status === 403 && error.config.url.indexOf('/api/') >= 0) {
                    $window.location = $window.OzoneConfig.API_URL + '/accounts/login/';
                } else {
                    return $q.reject(error);
                }
            }
        };
    });
