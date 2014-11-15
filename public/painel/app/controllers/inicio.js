'use strict';

/* Controllers */
angular
    .module('painel.controllers.inicio', [])

.controller('Inicio', ['$scope', '$location', 'api',
    function($scope, $location, api) {
        $scope.activetab = $location.path();

        activeMenu();

        $scope.load = function() {
        };
    }
]);
