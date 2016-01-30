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
var Busca           = require('./src/routes/busca');
var PagarMeWorker   = require('./src/workers/pagarme');

/**
 *  Define the application.
 */
var Application = function () {
    //  Scope.
    var self    = this;
    var address = process.env.NODE_IP   || '127.0.0.1';
    var port    = process.env.NODE_PORT || '8080';

    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function (sig) {
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating app ...', Date(Date.now()), sig);

            process.exit(0);
        }

        console.log('%s: Node server stopped.', Date(Date.now()));
    };

    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function () {
        //  Process on exit and signals.
        process.on('exit', function () {
            self.terminator();
        });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        // Removed 'SIGUSR2' from the list - bugz with nodemon/forever.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGTERM']
            .forEach(function (element, index, array) {
                process.on(element, function () {
                    self.terminator(element);
                });
            });
    };

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
        self.app.use('/busca', site, token, Busca);
    };

    /**
     * Load Workers
     */
    self.createWorkers = function () {
        PagarMeWorker.checaTransacao();
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

    /**
     *  Start the server (starts up the application).
     */
    self.start = function () {
        self.setupTerminationHandlers();
        self.initializeServer();
    };
};

/**
 *  Start application
 */
var api = new Application();
    api.start();
