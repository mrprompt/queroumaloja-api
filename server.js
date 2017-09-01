const PAGINATION = {
  MIN: 10,
  MAX: 1000
};

require('dotenv').config({ silent: true });

// DB global connection
require('./middleware/connection');

// Main libraries
const express = require('express');
const paginate = require('express-paginate');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

// middleware
const fs = require('fs');
const site = require('./middleware/site');
const token = require('./middleware/token');
const password = require('./middleware/password');

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

/**
 *  Define the application.
 */
const Application = function () {
  const self = this;
  const port = process.env.PORT || '8080';
  const env = process.env.ENV || 'production';

  /**
   *  Create the routing table entries + handlers for the application.
   */
  self.createRoutes = function () {
    fs.readdirSync('./routers').forEach((file) => {
      const route = require(`./routers/${file}`);

      self.app.use(route);
    });
  };

  /**
   *  Initialize the server (express), create the routes and register the handlers.
   */
  self.initializeServer = function () {
    // start ExpressJs
    self.app = express();

    // load middleware
    self.app.use(bodyParser.json());
    self.app.use(bodyParser.urlencoded({ extended: true }));
    self.app.use(methodOverride());
    self.app.use(morgan('dev'));
    self.app.use(cors());
    self.app.use(compression({ filter: shouldCompress }));
    self.app.use(paginate.middleware(PAGINATION.MIN, PAGINATION.MAX));
    self.app.use(helmet());
    self.app.use(site);
    self.app.use(token);
    self.app.use(password);

    // load routes
    self.createRoutes();

    // start server
    self.app.listen(port, () => {
      console.log('Started on port %d in %s mode', port, env);
    });
  };
};

/**
 *  Start application
 */
const api = new Application();
api.initializeServer();
