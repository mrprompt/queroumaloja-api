#!/bin/env node
/**
 * @author Thiago Paes <mrprompt@gmail.com>
 * @type {*|exports|module.exports}
 */
var express = require('express');
var os = require('os');
var path = require('path');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var usuarioModel = require('./models/usuario').Usuario;
var siteModel = require('./models/site').Site;
var app = require('./routes/app');
var panel = require('./routes/painel');
var api = require('./routes/api');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    usuarioModel.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        usuarioModel.findOne({
            email: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }

            if (user.password !== password) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }

            return done(null, user);
        });
    }
));

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/painel/login');
}

function getSite(req, res, next) {
    var dominio = req.headers.host.substr((req.headers.host.indexOf('.') + 1)).replace(/.[0-9]{2,4}$/, '');

    siteModel.findOne({
        dominio: dominio
    }, function(err, site) {
        if (err) {
            return res.status(500).send('Ocorreu um erro carregando site: ' + err);
        }

        if (null == site) {
            return res.redirect('/painel/login');
        }

        req.site = site;

        return next();
    });
}

/**
 *  Define the application.
 *
 * @author  Thiago Paes <mrprompt@gmail.com>
 * @package  publiciti
 */
var Publiciti = function() {
    //  Scope.
    var self = this;

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";
        self.port = process.env.OPENSHIFT_NODEJS_PORT || 8081;
        self.env = process.env.APPLICATION_ENV || 'production';
    };

    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig) {
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating app ...', Date(Date.now()), sig);

            process.exit(1);
        }

        console.log('%s: Node server stopped.', Date(Date.now()));
    };

    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function() {
        //  Process on exit and signals.
        process.on('exit', function() {
            self.terminator();
        });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
            'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() {
                self.terminator(element);
            });
        });
    };

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        // upload
        self.app.post('/upload', getSite, api.upload);

        // panel module
        self.app.get('/painel', ensureAuthenticated, panel.index);
        self.app.get('/painel/template/:diretorio/:name', panel.template);
        self.app.get('/painel/login', panel.login);
        self.app.post('/painel/login', passport.authenticate('local', {
                failureRedirect: '/painel/login',
                failureFlash: true
            }),
            function(req, res) {
                res.redirect('/painel');
            });
        self.app.get('/painel/logout', function(req, res) {
            req.logout();
            res.redirect('/painel');
        });

        // api module
        self.app.get('/api/:modulo', getSite, api.list);
        self.app.get('/api/:modulo/:id', getSite, api.get);
        self.app.post('/api/:modulo', ensureAuthenticated, getSite, api.create);
        self.app.put('/api/:modulo/:id', ensureAuthenticated, getSite, api.update);
        self.app.delete('/api/:modulo/:id', ensureAuthenticated, getSite, api.delete);

        // app module
        self.app.get('/', getSite, app.index);
        self.app.get('/:modulo', getSite, app.list);
        self.app.get('/:modulo/:id', getSite, app.get);
    };

    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.app = express();

        self.app.set('ipaddress', self.ipaddress);
        self.app.set('port', self.port);
        self.app.set('views', path.join(__dirname, 'views'));
        self.app.set('view engine', 'jade');

        self.app.use(express.compress());
        self.app.use(express.static(path.join(__dirname, 'public')));
        self.app.use(express.favicon());
        self.app.use(express.logger('dev'));
        self.app.use(express.json());
        self.app.use(express.urlencoded());
        self.app.use(express.methodOverride());
        self.app.use(express.cookieParser());
        self.app.use(express.bodyParser({
            keepExtensions: true,
            uploadDir: os.tmpdir()
        }));
        self.app.use(express.session({
            secret: 'keyboard cat'
        }));
        self.app.use(flash());
        self.app.use(passport.initialize());
        self.app.use(passport.session());
        self.app.use(self.app.router);

        // development only
        if ('development' == self.env) {
            self.app.use(express.errorHandler());
        }

        self.createRoutes();
    };

    /**
     *  Initializes the application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.setupTerminationHandlers();
        self.initializeServer();
    };

    /**
     *  Start the server (starts up the application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...', Date(Date.now()), self.ipaddress, self.port);
        });
    };
};

/**
 *  main():  Main code.
 */
var zapp = new Publiciti();
zapp.initialize();
zapp.start();
