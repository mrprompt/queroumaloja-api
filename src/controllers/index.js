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
        var data = req.app.site;

        res.status(200).json({
            object: 'object',
            has_more: false,
            data: data,
            itemCount: 1,
            pageCount: 1
        });

        done(null, data);
    }
};

router.get('/', IndexController.lista);

module.exports = router;