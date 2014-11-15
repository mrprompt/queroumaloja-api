'use strict';

/* Controllers */
angular
    .module('painel.controllers.orcamentos', [])

.controller('Orcamentos', ['$scope', '$routeParams', '$location', 'api', '$route',
    function($scope, $routeParams, $location, api, $route) {
        $scope.activetab = $location.path();
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.orcamentos = [];

        activeMenu();

        $scope.editor = function() {
            $('.editor').wysiwyg();
            $('textarea').autosize();
        };

        $scope.paginas = function()  {
            return Math.ceil($scope.orcamentos.length / $scope.pageSize);
         };

        $scope.localidades = function() {
            new dgCidadesEstados({
                cidade: document.getElementById('cidade'),
                estado: document.getElementById('estado'),
                change: true
            });
        };

        $scope.load = function() {
            api.get('orcamentos').then(function(data) {
                $scope.orcamentos = data.data;
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

        $scope.delete = function(id) {
            if (confirm('Você deseja realmente apagar o orçamento?\nEste procedimento é irreversível!')) {
                api.delete('orcamentos/' + id).then(function(data) {
                    if (data.status == 200) {
                        $scope.status = {
                            type: 'success',
                            message: 'Orçamento removido com sucesso!'
                        }

                        $location.path('/orcamentos');
                        $scope.load();
                    } else {
                        $scope.status = {
                            type: 'error',
                            message: 'Erro removendo orçamento, tente novamente mais tarde'
                        }
                    }
                });
            }
        };

        $scope.edit = function() {
            api.put('orcamentos/' + $routeParams.id, $scope.orcamento)
                .success(function(data) {
                    $scope.status = {
                        type: 'success',
                        message: 'Orçamento atualizado com sucesso!'
                    }
                })
                .error(function() {
                    $scope.status = {
                        type: 'error',
                        message: 'Ocorreu um erro atualizando os dados do orçamento, tente novamente mais tarde'
                    }
                });
        };

        $scope.get = function() {
            api.get('orcamentos/' + $routeParams.id).then(function(data) {
                $scope.orcamento = (data.data);
            });

            new dgCidadesEstados({
                cidade: document.getElementById('cidade'),
                estado: document.getElementById('estado'),
                change: true
            });
        }
    }
]);
