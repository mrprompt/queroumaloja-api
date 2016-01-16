'use strict';

GLOBAL._            = require('underscore');

const PAGINATION = {
    MIN: 10,
    MAX: 1000
};

var express         = require('express');
var paginate        = require('express-paginate');
var morgan          = require('morgan');
var methodOverride  = require('method-override');
var bodyParser      = require('body-parser');

/**
 *  Define the application.
 */
var Application = function () {
    //  Scope.
    var self    = this;
    var address = process.env.NODE_IP || '127.0.0.1';
    var port    = process.env.NODE_PORT || '8080';

    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function (sig) {
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating app ...', Date(Date.now()), sig);

            process.exit(1);
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
        var site     = require('./src/modules/site');
        var token    = require('./src/modules/token');
        var carrinho = require('./src/events/carrinho');

        self.app.use('/', site, require('./src/routes/index'));
        self.app.use('/aviso', site, token, require('./src/routes/aviso'));
        self.app.use('/carrinho', site, token, carrinho, require('./src/routes/carrinho'));
        self.app.use('/emprego', site, token, require('./src/routes/emprego'));
        self.app.use('/equipe', site, token, require('./src/routes/equipe'));
        self.app.use('/parceiro', site, token, require('./src/routes/parceiro'));
        self.app.use('/produto', site, token, require('./src/routes/produto'));
        self.app.use('/site', site, token, require('./src/routes/site'));
        self.app.use('/slide', site, token, require('./src/routes/slide'));
        self.app.use('/usuario', site, token, require('./src/routes/usuario'));
        self.app.use('/login', require('./src/routes/login'));
        self.app.use('/logout', site, token, require('./src/routes/logout'));
        self.app.use('/busca', site, require('./src/routes/busca'));
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
        self.app.use(require('./src/modules/cors'));

        // load routes
        self.createRoutes();

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
