'use strict';

/* Controllers */
angular
    .module('painel.controllers.servicos', [])

.controller('Servicos', ['$scope', '$routeParams', '$location', 'api',
    function($scope, $routeParams, $location, api) {
        $scope.activetab = $location.path();
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.servicos = [];

        activeMenu();

        api.get('atuacao').then(function(data) {
            $scope.atuacoes = (data.data);

            if ($('select[ng\-model="servico.atuacao"]')[0]) {
                jQuery.each(data.data, function(index, value) {
                    $('select[ng\-model="servico.atuacao"]').append(
                        new Option(value.titulo, value._id)
                    );
                })
            }
        });

        $scope.editor = function() {
            $('.editor').wysiwyg();
            $('textarea').autosize();
        };

        $scope.paginas = function()  {
            return Math.ceil($scope.servicos.length / $scope.pageSize);
         };

        $scope.load = function() {
            api.get('servicos').then(function(data) {
                $scope.servicos = (data.data);
            });
        };

        $scope.add = function() {
            api.post('servicos', $scope.servico).then(function(data, status) {
                $scope.status = {
                    type: 'success',
                    message: 'Serviço inserido com sucesso!'
                }

                $scope.servico = '';
                $scope.servicoForm.$setPristine();
            });
        };

        $scope.delete = function(id) {
            if (confirm('Você deseja realmente apagar o serviço?\nEste procedimento é irreversível!')) {
                api.delete('servicos/' + id).then(function(data) {
                    if (data.status == 200) {
                        $scope.status = {
                            type: 'success',
                            message: 'Serviço removido com sucesso!'
                        }

                        $location.path('/servicos');
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
            api.put('servicos/' + $routeParams.id, $scope.servico)
                .success(function(data) {
                    $scope.status = {
                        type: 'success',
                        message: 'Serviço atualizado com sucesso!'
                    }
                })
                .error(function() {
                    $scope.status = {
                        type: 'error',
                        message: 'Ocorreu um erro atualizando os dados do serviço, tente novamente mais tarde'
                    }
                });
        };

        $scope.get = function() {
            api.get('servicos/' + $routeParams.id).then(function(data) {
                $scope.servico = (data.data);
            });
        }
    }
]);
