'use strict';

/* Controllers */
angular
    .module('painel.controllers.parques', ['angularFileUpload'])

.controller('Parques', ['$scope', '$routeParams', '$location', 'api', '$route', '$upload',
    function($scope, $routeParams, $location, api, $route, $upload) {
        $scope.activetab = $location.path();
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.parques = [];

        activeMenu();

        $scope.editor = function() {
            $('.editor').wysiwyg();
            $('textarea').autosize();
        };

        $scope.paginas = function() {
            return Math.ceil($scope.parques.length / $scope.pageSize);
        };

        $scope.load = function() {
            api.get('parques').then(function(data) {
                $scope.parques = (data.data);
            });
        };

        $scope.add = function() {
            api.post('parques', $scope.parque).then(function(data, status) {
                $scope.status = {
                    type: 'success',
                    message: 'parques inserido com sucesso!'
                }

                $scope.parque = '';
                $scope.parquesForm.$setPristine();
                $location.path('/parques');
                $scope.load();
            });
        };

        $scope.delete = function(id) {
            if (confirm('Você deseja realmente apagar o parques?\nEste procedimento é irreversível!')) {
                api.delete('parques/' + id).then(function(data) {
                    if (data.status == 200) {
                        $scope.status = {
                            type: 'success',
                            message: 'parques removido com sucesso!'
                        }

                        $location.path('/parques');
                        $scope.load();
                    } else {
                        $scope.status = {
                            type: 'danger',
                            message: 'Erro removendo parques, tente novamente mais tarde'
                        }
                    }
                });
            }
        };

        $scope.edit = function() {
            api.put('parques/' + $routeParams.id, $scope.parques)
                .success(function(data) {
                    $scope.status = {
                        type: 'success',
                        message: 'parques atualizado com sucesso!'
                    }
                })
                .error(function() {
                    $scope.status = {
                        type: 'danger',
                        message: 'Ocorreu um erro atualizando os dados do parques, tente novamente mais tarde'
                    }
                });
        };

        $scope.get = function() {
            api.get('parques/' + $routeParams.id).then(function(data) {
                $scope.parque = (data.data);
            });
        };

        $scope.onFileSelect = function($files) {
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];

                $scope.upload = $upload.upload({
                    url: '/api/upload',
                    data: {
                        myObj: $scope.parque
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

                    $scope.parque.imagem = JSON.stringify(data);
                    $scope.add();
                    $location.path('/parques');
                    $scope.load();
                });
            }
        }
    }
]);