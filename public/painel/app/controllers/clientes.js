'use strict';

/* Controllers */
angular
    .module('painel.controllers.clientes', [])

.controller('Clientes', ['$scope', '$routeParams', '$location', 'api', '$route',
    function($scope, $routeParams, $location, api, $route) {
        $scope.activetab = $location.path();
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.clientes = [];

        activeMenu();

        $scope.editor = function() {
            $('.editor').wysiwyg();
            $('textarea').autosize();
        };

        $scope.paginas = function()  {
            return Math.ceil($scope.clientes.length / $scope.pageSize);
         };

        $scope.load = function() {
            api.get('clientes').then(function(data) {
                $scope.clientes = data.data;
            });
        };

        $scope.add = function() {
            api.post('clientes', $scope.cliente).then(function(data, status) {
                $scope.status = {
                    type: 'success',
                    message: 'Cliente inserido com sucesso!'
                }

                $scope.cliente = '';
                $scope.clienteForm.$setPristine();
            });
        };

        $scope.delete = function(id) {
            if (confirm('Você deseja realmente apagar o cliente?\nEste procedimento é irreversível!')) {
                api.delete('clientes/' + id).then(function(data) {
                    if (data.status == 200) {
                        $scope.status = {
                            type: 'success',
                            message: 'Cliente removido com sucesso!'
                        }

                        $location.path('/clientes');
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
            api.put('clientes/' + $routeParams.id, $scope.cliente)
                .success(function(data) {
                    $scope.status = {
                        type: 'success',
                        message: 'Cliente atualizado com sucesso!'
                    }
                })
                .error(function() {
                    $scope.status = {
                        type: 'error',
                        message: 'Ocorreu um erro atualizando os dados do cliente, tente novamente mais tarde'
                    }
                });
        };

        $scope.get = function() {
            api.get('clientes/' + $routeParams.id).then(function(data) {
                $scope.cliente = (data.data);
            });
        }
    }
]);
