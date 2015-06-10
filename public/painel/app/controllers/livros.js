'use strict';

/* Controllers */
angular
    .module('painel.controllers.livros', ['angularFileUpload'])

.controller('Livros', ['$scope', '$routeParams', '$location', 'api', '$route', '$upload',
    function($scope, $routeParams, $location, api, $route, $upload) {
        $scope.activetab = $location.path();
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.livros = [];

        activeMenu();

        $scope.editor = function() {
            $('.editor').wysiwyg();
            $('textarea').autosize();
        };

        $scope.paginas = function() {
            return Math.ceil($scope.livros.length / $scope.pageSize);
        };

        $scope.load = function() {
            api.get('livros').then(function(data) {
                $scope.livros = (data.data);
            });
        };

        $scope.add = function() {
            api.post('livros', $scope.livro).then(function(data, status) {
                $scope.status = {
                    type: 'success',
                    message: 'livro inserido com sucesso!'
                }

                $scope.livro = '';
                $scope.livroForm.$setPristine();
            });
        };

        $scope.delete = function(id) {
            if (confirm('Você deseja realmente apagar o livro?\nEste procedimento é irreversível!')) {
                api.delete('livros/' + id).then(function(data) {
                    if (data.status == 200) {
                        $scope.status = {
                            type: 'success',
                            message: 'livro removido com sucesso!'
                        }

                        $location.path('/livros');
                        $scope.load();
                    } else {
                        $scope.status = {
                            type: 'danger',
                            message: 'Erro removendo livro, tente novamente mais tarde'
                        }
                    }
                });
            }
        };

        $scope.edit = function() {
            api.put('livros/' + $routeParams.id, $scope.livro)
                .success(function(data) {
                    $scope.status = {
                        type: 'success',
                        message: 'livro atualizado com sucesso!'
                    }
                })
                .error(function() {
                    $scope.status = {
                        type: 'danger',
                        message: 'Ocorreu um erro atualizando os dados do livro, tente novamente mais tarde'
                    }
                });
        };

        $scope.get = function() {
            api.get('livros/' + $routeParams.id).then(function(data) {
                $scope.livro = (data.data);
            });
        };

        $scope.onFileSelect = function($files) {
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];

                $scope.upload = $upload.upload({
                    url: '/api/upload',
                    data: {
                        myObj: $scope.livro
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

                    $scope.livro.imagem = JSON.stringify(data);
                });
            }
        }
    }
]);
