'use strict';

/* Controllers */
angular
    .module('app.controllers.inicio', [])

.controller('Inicio', ['$scope', '$location', 'api',
    function($scope, $location, api) {
        $scope.activetab = $location.path();

        $scope.load = function() {
            // :)
        };
    }
]);
