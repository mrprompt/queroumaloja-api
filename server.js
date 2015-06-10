#!/bin/env node
/**
 * @author Thiago Paes <mrprompt@gmail.com>
 * @type {*|exports|module.exports}
 */
var express = require('express');
var session = require('express-session')
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var os = require('os');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var usuarioModel = require('./models/usuario').Usuario;
var siteModel = require('./models/site').Site;
var app = require('./routes/app');
var panel = require('./routes/grupo-publiciti.rhcloud.com/index');
var api = require('./routes/api');
var fs = require('fs');
var ini = require('ini').parse(fs.readFileSync('./config/config.ini', 'utf-8'));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    usuarioModel.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        usuarioModel.findOne({
            email: username,
            password: password
        }, function (err, user) {
            if (err) {
                console.log('Erro autenticando: ', err);

                return done(err);
            }

            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }

            console.log('Autenticado: ', user);

            return done(null, user);
        });
    }
));

/**
 *  Define the application.
 *
 * @author  Thiago Paes <mrprompt@gmail.com>
 * @package  publiciti
 */
var Publiciti = function () {
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
     * Find active site by url
     *
     * @param req
     * @param res
     * @param next
     */
    self.getSite = function (req, res, next) {
        var dominio = req.headers.host.substr((req.headers.host.indexOf('.') + 1)).replace(/.[0-9]{2,4}$/, '');

        siteModel.findOne({
            dominio: dominio
        }, function (err, site) {
            if (err) {

                res.status(500).send('Ocorreu um erro carregando site: ' + err);

                return next(err, null);
            }

            if (null == site) {
                site = {
                    dominio: ini.global.domain
                };
            }

            req.site = site;

            return next(null, req);
        });
    }

    /**
     * Check if the user is authenticated
     *
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    self.ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next(null, res);
        }

        res.redirect('/painel/login');
    }

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function () {
        // panel module
        self.app.get('/painel', self.ensureAuthenticated, panel.index);
        self.app.get('/painel/template/:diretorio/:name', panel.template);
        self.app.get('/painel/login', panel.login);
        self.app.post('/painel/login', passport.authenticate('local', {
                failureRedirect: '/painel/login',
                failureFlash: true
            }),
            function (req, res) {
                res.redirect('/painel');
            });
        self.app.get('/painel/logout', function (req, res) {
            req.logout();
            res.redirect('/painel/login');
        });

        // api module
        self.app.post('/api/upload', self.getSite, api.upload);
        self.app.get('/api/:modulo', self.getSite, api.list);
        self.app.get('/api/:modulo/:id', self.getSite, api.get);
        self.app.post('/api/:modulo', self.ensureAuthenticated, self.getSite, api.create);
        self.app.put('/api/:modulo/:id', self.ensureAuthenticated, self.getSite, api.update);
        self.app.delete('/api/:modulo/:id', self.ensureAuthenticated, self.getSite, api.delete);

        // app module
        self.app.get('/', self.getSite, app.index);
        self.app.get('/:modulo', self.getSite, app.list);
        self.app.get('/:modulo/:id', self.getSite, app.get);
    };

    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function () {
        self.app = express();

        self.app.set('ipaddress', process.env.OPENSHIFT_NODEJS_IP);
        self.app.set('port', process.env.OPENSHIFT_NODEJS_PORT);
        self.app.set('views', __dirname + '/views');
        self.app.set('view engine', 'jade');

        self.app.use(express.static(__dirname + '/public'));
        self.app.use(bodyParser.json());
        self.app.use(bodyParser.urlencoded({extended: true}));
        self.app.use(methodOverride());
        self.app.use(session({
            secret: 'aicaramba',
            name: 'publiciti',
            resave: true,
            saveUninitialized: true
        }));
        self.app.use(passport.initialize());
        self.app.use(passport.session());
        self.app.use(morgan('dev'));

        self.createRoutes();
    };

    /**
     *  Initializes the application.
     */
    self.initialize = function () {
        self.setupTerminationHandlers();
        self.initializeServer();
    };

    /**
     *  Start the server (starts up the application).
     */
    self.start = function () {
        //  Start the app on the specific interface (and port).
        self.app.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP, function () {
            console.log('%s: Node server started on %s:%d ...', Date(Date.now()), process.env.OPENSHIFT_NODEJS_IP, process.env.OPENSHIFT_NODEJS_PORT);
        });
    };
};

/**
 *  main():  Main code.
 */
var zapp = new Publiciti();
zapp.initialize();
zapp.start();
