'use strict';

/* Controllers */
angular
    .module('painel.controllers.uniformes', ['angularFileUpload'])

.controller('Uniformes', ['$scope', '$routeParams', '$location', 'api', '$route', '$upload',
    function($scope, $routeParams, $location, api, $route, $upload) {
        $scope.activetab = $location.path();
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.uniformes = [];

        activeMenu();

        $scope.editor = function() {
            $('.editor').wysiwyg();
            $('textarea').autosize();
        };

        $scope.paginas = function() {
            return Math.ceil($scope.uniformes.length / $scope.pageSize);
        };

        $scope.load = function() {
            api.get('uniformes').then(function(data) {
                $scope.uniformes = (data.data);
            });
        };

        $scope.add = function() {
            api.post('uniformes', $scope.uniforme).then(function(data, status) {
                $scope.status = {
                    type: 'success',
                    message: 'uniforme inserido com sucesso!'
                }

                $scope.uniforme = '';
                $scope.uniformeForm.$setPristine();
            });
        };

        $scope.delete = function(id) {
            if (confirm('Você deseja realmente apagar o uniforme?\nEste procedimento é irreversível!')) {
                api.delete('uniformes/' + id).then(function(data) {
                    if (data.status == 200) {
                        $scope.status = {
                            type: 'success',
                            message: 'uniforme removido com sucesso!'
                        }

                        $location.path('/uniformes');
                        $scope.load();
                    } else {
                        $scope.status = {
                            type: 'danger',
                            message: 'Erro removendo uniforme, tente novamente mais tarde'
                        }
                    }
                });
            }
        };

        $scope.edit = function() {
            api.put('uniformes/' + $routeParams.id, $scope.uniforme)
                .success(function(data) {
                    $scope.status = {
                        type: 'success',
                        message: 'uniforme atualizado com sucesso!'
                    }
                })
                .error(function() {
                    $scope.status = {
                        type: 'danger',
                        message: 'Ocorreu um erro atualizando os dados do uniforme, tente novamente mais tarde'
                    }
                });
        };

        $scope.get = function() {
            api.get('uniformes/' + $routeParams.id).then(function(data) {
                $scope.uniforme = (data.data);
            });
        };

        $scope.onFileSelect = function($files) {
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];

                $scope.upload = $upload.upload({
                    url: '/upload',
                    data: {
                        myObj: $scope.uniforme
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

                    $scope.uniforme.imagem = JSON.stringify(data);
                });
            }
        }
    }
]);
