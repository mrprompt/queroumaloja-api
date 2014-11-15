'use strict';

/* Controllers */
angular
    .module('app.controllers.uniformes', [])

.controller('Uniformes', ['$scope', '$routeParams', '$location', 'api',
    function($scope, $routeParams, $location, api) {
        $scope.activetab = $location.path();
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.uniformes = [];

        $scope.load = function() {
            api.get('uniformes').then(function(data) {
                var uniformes = data.data;

                uniformes = uniformes.map(function(uniforme) {
                    if (uniforme.imagem) {
                        uniforme.imagem = JSON.parse(uniforme.imagem);
                    }

                    return uniforme;
                });

                $scope.uniformes = uniformes;
            });
        };

        $scope.get = function() {
            api.get('uniformes/' + $routeParams.id).then(function(data) {
                var uniforme = data.data;

                uniforme.imagem = JSON.parse(uniforme.imagem);

                $scope.uniforme = uniforme;
            });
        }
    }
]);
