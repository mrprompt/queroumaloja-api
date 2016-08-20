'use strict';

var router          = require('express').Router();
var IndexController = {
    /**
     * Tela inicial
     *
     * @param req
     * @param res
     * @param done
     * @returns {*}
     */
    lista: function (req, res, done) {
        res.status(200).json({
            object: 'object',
            has_more: false,
            data: {
                name: req.app.site.nome + ' API',
                last_update: new Date()
            },
            itemCount: 1,
            pageCount: 1
        });

        done(null, data);
    }
};

router.get('/', IndexController.lista);

module.exports = router;