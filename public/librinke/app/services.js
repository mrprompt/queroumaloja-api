'use strict';

/* Services */
angular
    .module('app.services', ['ngResource'])

.factory('api', ['$http', '$resource',
    function($http, $resource) {
        var url = '/api';

        return {
            get: function(endpoint) {
                return $http.get(url + '/' + endpoint);
            },
            post: function(endpoint, data) {
                return $http.post(url + '/' + endpoint, data);
            },
            put: function(endpoint, data) {
                return $http.put(url + '/' + endpoint, data);
            },
            delete: function(endpoint) {
                return $http.delete(url + '/' + endpoint);
            }
        };
    }
])

.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
            console.log('enviado');
            console.log(data);
        })
        .error(function(){
            console.log('falhou miseravelmente');
        });
    }
}]);
