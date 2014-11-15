'use strict';

/* Controllers */
angular
    .module('painel.controllers.calcados', ['angularFileUpload'])

.controller('Calcados', ['$scope', '$routeParams', '$location', 'api', '$route', '$upload',
    function($scope, $routeParams, $location, api, $route, $upload) {
        $scope.activetab = $location.path();
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.calcados = [];

        activeMenu();

        $scope.editor = function() {
            $('.editor').wysiwyg();
            $('textarea').autosize();
        };

        $scope.paginas = function() {
            return Math.ceil($scope.calcados.length / $scope.pageSize);
        };

        $scope.load = function() {
            api.get('calcados').then(function(data) {
                $scope.calcados = (data.data);
            });
        };

        $scope.add = function() {
            api.post('calcados', $scope.calcado).then(function(data, status) {
                $scope.status = {
                    type: 'success',
                    message: 'calcado inserido com sucesso!'
                }

                $scope.calcado = '';
                $scope.calcadoForm.$setPristine();
            });
        };

        $scope.delete = function(id) {
            if (confirm('Você deseja realmente apagar o calcado?\nEste procedimento é irreversível!')) {
                api.delete('calcados/' + id).then(function(data) {
                    if (data.status == 200) {
                        $scope.status = {
                            type: 'success',
                            message: 'calcado removido com sucesso!'
                        }

                        $location.path('/calcados');
                        $scope.load();
                    } else {
                        $scope.status = {
                            type: 'danger',
                            message: 'Erro removendo calcado, tente novamente mais tarde'
                        }
                    }
                });
            }
        };

        $scope.edit = function() {
            api.put('calcados/' + $routeParams.id, $scope.calcado)
                .success(function(data) {
                    $scope.status = {
                        type: 'success',
                        message: 'calcado atualizado com sucesso!'
                    }
                })
                .error(function() {
                    $scope.status = {
                        type: 'danger',
                        message: 'Ocorreu um erro atualizando os dados do calcado, tente novamente mais tarde'
                    }
                });
        };

        $scope.get = function() {
            api.get('calcados/' + $routeParams.id).then(function(data) {
                $scope.calcado = (data.data);
            });
        };

        $scope.onFileSelect = function($files) {
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];

                $scope.upload = $upload.upload({
                    url: '/upload',
                    data: {
                        myObj: $scope.calcado
                    },
                    file: file, // or list of files ($files) for html5 only
                }).progress(function(evt) {
                    var porcentagem = parseInt(100.0 * evt.loaded / evt.total);

                    $scope.status = {
                        type: 'info',
                        message: porcentagem + '% enviados.... não feche esta janela.'
                    }
                }).success(function(data, status, headers, config) {
                    if (data.http_code == 400) {
                        $scope.status = {
                            type: 'danger',
                            message: data.message
                        }

                        return false;
                    }

                    $scope.status = {
                        type: 'success',
                        message: 'Imagem enviada com sucesso, você pode salvar agora'
                    }

                    $scope.calcado.imagem = JSON.stringify(data);
                });
            }
        }
    }
]);