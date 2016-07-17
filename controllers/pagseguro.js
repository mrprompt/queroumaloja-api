'use strict';

var router              = require('express').Router();
var Pagseguro           = require('pagseguro.js');
var PagseguroController  = {
    /**
     * Inicia uma transação na api do pagseguro
     *
     * @param req
     * @param res
     * @param done
     */
    adiciona: function (req, res, done) {
        if (req.app.site.config.pagseguro === undefined) {
            return;
        }

        var compra = Pagseguro({
            'name' : req.app.site.config.pagseguro.name,
            'email': req.app.site.config.pagseguro.email,
            'token': req.app.site.config.pagseguro.token
        });

        req.body.items.forEach(function(item) {
            compra.product.add({
                'id': item.produto._id,
                'description': item.produto.titulo,
                'amount': item.produto.valor[0].valor,
                'quantity': item.quantidade
            });
        });

        compra.sender.set(req.body.sender);

        compra.shipping.set(req.body.shipping);

        compra.checkout(function(err, response, body) {
            if (err) {
                    res.status(500).json({
                    object: 'error',
                    has_more: false,
                    data: err.message,
                    itemCount: 1,
                    pageCount: 1
                });
            } else {
                res.status(response.statusCode).json({
                    object: 'object',
                    has_more: false,
                    data: body,
                    itemCount: 1,
                    pageCount: 1
                });
            }

            done(err, body);
        });
    }
};

router.post('/', PagseguroController.adiciona);

module.exports = router;