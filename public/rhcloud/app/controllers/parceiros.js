'use strict';

/* Controllers */
angular
    .module('panel.controllers.parceiros', ['angularFileUpload'])

.controller('Parceiros', ['$scope', '$routeParams', '$location', 'api', '$route', '$upload',
    function($scope, $routeParams, $location, api, $route, $upload) {
        $scope.activetab = $location.path();
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.parceiros = [];

        activeMenu();

        $scope.editor = function() {
            $('.editor').wysiwyg();
            $('textarea').autosize();
        };

        $scope.paginas = function() {
            return Math.ceil($scope.parceiros.length / $scope.pageSize);
        };

        $scope.load = function() {
            api.get('parceiros').then(function(data) {
                $scope.parceiros = data.data;
            });
        };

        $scope.add = function() {
            api.post('parceiros', $scope.parceiro).then(function(data, status) {
                $scope.status = {
                    type: 'success',
                    message: 'Parceiro inserido com sucesso!'
                }

                $scope.parceiro = '';
                $scope.parceiroForm.$setPristine();
            });
        };

        $scope.delete = function(id) {
            if (confirm('Você deseja realmente apagar o parceiro?\nEste procedimento é irreversível!')) {
                api.delete('parceiros/' + id).then(function(data) {
                    if (data.status == 200) {
                        $scope.status = {
                            type: 'success',
                            message: 'Parceiro removido com sucesso!'
                        }

                        $location.path('/parceiros');
                        $scope.load();
                    } else {
                        $scope.status = {
                            type: 'error',
                            message: 'Erro removendo parceiro, tente novamente mais tarde'
                        }
                    }
                });
            }
        };

        $scope.edit = function() {
            api.put('parceiros/' + $routeParams.id, $scope.parceiro)
                .success(function(data) {
                    $scope.status = {
                        type: 'success',
                        message: 'Parceiro atualizado com sucesso!'
                    }
                })
                .error(function() {
                    $scope.status = {
                        type: 'error',
                        message: 'Ocorreu um erro atualizando os dados do parceiro, tente novamente mais tarde'
                    }
                });
        };

        $scope.get = function() {
            api.get('parceiros/' + $routeParams.id).then(function(data) {
                $scope.parceiro = (data.data);
            });
        };

        $scope.onFileSelect = function($files) {
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];

                $scope.upload = $upload.upload({
                    url: '/api/upload',
                    data: {
                        myObj: $scope.parceiro
                    },
                    file: file, // or list of files ($files) for html5 only
                }).progress(function(evt) {
                    var porcentagem = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.status = {
                        type: 'info',
                        message: porcentagem + '% enviados....'
                    }

                    console.log('percent: ' + porcentagem);
                }).success(function(data, status, headers, config) {
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

                    $scope.parceiro.imagem = JSON.stringify(data);
                });
            }
        };
    }
]);
