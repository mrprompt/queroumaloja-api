#!/bin/env node
/**
 * @author Thiago Paes <mrprompt@gmail.com>
 * @type {*|exports|module.exports}
 */
var express = require('express');
var paginate = require('express-paginate');
var morgan = require('morgan');
var multer = require('multer')
var methodOverride = require('method-override');
var bodyParser = require('body-parser')
var os = require('os');
var fs = require('fs');
var ini = require('ini');
var path = require('path');
var api = require(__dirname + '/src/controllers');

global.ini = ini.parse(fs.readFileSync(__dirname + '/src/config/config.ini', 'utf-8'));

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
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
            'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function (element, index, array) {
                process.on(element, function () {
                    self.terminator(element);
                });
            });
    };

    /**
     * Check if the user is authenticated
     */
    self.ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next(null, res);
        }

        next();
    };

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function () {
        /**
         * GET requests
         */
        self.app.get('/:modulo', api.list);
        self.app.get('/:modulo/:id', api.get);

        /**
         * POST requests
         */
        self.app.post('/upload', api.upload);
        self.app.post('/:modulo', api.create);

        /**
         * PUT requests
         */
        self.app.put('/:modulo/:id', api.update);

        /**
         * DELETE requests
         */
        self.app.delete('/:modulo/:id', api.delete);
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
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Authorization, Origin, X-Requested-With, Content-Type, Accept, ETag, Cache-Control, If-None-Match");
            res.header("Access-Control-Expose-Headers", "Etag, Authorization, Origin, X-Requested-With, Content-Type, Accept, If-None-Match, Access-Control-Allow-Origin");
            res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");

            next();
        });

        self.app.use(multer({ dest: os.tmpdir() }));
        self.app.use(bodyParser.json());
        self.app.use(bodyParser.urlencoded({ extended: true }));
        self.app.use(methodOverride());
        self.app.use(morgan('dev'));
        self.app.use(paginate.middleware(12, 100));

        self.createRoutes();
    };

    /**
     *  Start the server (starts up the application).
     */
    self.start = function () {
        self.setupTerminationHandlers();

        self.initializeServer();

        self.app.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP, function () {
            console.log('Started on %s:%d', process.env.OPENSHIFT_NODEJS_IP, process.env.OPENSHIFT_NODEJS_PORT);
        });
    };
};

/**
 *  Start application
 */
var publiciti = new Application();
    publiciti.start();
