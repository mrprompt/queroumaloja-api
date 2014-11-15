'use strict';

/* Controllers */
angular
    .module('app.controllers.curriculos', ['angularFileUpload'])

.controller('Curriculos', ['$scope', '$routeParams', '$location', 'api', '$upload',
    function($scope, $routeParams, $location, api, $upload) {
        $scope.activetab = $location.path();

        $('.alert').removeClass('hidden');

        $scope.load = function() {
            $scope.status = {
                type: 'info',
                message: ''
            };

            new dgCidadesEstados({
                cidade: document.getElementById('cidade'),
                estado: document.getElementById('estado'),
                change: true
            });
        };

        $scope.add = function() {
            api.post('curriculos', $scope.curriculo).then(function(data, status) {
                $scope.status = {
                    type: 'success',
                    message: 'Currículo enviado com sucesso!'
                }
            });
        };

        $scope.onFileSelect = function($files) {
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];

                $scope.upload = $upload.upload({
                    url: '/upload',
                    data: {
                        myObj: $scope.curriculo
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
                            type: 'warning',
                            message: data.message
                        }

                        return false;
                    }

                    $scope.status = {
                        type: 'success',
                        message: 'Imagem enviada com sucesso, você pode salvar agora'
                    }

                    $scope.curriculo.arquivo = JSON.stringify(data);
                });
            }
        };
    }
]);