'use strict';

const PAGINATION = {
    MIN: 10,
    MAX: 1000
};

var express         = require('express');
var paginate        = require('express-paginate');
var morgan          = require('morgan');
var methodOverride  = require('method-override');
var bodyParser      = require('body-parser');
var connection      = require('./modules/connection');
var cors            = require('./modules/cors');
var site            = require('./modules/site');
var token           = require('./modules/token');
var Index           = require('./controllers/index');
var Aviso           = require('./controllers/aviso');
var Carrinho        = require('./controllers/carrinho');
var Emprego         = require('./controllers/emprego');
var Equipe          = require('./controllers/equipe');
var Parceiro        = require('./controllers/parceiro');
var Produto         = require('./controllers/produto');
var Site            = require('./controllers/site');
var Slide           = require('./controllers/slide');
var Usuario         = require('./controllers/usuario');
var Login           = require('./controllers/login');
var Logout          = require('./controllers/logout');
var Senha           = require('./controllers/senha');
var PagSeguro       = require('./controllers/pagseguro');
var LocalWorker     = require('./workers/carrinho');

/**
 *  Define the application.
 */
var Application = function () {
    //  Scope.
    var self    = this;
    var port    = process.env.PORT || '8080';
    var env     = process.env.ENV || 'production';

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function () {
        self.app.use('/', cors, site, token, Index);
        self.app.use('/aviso', cors, site, token, Aviso);
        self.app.use('/carrinho', cors, site, token, Carrinho);
        self.app.use('/emprego', cors, site, token, Emprego);
        self.app.use('/equipe', cors, site, token, Equipe);
        self.app.use('/parceiro', cors, site, token, Parceiro);
        self.app.use('/produto', cors, site, token, Produto);
        self.app.use('/site', cors, site, token, Site);
        self.app.use('/slide', cors, site, token, Slide);
        self.app.use('/usuario', cors, site, token, Usuario);
        self.app.use('/login', cors, site, token, Login);
        self.app.use('/logout', cors, site, token, Logout);
        self.app.use('/senha', cors, site, token, Senha);
        self.app.use('/pagseguro', cors, site, PagSeguro);
    };

    /**
     * Load Workers
     */
    self.createWorkers = function () {
        LocalWorker.start();
    };

    /**
     *  Initialize the server (express), create the routes and register the handlers.
     */
    self.initializeServer = function () {
        // start ExpressJs
        self.app = express();

        // load modules
        self.app.use(bodyParser.json());
        self.app.use(bodyParser.urlencoded({ extended: true }));
        self.app.use(methodOverride());
        self.app.use(morgan('dev'));
        self.app.use(paginate.middleware(PAGINATION.MAX, PAGINATION.MAX));
        self.app.use(cors);

        // load routes
        self.createRoutes();

        // load workers
        self.createWorkers();

        // start server
        self.app.listen(port, function () {
            console.log('Started on port %d in %s mode', port, env);
        });
    };
};

/**
 *  Start application
 */
var api = new Application();
    api.initializeServer();
