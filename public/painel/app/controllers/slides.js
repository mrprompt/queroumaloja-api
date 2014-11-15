'use strict';

/* Controllers */
angular
    .module('painel.controllers.slides', ['angularFileUpload'])

.controller('Slides', ['$scope', '$routeParams', '$location', 'api', '$upload', '$route',
    function($scope, $routeParams, $location, api, $upload, $route) {
        $scope.activetab = $location.path();
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.slides = [];

        activeMenu();

        $scope.editor = function() {
            $('.editor').wysiwyg();
            $('textarea').autosize();
        };

        $scope.paginas = function() {
            return Math.ceil($scope.slides.length / $scope.pageSize);
        };

        $scope.load = function() {
            api.get('slides').then(function(data) {
                $scope.slides = (data.data);
            });
        };

        $scope.add = function() {
            api.post('slides', $scope.slide).then(function(data, status) {
                $scope.status = {
                    type: 'success',
                    message: 'Slide inserido com sucesso!'
                }

                $scope.slide = '';
                $scope.slideForm.$setPristine();
            });
        };

        $scope.delete = function(id) {
            if (confirm('Você deseja realmente apagar o slide?\nEste procedimento é irreversível!')) {
                api.delete('slides/' + id).then(function(data) {
                    if (data.status == 200) {
                        $scope.status = {
                            type: 'success',
                            message: 'Slide removido com sucesso!'
                        }

                        $location.path('/slides');
                        $scope.load();
                    } else {
                        $scope.status = {
                            type: 'danger',
                            message: 'Erro removendo cliente, tente novamente mais tarde'
                        }
                    }
                });
            }
        };

        $scope.edit = function() {
            api.put('slides/' + $routeParams.id, $scope.slide)
                .success(function(data) {
                    $scope.status = {
                        type: 'success',
                        message: 'Slide atualizado com sucesso!'
                    }
                })
                .error(function() {
                    $scope.status = {
                        type: 'danger',
                        message: 'Ocorreu um erro atualizando os dados do slide, tente novamente mais tarde'
                    }
                });
        };

        $scope.get = function() {
            api.get('slides/' + $routeParams.id).then(function(data) {
                $scope.slide = (data.data);
            });
        };

        $scope.onFileSelect = function($files) {
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];

                $scope.upload = $upload.upload({
                    url: '/upload',
                    data: {
                        myObj: $scope.slide
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

                    $scope.slide.imagem = JSON.stringify(data);
                });
            }
        };
    }
]);
