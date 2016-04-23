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
var connection      = require('./src/modules/connection');
var cors            = require('./src/modules/cors');
var site            = require('./src/modules/site');
var token           = require('./src/modules/token');
var Index           = require('./src/controllers/index');
var Aviso           = require('./src/controllers/aviso');
var Carrinho        = require('./src/controllers/carrinho');
var Emprego         = require('./src/controllers/emprego');
var Equipe          = require('./src/controllers/equipe');
var Parceiro        = require('./src/controllers/parceiro');
var Produto         = require('./src/controllers/produto');
var Site            = require('./src/controllers/site');
var Slide           = require('./src/controllers/slide');
var Usuario         = require('./src/controllers/usuario');
var Login           = require('./src/controllers/login');
var Logout          = require('./src/controllers/logout');
var Senha           = require('./src/controllers/senha');
var SiteMap         = require('./src/controllers/sitemap');
var LocalWorker     = require('./src/workers/carrinho');

/**
 *  Define the application.
 */
var Application = function () {
    //  Scope.
    var self    = this;
    var address = process.env.NODE_IP   || '127.0.0.1';
    var port    = process.env.NODE_PORT || '8080';

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
        self.app.use('/sitemap', cors, site, token, SiteMap);
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
        self.app.listen(port, address, function () {
            console.log('Started on http://%s:%d in %s', address, port, process.env.NODE_ENV);
        });
    };
};

/**
 *  Start application
 */
var api = new Application();
    api.initializeServer();
