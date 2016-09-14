'use strict';

const PAGINATION = {
    MIN: 10,
    MAX: 1000
};

require('dotenv').config({ silent: true });

// New Relic only necessary to production environment
if (process.env.ENV === 'production') { 
    require('newrelic');
}

// Main libraries
var express         = require('express');
var paginate        = require('express-paginate');
var morgan          = require('morgan');
var methodOverride  = require('method-override');
var bodyParser      = require('body-parser');
var cors            = require('cors');

// Modules
var connection      = require('./modules/connection');
var site            = require('./modules/site');
var token           = require('./modules/token');
var password        = require('./modules/password');

// Routes
var Busca           = require('./routers/busca');
var Imagem          = require('./routers/imagem');
var Index           = require('./routers/index');
var Login           = require('./routers/login');
var Produto         = require('./routers/produto');
var Senha           = require('./routers/senha');
var Site            = require('./routers/site');
var Usuario         = require('./routers/usuario');

/**
 *  Define the application.
 */
var Application = function () {
    var self    = this;
    var port    = process.env.PORT || '8080';
    var env     = process.env.ENV || 'production';

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function () {
        self.app.use('/', Index);
        self.app.use('/produto', Produto);
        self.app.use('/site', Site);
        self.app.use('/usuario', password, Usuario);
        self.app.use('/login', password, Login);
        self.app.use('/senha', password, Senha);
        self.app.use('/busca', Busca);
        self.app.use('/imagem', Imagem);
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
        self.app.use(cors());
        self.app.use(paginate.middleware(PAGINATION.MIN, PAGINATION.MAX));
        self.app.use(site);
        self.app.use(token);

        // load routes
        self.createRoutes();

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
