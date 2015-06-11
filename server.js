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
var localStrategy = require('passport-local').Strategy;
var usuarioModel = require('./models/usuario').Usuario;
var siteModel = require('./models/site').Site;
var app = require('./routes/app');
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

passport.use(new localStrategy(
    function (username, password, done) {
        usuarioModel.findOne({
            email: username,
            password: password
        }, function (err, user) {
            if (err) {
                console.log('Erro autenticando: ', err);

                return done(err);
            }

            var conteudo = {};

            if (!user) {
                conteudo.message = 'Invalid username/password';

                return done(null, false, conteudo);
            }

            return done(null, user);
        });
    }
));

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
            }

            if (null == site) {
                site = {
                    dominio: ini.global.domain
                };
            }

            req.site = site;

            next(err, site);
        });
    };

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

        return next();
    };

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function () {
        self.app.get('/', self.getSite, app.index);
        self.app.get('/logout', app.logout);
        self.app.get('/login', app.login);
        self.app.get('/api/:modulo', self.getSite, api.list);
        self.app.get('/api/:modulo/:id', self.getSite, api.get);
        self.app.get('/painel', self.ensureAuthenticated, self.getSite, app.panel);
        self.app.get('/painel/template/:diretorio/:name', app.template);
        self.app.get('/:modulo', self.getSite, app.list);
        self.app.get('/:modulo/:id', self.getSite, app.get);

        self.app.post('/api/upload', self.getSite, api.upload);
        self.app.post('/api/:modulo', self.ensureAuthenticated, self.getSite, api.create);
        self.app.post('/login', passport.authenticate('local', {
                failureRedirect: '/login',
                failureFlash: true
            }),
            function (req, res) {
                res.redirect('/painel');
            });

        self.app.put('/api/:modulo/:id', self.ensureAuthenticated, self.getSite, api.update);

        self.app.delete('/api/:modulo/:id', self.ensureAuthenticated, self.getSite, api.delete);
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

        self.app.use('/public', express.static(__dirname + '/public'));
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
