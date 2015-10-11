'use strict';

GLOBAL._            = require('underscore');

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
    var self = this;

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
        var site  = require(__dirname + '/src/modules/site');
        var token = require(__dirname + '/src/modules/token');

        self.app.use('/aviso', site, token, require(__dirname + '/src/routes/aviso'));
        self.app.use('/carrinho', site, token, require(__dirname + '/src/routes/carrinho'));
        self.app.use('/emprego', site, token, require(__dirname + '/src/routes/emprego'));
        self.app.use('/equipe', site, token, require(__dirname + '/src/routes/equipe'));
        self.app.use('/parceiro', site, token, require(__dirname + '/src/routes/parceiro'));
        self.app.use('/produto', site, token, require(__dirname + '/src/routes/produto'));
        self.app.use('/site', token, require(__dirname + '/src/routes/site'));
        self.app.use('/slide', site, token, require(__dirname + '/src/routes/slide'));
        self.app.use('/usuario', site, token, require(__dirname + '/src/routes/usuario'));
        self.app.use('/login', require(__dirname + '/src/routes/login'));
        self.app.use('/logout', site, token, require(__dirname + '/src/routes/logout'));
        self.app.use('/busca', site, require(__dirname + '/src/routes/busca'));
    };

    /**
     *  Initialize the server (express), create the routes and register the handlers.
     */
    self.initializeServer = function () {
        self.app = express();

        self.app.set('ipaddress', process.env.OPENSHIFT_NODEJS_IP);
        self.app.set('port', process.env.OPENSHIFT_NODEJS_PORT);

        // load modules
        self.app.use(bodyParser.json());
        self.app.use(bodyParser.urlencoded({ extended: true }));
        self.app.use(methodOverride());
        self.app.use(morgan('dev'));
        self.app.use(paginate.middleware(10, 100));
        self.app.use(require(__dirname + '/src/modules/cors'));

        // load routes
        self.createRoutes();
    };

    /**
     *  Start the server (starts up the application).
     */
    self.start = function () {
        self.setupTerminationHandlers();

        self.initializeServer();

        self.app.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP, function () {
            console.log('Started on http://%s:%d', process.env.OPENSHIFT_NODEJS_IP, process.env.OPENSHIFT_NODEJS_PORT);
        });
    };
};

/**
 *  Start application
 */
var api = new Application();
    api.start();
