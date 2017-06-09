const site = require('../models/site');

const router = (req, res, done) => {
  if (req.method === 'OPTIONS') {
    done();

    return;
  }

  site.buscaPorDominio(req.hostname, (err, data) => {
    if (err || data === null) {
      res.status(404);

      done(new Error('Site não encontrado'));

      return;
    }

    req.app.site = data;

    done();
  });
};

module.exports = router;
