'use strict';

/* Controllers */
angular
    .module('painel.controllers.curriculos', [])

.controller('Curriculos', ['$scope', '$routeParams', '$location', 'api', '$route',
    function($scope, $routeParams, $location, api, $route) {
        $scope.activetab = $location.path();
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.curriculos = [];

        activeMenu();

        $scope.paginas = function()  {
            return Math.ceil($scope.curriculos.length / $scope.pageSize);
         };

        $scope.localidades = function() {
            new dgCidadesEstados({
                cidade: document.getElementById('cidade'),
                estado: document.getElementById('estado'),
                change: true
            });
        };

        $scope.load = function() {
            api.get('curriculos').then(function(data) {
                $scope.curriculos = data.data;
            });
        };

        $scope.add = function() {
            api.post('curriculos', $scope.curriculo).then(function(data, status) {
                $scope.status = {
                    type: 'success',
                    message: 'Currículo inserido com sucesso!'
                }

                $scope.curriculo = '';
                $scope.curriculoForm.$setPristine();
            });
        };

        $scope.delete = function(id) {
            if (confirm('Você deseja realmente apagar o cliente?\nEste procedimento é irreversível!')) {
                api.delete('curriculos/' + id).then(function(data) {
                    if (data.status == 200) {
                        $scope.status = {
                            type: 'success',
                            message: 'Currículo removido com sucesso!'
                        }

                        $location.path('/curriculos');
                        $scope.load();
                    } else {
                        $scope.status = {
                            type: 'error',
                            message: 'Erro removendo cliente, tente novamente mais tarde'
                        }
                    }
                });
            }
        };

        $scope.edit = function() {
            api.put('curriculos/' + $routeParams.id, $scope.curriculo)
                .success(function(data) {
                    $scope.status = {
                        type: 'success',
                        message: 'Currículo atualizado com sucesso!'
                    }
                })
                .error(function() {
                    $scope.status = {
                        type: 'error',
                        message: 'Ocorreu um erro atualizando os dados do currículo, tente novamente mais tarde'
                    }
                });
        };

        $scope.get = function() {
            api.get('curriculos/' + $routeParams.id).then(function(data) {
                $scope.curriculo = (data.data);
            });

            new dgCidadesEstados({
                cidade: document.getElementById('cidade'),
                estado: document.getElementById('estado'),
                change: true
            });
        };
    }
]);
