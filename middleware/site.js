const site = require('../models/site');

const router = (req, res, done) => {
  if (req.method === 'OPTIONS') {
    done();

    return;
  }

  site.buscaPorDominio(req.hostname, (err, data) => {
    if (err || data === null) {
      data = {};
    }

    req.app.site = data;

    done();
  });
};

module.exports = router;
