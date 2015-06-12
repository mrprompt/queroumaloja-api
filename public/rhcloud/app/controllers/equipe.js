'use strict';

/* Controllers */
angular
    .module('panel.controllers.equipe', ['angularFileUpload'])

.controller('Equipe', ['$scope', '$routeParams', '$location', 'api', '$route', '$upload',
    function($scope, $routeParams, $location, api, $route, $upload) {
        $scope.activetab = $location.path();
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.membros = [];

        activeMenu();

        $scope.editor = function() {
            $('.editor').wysiwyg();

            $('textarea').autosize();
        };

        $scope.paginas = function() {
            return Math.ceil($scope.membros.length / $scope.pageSize);
        };

        $scope.load = function() {
            api.get('equipe').then(function(data) {
                $scope.membros = data.data;
            });
        };

        $scope.add = function() {
            api.post('equipe', $scope.membro).then(function(data, status) {
                $scope.status = {
                    type: 'success',
                    message: 'Membro da equipe inserido com sucesso!'
                }

                $scope.membro = '';
                $scope.equipeForm.$setPristine();
            });
        };

        $scope.delete = function(id) {
            if (confirm('Você deseja realmente apagar o membro?\nEste procedimento é irreversível!')) {
                api.delete('equipe/' + id).then(function(data) {
                    if (data.status == 200) {
                        $scope.status = {
                            type: 'success',
                            message: 'Membro removido com sucesso!'
                        }

                        $location.path('/equipe');
                        $scope.load();
                    } else {
                        $scope.status = {
                            type: 'error',
                            message: 'Erro removendo membro, tente novamente mais tarde'
                        }
                    }
                });
            }
        };

        $scope.edit = function() {
            api.put('equipe/' + $routeParams.id, $scope.membro)
                .success(function(data) {
                    $scope.status = {
                        type: 'success',
                        message: 'Membro atualizado com sucesso!'
                    }
                })
                .error(function() {
                    $scope.status = {
                        type: 'error',
                        message: 'Ocorreu um erro atualizando os dados do membro, tente novamente mais tarde'
                    }
                });
        };

        $scope.get = function() {
            api.get('equipe/' + $routeParams.id).then(function(data) {
                $scope.membro = (data.data);
            });
        };

        $scope.onFileSelect = function($files) {
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];

                $scope.upload = $upload
                    .upload({
                        url: '/api/upload',
                        file: file
                    })
                    .progress(function(evt) {
                        var porcentagem = parseInt(100.0 * evt.loaded / evt.total);

                        $scope.status = {
                            type: 'warning',
                            message: porcentagem + '% enviados....'
                        };

                        $scope.equipeForm.invalid = true;
                    })
                    .success(function(data, status, headers, config) {
                        if (data.http_code == 400) {
                            $scope.status = {
                                type: 'danger',
                                message: data.message
                            }

                            return false;
                        }

                        $scope.status = {
                            type: 'info',
                            message: 'Imagem enviada com sucesso, você pode salvar agora'
                        }

                        $scope.equipeForm.invalid = false;
                        $scope.membro.imagem = JSON.stringify(data);
                    })
                    .error(function(data) {
                        $scope.status = {
                            type: 'danger',
                            message: 'Ocorreu um erro enviando a imagem'
                        }

                        $scope.equipeForm.invalid = true;
                    });
            }
        }
    }
]);
