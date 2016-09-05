'use strict';

var IndexController = function() {};

/**
 * Tela inicial
 *
 * @param req
 * @param res
 * @param done
 * @returns {*}
 */
IndexController.prototype.lista = function (req, res, done) {
  var data = {
      name: req.app.site.nome + ' API',
      last_update: new Date()
  };

  res.status(200).json({
      object: 'object',
      has_more: false,
      data: data,
      itemCount: 1,
      pageCount: 1
  });

  done(null, data);
};

module.exports = new IndexController;
