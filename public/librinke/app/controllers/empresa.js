'use strict';

/* Controllers */
angular
    .module('app.controllers.empresa', [])

.controller('Empresa', ['$scope', '$routeParams', '$location',
    function($scope, $routeParams, $location) {
        $scope.activetab = $location.path();
    }
]);
