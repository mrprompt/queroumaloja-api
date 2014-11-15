'use strict';

/* Controllers */
angular
    .module('app.controllers.empresa', [])

.controller('Empresa', ['$scope', '$routeParams', '$location', 'api',
    function($scope, $routeParams, $location, api) {
        $scope.activetab = $location.path();

        api.get('atuacao').then(function(data) {
            $scope.atuacoes = data.data;
        });

        api.get('equipe').then(function(data) {
            var equipe = data.data;

            equipe = equipe.map(function (membro) {
                if (membro.imagem) {
                    membro.imagem = JSON.parse(membro.imagem);
                }

                return membro;
            });

            $scope.equipe = equipe;
        });
    }
]);
