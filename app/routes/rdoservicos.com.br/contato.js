'use strict';

exports.index = function (req, res) {
    var conteudos = {
        site: req.site
    };

    res.render(req.site.dominio + '/contato/index', conteudos);
};
