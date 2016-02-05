'use strict';

GLOBAL._ = require('underscore');

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
var Index           = require('./src/routes/index');
var Aviso           = require('./src/routes/aviso');
var Carrinho        = require('./src/routes/carrinho');
var Emprego         = require('./src/routes/emprego');
var Equipe          = require('./src/routes/equipe');
var Parceiro        = require('./src/routes/parceiro');
var Produto         = require('./src/routes/produto');
var Site            = require('./src/routes/site');
var Slide           = require('./src/routes/slide');
var Usuario         = require('./src/routes/usuario');
var Login           = require('./src/routes/login');
var Logout          = require('./src/routes/logout');
var PagarMeWorker   = require('./src/workers/pagarme');
var LocalWorker     = require('./src/workers/local');

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
        self.app.use('/', site, token, Index);
        self.app.use('/aviso', site, token, Aviso);
        self.app.use('/carrinho', site, token, Carrinho);
        self.app.use('/emprego', site, token, Emprego);
        self.app.use('/equipe', site, token, Equipe);
        self.app.use('/parceiro', site, token, Parceiro);
        self.app.use('/produto', site, token, Produto);
        self.app.use('/site', site, token, Site);
        self.app.use('/slide', site, token, Slide);
        self.app.use('/usuario', site, token, Usuario);
        self.app.use('/login', site, token, Login);
        self.app.use('/logout', site, token, Logout);
    };

    /**
     * Load Workers
     */
    self.createWorkers = function () {
        PagarMeWorker.checaTransacao();
        LocalWorker.checaTransacao();
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
            console.log('Started on http://%s:%d', address, port);
        });
    };
};

/**
 *  Start application
 */
var api = new Application();
    api.initializeServer();
