#!/bin/env node
/**
 * @author Thiago Paes <mrprompt@gmail.com>
 * @type {*|exports|module.exports}
 */
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
        // Removed 'SIGUSR2' from the list - bugz with  nodemon/forever.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
            'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGTERM'
        ].forEach(function (element, index, array) {
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

        self.app.use('/aviso', site, require(__dirname + '/src/routes/aviso'));
        self.app.use('/carrinho', site, token, require(__dirname + '/src/routes/carrinho'));
        self.app.use('/cliente', site, require(__dirname + '/src/routes/cliente'));
        self.app.use('/curriculo', site, require(__dirname + '/src/routes/curriculo'));
        self.app.use('/emprego', site, require(__dirname + '/src/routes/emprego'));
        self.app.use('/equipe', site, require(__dirname + '/src/routes/equipe'));
        self.app.use('/orcamento', site, require(__dirname + '/src/routes/orcamento'));
        self.app.use('/parceiro', site, require(__dirname + '/src/routes/parceiro'));
        self.app.use('/produto', site, token, require(__dirname + '/src/routes/produto'));
        self.app.use('/site', site, token, require(__dirname + '/src/routes/site'));
        self.app.use('/slide', site, token, require(__dirname + '/src/routes/slide'));
        self.app.use('/usuario', site, token, require(__dirname + '/src/routes/usuario'));
        self.app.use('/login', site, require(__dirname + '/src/routes/login'));
        self.app.use('/logout', site, require(__dirname + '/src/routes/logout'));
    };

    /**
     *  Initialize the server (express), create the routes and register the handlers.
     */
    self.initializeServer = function () {
        self.app = express();

        self.app.set('ipaddress', process.env.OPENSHIFT_NODEJS_IP);
        self.app.set('port', process.env.OPENSHIFT_NODEJS_PORT);

        // first, enable CORS
        self.app.use(function(req, res, next) {
            res.header("Content-type", "application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Authorization, Origin, X-Requested-With, Content-Type, Accept, ETag, Cache-Control, If-None-Match, Site");
            res.header("Access-Control-Expose-Headers", "Etag, Authorization, Origin, X-Requested-With, Content-Type, Accept, If-None-Match, Access-Control-Allow-Origin, Site");
            res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");

            next();
        });

        // load modules
        self.app.use(bodyParser.json());
        self.app.use(bodyParser.urlencoded({ extended: true }));
        self.app.use(methodOverride());
        self.app.use(morgan('dev'));
        self.app.use(paginate.middleware(10, 100));

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
