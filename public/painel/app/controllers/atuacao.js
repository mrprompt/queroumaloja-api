'use strict';

/* Controllers */
angular
    .module('painel.controllers.atuacao', [])

.controller('Atuacao', ['$scope', '$routeParams', '$location', 'api', '$route',
    function($scope, $routeParams, $location, api, $route) {
        $scope.activetab = $location.path();
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.atuacoes = [];

        activeMenu();

        $scope.editor = function() {
            $('.editor').wysiwyg();
            $('textarea').autosize();
        };

        $scope.paginas = function()  {
            return Math.ceil($scope.atuacoes.length / $scope.pageSize);
         };

        $scope.load = function() {
            api.get('atuacao').then(function(data) {
                $scope.atuacoes = data.data;
            });
        };

        $scope.add = function() {
            api.post('atuacao', $scope.atuacao).then(function(data, status) {
                $scope.status = {
                    type: 'success',
                    message: 'Atuação inserida com sucesso!'
                }

                $scope.atuacao = '';
                $scope.atuacaoForm.$setPristine();
            });
        };

        $scope.delete = function(id) {
            if (confirm('Você deseja realmente apagar o ítem?\nEste procedimento é irreversível!')) {
                api.delete('atuacao/' + id).then(function(data) {
                    if (data.status == 200) {
                        $scope.status = {
                            type: 'success',
                            message: 'Atuação removida com sucesso!'
                        }

                        $location.path('/atuacao');
                        $scope.load();
                    } else {
                        $scope.status = {
                            type: 'error',
                            message: 'Erro removendo atuação, tente novamente mais tarde'
                        }
                    }
                });
            }
        };

        $scope.edit = function() {
            api.put('atuacao/' + $routeParams.id, $scope.atuacao)
                .success(function(data) {
                    $scope.status = {
                        type: 'success',
                        message: 'Atuação atualizada com sucesso!'
                    }
                })
                .error(function() {
                    $scope.status = {
                        type: 'error',
                        message: 'Ocorreu um erro atualizando os dados da atuação, tente novamente mais tarde'
                    }
                });
        };

        $scope.get = function() {
            api.get('atuacao/' + $routeParams.id).then(function(data) {
                $scope.atuacao = (data.data);
            });
        }
    }
]);
