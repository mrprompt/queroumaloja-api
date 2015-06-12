'use strict';

// Declare app level module which depends on filters, and services
angular
    .module('panel', [
        'ngRoute',
        'ngResource',
        'ngSanitize',
        'ui.utils.masks',
        'panel.filters',
        'panel.services',
        'panel.directives',
        'panel.controllers.inicio',
        'panel.controllers.clientes',
        'panel.controllers.empregos',
        'panel.controllers.curriculos',
        'panel.controllers.parceiros',
        'panel.controllers.equipe',
        'panel.controllers.slides',
        'panel.controllers.orcamentos',
        'panel.controllers.produtos',
        'panel.controllers.contato',
        'panel.controllers.empresa',
        'panel.controllers.aviso',
    ])

.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/painel/template/inicio/index',
                controller: 'Inicio'
            })

        .when('/clientes', {
            templateUrl: '/painel/template/clientes/index',
            controller: 'Clientes'
        })
            .when('/clientes/adicionar', {
                templateUrl: '/painel/template/clientes/add',
                controller: 'Clientes'
            })
            .when('/clientes/editar/:id', {
                templateUrl: '/painel/template/clientes/edit',
                controller: 'Clientes'
            })

        .when('/empregos', {
            templateUrl: '/painel/template/empregos/index',
            controller: 'Empregos'
        })
            .when('/empregos/adicionar', {
                templateUrl: '/painel/template/empregos/add',
                controller: 'Empregos'
            })
            .when('/empregos/editar/:id', {
                templateUrl: '/painel/template/empregos/edit',
                controller: 'Empregos'
            })

        .when('/curriculos', {
            templateUrl: '/painel/template/curriculos/index',
            controller: 'Curriculos'
        })
            .when('/curriculos/adicionar', {
                templateUrl: '/painel/template/curriculos/add',
                controller: 'Curriculos'
            })
            .when('/curriculos/editar/:id', {
                templateUrl: '/painel/template/curriculos/edit',
                controller: 'Curriculos'
            })

        .when('/parceiros', {
            templateUrl: '/painel/template/parceiros/index',
            controller: 'Parceiros'
        })
            .when('/parceiros/adicionar', {
                templateUrl: '/painel/template/parceiros/add',
                controller: 'Parceiros'
            })
            .when('/parceiros/editar/:id', {
                templateUrl: '/painel/template/parceiros/edit',
                controller: 'Parceiros'
            })

        .when('/equipe', {
            templateUrl: '/painel/template/equipe/index',
            controller: 'Equipe'
        })
            .when('/equipe/adicionar', {
                templateUrl: '/painel/template/equipe/add',
                controller: 'Equipe'
            })
            .when('/equipe/editar/:id', {
                templateUrl: '/painel/template/equipe/edit',
                controller: 'Equipe'
            })

        .when('/orcamentos', {
            templateUrl: '/painel/template/orcamentos/index',
            controller: 'Orcamentos'
        })
            .when('/orcamentos/adicionar', {
                templateUrl: '/painel/template/orcamentos/add',
                controller: 'Orcamentos'
            })
            .when('/orcamentos/editar/:id', {
                templateUrl: '/painel/template/orcamentos/edit',
                controller: 'Orcamentos'
            })

        .when('/slides', {
            templateUrl: '/painel/template/slides/index',
            controller: 'Slides'
        })
            .when('/slides/adicionar', {
                templateUrl: '/painel/template/slides/add',
                controller: 'Slides'
            })
            .when('/slides/editar/:id', {
                templateUrl: '/painel/template/slides/edit',
                controller: 'Slides'
            })

        .when('/produtos', {
            templateUrl: '/painel/template/produtos/index',
            controller: 'Produtos'
        })
            .when('/produtos/adicionar', {
                templateUrl: '/painel/template/produtos/add',
                controller: 'Produtos'
            })
            .when('/produtos/editar/:id', {
                templateUrl: '/painel/template/produtos/edit',
                controller: 'Produtos'
            })

        .when('/contato', {
            templateUrl: '/painel/template/contato/index',
            controller: 'Contato'
        })
            .when('/contato/adicionar', {
                templateUrl: '/painel/template/contato/add',
                controller: 'Contato'
            })
            .when('/contato/editar/:id', {
                templateUrl: '/painel/template/contato/edit',
                controller: 'Contato'
            })

        .when('/aviso', {
            templateUrl: '/painel/template/aviso/index',
            controller: 'Aviso'
        })
            .when('/aviso/adicionar', {
                templateUrl: '/painel/template/aviso/add',
                controller: 'Aviso'
            })
            .when('/aviso/editar/:id', {
                templateUrl: '/painel/template/aviso/edit',
                controller: 'Aviso'
            })

        .when('/empresa', {
            templateUrl: '/painel/template/empresa/index',
            controller: 'Empresa'
        })

        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(false);
    }
]);