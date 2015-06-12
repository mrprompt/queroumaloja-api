'use strict';

/* Controllers */
angular
    .module('app.controllers.orcamento', [])

.controller('Orcamento', ['$scope', '$routeParams', '$location', 'api',
    function($scope, $routeParams, $location, api) {
        $scope.activetab = $location.path();

        $('.alert').removeClass('hidden');

        $scope.load = function() {
            $scope.status = {
                type: 'info',
                message: ''
            };

            new dgCidadesEstados({
                cidade: document.getElementById('cidade'),
                estado: document.getElementById('estado'),
                change: true
            });
        };

        $scope.add = function() {
            api.post('orcamentos', $scope.orcamento).then(function(data, status) {
                $scope.status = {
                    type: 'success',
                    message: 'Orçamento inserido com sucesso!'
                }

                $scope.orcamento = '';
                $scope.orcamentoForm.$setPristine();
            });
        };
    }
]);