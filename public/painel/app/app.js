'use strict';

// Declare app level module which depends on filters, and services
angular
    .module('painel', [
        'ngRoute',
        'ngResource',
        'ngSanitize',
        'ui.utils.masks',
        'painel.filters',
        'painel.services',
        'painel.directives',
        'painel.controllers.inicio',
        'painel.controllers.calcados',
        'painel.controllers.clientes',
        'painel.controllers.servicos',
        'painel.controllers.atuacao',
        'painel.controllers.empregos',
        'painel.controllers.curriculos',
        'painel.controllers.parceiros',
        'painel.controllers.equipe',
        'painel.controllers.slides',
        'painel.controllers.orcamentos',
        'painel.controllers.livros',
        'painel.controllers.uniformes',
        'painel.controllers.contato',
        'painel.controllers.empresa',
        'painel.controllers.aviso',
        'painel.controllers.parques',
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

        .when('/servicos', {
            templateUrl: '/painel/template/servicos/index',
            controller: 'Servicos'
        })
            .when('/servicos/adicionar', {
                templateUrl: '/painel/template/servicos/add',
                controller: 'Servicos'
            })
            .when('/servicos/editar/:id', {
                templateUrl: '/painel/template/servicos/edit',
                controller: 'Servicos'
            })

        .when('/atuacao', {
            templateUrl: '/painel/template/atuacao/index',
            controller: 'Atuacao'
        })
            .when('/atuacao/adicionar', {
                templateUrl: '/painel/template/atuacao/add',
                controller: 'Atuacao'
            })
            .when('/atuacao/editar/:id', {
                templateUrl: '/painel/template/atuacao/edit',
                controller: 'Atuacao'
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

        .when('/livros', {
            templateUrl: '/painel/template/livros/index',
            controller: 'Livros'
        })
            .when('/livros/adicionar', {
                templateUrl: '/painel/template/livros/add',
                controller: 'Livros'
            })
            .when('/livros/editar/:id', {
                templateUrl: '/painel/template/livros/edit',
                controller: 'Livros'
            })

        .when('/uniformes', {
            templateUrl: '/painel/template/uniformes/index',
            controller: 'Uniformes'
        })
            .when('/uniformes/adicionar', {
                templateUrl: '/painel/template/uniformes/add',
                controller: 'Uniformes'
            })
            .when('/uniformes/editar/:id', {
                templateUrl: '/painel/template/uniformes/edit',
                controller: 'Uniformes'
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

        .when('/usuarios', {
            templateUrl: '/painel/template/usuarios/index',
            controller: 'Usuarios'
        })
            .when('/usuarios/adicionar', {
                templateUrl: '/painel/template/usuarios/add',
                controller: 'Usuarios'
            })
            .when('/usuarios/editar/:id', {
                templateUrl: '/painel/template/usuarios/edit',
                controller: 'Usuarios'
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

        .when('/calcados', {
            templateUrl: '/painel/template/calcados/index',
            controller: 'Calcados'
        })
            .when('/calcados/adicionar', {
                templateUrl: '/painel/template/calcados/add',
                controller: 'Calcados'
            })
            .when('/calcados/editar/:id', {
                templateUrl: '/painel/template/calcados/edit',
                controller: 'Calcados'
            })

        .when('/parques', {
            templateUrl: '/painel/template/parques/index',
            controller: 'Parques'
        })
            .when('/parques/adicionar', {
                templateUrl: '/painel/template/parques/add',
                controller: 'Parques'
            })
            .when('/parques/editar/:id', {
                templateUrl: '/painel/template/parques/edit',
                controller: 'Parques'
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