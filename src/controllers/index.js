/**
 * Tela inicial
 *
 * @author Thiago Paes
 * @package index
 * @licence GPL V3
 */
'use strict';

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
        res
            .status(200)
            .json({
                object: 'string',
                has_more: false,
                data: 'Olá :)',
                itemCount: 1,
                pageCount: 1
            });

        return done;
    }
};

module.exports = IndexController;
