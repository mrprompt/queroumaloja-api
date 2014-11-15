'use strict';

/* Controllers */
angular
    .module('app.controllers.inicio', [])

.controller('Inicio', ['$scope', '$location', 'api',
    function($scope, $location, api) {
        $scope.carrega = function() {
            $(".skill1").knob({
                'max': 100,
                'width': 64,
                'readOnly': true,
                'inputColor': ' #FFFFFF ',
                'bgColor': ' #222222 ',
                'fgColor': ' #e96656 '
            });

            $(".skill2").knob({
                'max': 100,
                'width': 64,
                'readOnly': true,
                'inputColor': ' #FFFFFF ',
                'bgColor': ' #222222 ',
                'fgColor': ' #34d293 '
            });

            $(".skill3").knob({
                'max': 100,
                'width': 64,
                'readOnly': true,
                'inputColor': ' #FFFFFF ',
                'bgColor': ' #222222 ',
                'fgColor': ' #3ab0e2 '
            });

            $(".skill4").knob({
                'max': 100,
                'width': 64,
                'readOnly': true,
                'inputColor': ' #FFFFFF ',
                'bgColor': ' #222222 ',
                'fgColor': ' #E7AC44 '
            });
        };

        $scope.enviaContato = function() {
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
