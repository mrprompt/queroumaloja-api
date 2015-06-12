'use strict';

// Declare app level module which depends on filters, and services
angular
    .module('app', [
        'ngRoute',
        'ngResource',
        'ngSanitize',
        'app.filters',
        'app.services',
        'app.directives',
        'app.controllers.inicio',
        'app.controllers.contato',
        'ui.utils.masks'
    ]);
