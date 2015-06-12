'use strict';

/* Controllers */
angular
    .module('panel.controllers.empregos', [])

.controller('Empregos', ['$scope', '$routeParams', '$location', 'api', '$route',
    function($scope, $routeParams, $location, api, $route) {
        $scope.activetab = $location.path();
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.empregos = [];

        activeMenu();

        api.get('clientes').then(function(data) {
            $scope.atuacoes = (data.data);

            if ($('select[ng\-model="emprego.cliente"]')[0]) {
                jQuery.each(data.data, function(index, value) {
                    $('select[ng\-model="emprego.cliente"]').append(
                        new Option(value.nome, value._id)
                    );
                })
            }
        });

        $scope.editor = function() {
            $('.editor').wysiwyg();
            $('textarea').autosize();
        };

        $scope.paginas = function() {
            return Math.ceil($scope.empregos.length / $scope.pageSize);
        };

        $scope.load = function() {
            api.get('empregos').then(function(data) {
                $scope.empregos = data.data;
            });
        };

        $scope.add = function() {
            api
                .post('empregos', $scope.emprego)
                .success(function(data, status) {
                    $scope.status = {
                        type: 'success',
                        message: 'Vaga de emprego inserida com sucesso!'
                    }

                    $scope.emprego = '';
                    $scope.empregoForm.$setPristine();
                })
                .error(function(data, status) {
                    $scope.status = {
                        type: 'danger',
                        message: 'Ocorreu um erro ao salvar a vaga'
                    }
                });
        };

        $scope.delete = function(id) {
            if (confirm('Você deseja realmente apagar a vaga?\nEste procedimento é irreversível!')) {
                api.delete('empregos/' + id).then(function(data) {
                    if (data.status == 200) {
                        $scope.status = {
                            type: 'success',
                            message: 'Vaga removida com sucesso!'
                        }

                        $location.path('/empregos');
                        $scope.load();
                    } else {
                        $scope.status = {
                            type: 'error',
                            message: 'Erro removendo vaga, tente novamente mais tarde'
                        }
                    }
                });
            }
        };

        $scope.edit = function() {
            api.put('empregos/' + $routeParams.id, $scope.emprego)
                .success(function(data) {
                    $scope.status = {
                        type: 'success',
                        message: 'Vaga atualizada com sucesso!'
                    }
                })
                .error(function() {
                    $scope.status = {
                        type: 'error',
                        message: 'Ocorreu um erro atualizando os dados da vaga, tente novamente mais tarde'
                    }
                });
        };

        $scope.get = function() {
            api.get('empregos/' + $routeParams.id).then(function(data) {
                $scope.emprego = (data.data);
            });
        }
    }
]);
