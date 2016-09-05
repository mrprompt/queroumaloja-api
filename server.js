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
var Index           = require('./routers/index');
var Carrinho        = require('./routers/carrinho');
var Produto         = require('./routers/produto');
var Site            = require('./routers/site');
var Usuario         = require('./routers/usuario');
var Login           = require('./routers/login');
var Logout          = require('./routers/logout');
var Senha           = require('./routers/senha');
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
        self.app.use('/carrinho', cors, site, token, Carrinho);
        self.app.use('/produto', cors, site, token, Produto);
        self.app.use('/site', cors, site, token, Site);
        self.app.use('/usuario', cors, site, token, Usuario);
        self.app.use('/login', cors, site, token, Login);
        self.app.use('/logout', cors, site, token, Logout);
        self.app.use('/senha', cors, site, token, Senha);
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
