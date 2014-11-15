'use strict';

/* Controllers */
angular.module('painel.controllers.aviso', [])

.controller('Aviso', ['$scope', '$routeParams', '$location', 'api', '$route',
    function($scope, $routeParams, $location, api, $route) {
        $scope.activetab = $location.path();
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.avisos = [];

        activeMenu();

        $scope.editor = function() {
            $('.editor').wysiwyg();
            $('textarea').autosize();
            $('.datepicker').datepicker({
                format: 'dd-mm-yyyy'
            });
        };

        $scope.paginas = function() {
            return Math.ceil($scope.avisos.length / $scope.pageSize);
        };

        $scope.load = function() {
            api.get('aviso').then(function(data) {
                $scope.avisos = data.data;
            });
        };

        $scope.add = function() {
            api.post('aviso', $scope.aviso).then(function(data, status) {
                $scope.status = {
                    type: 'success',
                    message: 'inserida com sucesso!'
                }

                $scope.aviso = '';
                $scope.avisoForm.$setPristine();
            });
        };

        $scope.delete = function(id) {
            if (confirm('Você deseja realmente apagar o ítem?\nEste procedimento é irreversível!')) {
                api.delete('aviso/' + id).then(function(data) {
                    if (data.status == 200) {
                        $scope.status = {
                            type: 'success',
                            message: 'removida com sucesso!'
                        }

                        $location.path('/aviso');
                        $scope.load();
                    } else {
                        $scope.status = {
                            type: 'error',
                            message: 'Erro removendo, tente novamente mais tarde'
                        }
                    }
                });
            }
        };

        $scope.edit = function() {
            api.put('aviso/' + $routeParams.id, $scope.aviso)
                .success(function(data) {
                    $scope.status = {
                        type: 'success',
                        message: 'atualizada com sucesso!'
                    }
                })
                .error(function() {
                    $scope.status = {
                        type: 'error',
                        message: 'Ocorreu um erro atualizando, tente novamente mais tarde'
                    }
                });
        };

        $scope.get = function() {
            api.get('aviso/' + $routeParams.id).then(function(data) {
                $scope.aviso = (data.data);
            });
        }
    }
]);