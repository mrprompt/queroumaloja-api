'use strict';

/* Controllers */
angular
    .module('app.controllers.livros', ['ngRoute'])

.controller('Livros', ['$scope', '$routeParams', '$location', 'api',
    function($scope, $routeParams, $location, api) {
        $scope.activetab = $location.path();
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.livros = [];

        $scope.load = function() {
            api.get('livros').then(function(data) {
                var livros = data.data;

                livros = livros.map(function(livro) {
                    livro.imagem = JSON.parse(livro.imagem);

                    return livro;
                });

                $scope.livros = livros;
            });
        };
    }
]);
