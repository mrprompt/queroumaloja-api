'use strict';

/* Controllers */
angular
    .module('app.controllers.contato', [])

.controller('Contato', ['$scope', '$routeParams', '$location', 'api',
    function($scope, $routeParams, $location, api) {
        $scope.activetab = $location.path();

        $('.alert').removeClass('hidden');

        $scope.load = function() {
            $scope.status = {
                type: 'info',
                message: ''
            };
        };

        $scope.add = function() {
            api.post('contato', $scope.contato).then(function(data, status) {
                $scope.status = {
                    type: 'success',
                    message: 'Contato enviado com sucesso!'
                }

                $scope.contato = '';
                $scope.contatoForm.$setPristine();
            });
        };
    }
]);