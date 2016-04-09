'use strict';

var router              = require('express').Router();
var paginate            = require('express-paginate');
var CarrinhoModel       = require('../../src/models/carrinho');
var CarrinhoController  = {
    /**
     * Lista todos os carrinhos
     *
     * @param req
     * @param res
     * @param done
     */
    lista: function (req, res, done) {
        CarrinhoModel
            .paginate(
                {
                    site: req.headers.site
                },
                {
                    page: req.query.page,
                    limit: req.query.limit,
                    populate: ['items.produto', 'comprador'],
                    sort: {cadastro : 'desc'}
                },
                function (err, data) {
                    if (err) {
                        res.status(500).json({
                            object: 'error',
                            has_more: false,
                            data: err.message,
                            itemCount: 1,
                            pageCount: 1
                        });
                    } else {
                        var pageCount = data.pages;
                        var itemCount = data.total;

                        res.status(200).json({
                            object: 'list',
                            has_more: paginate.hasNextPages(req)(pageCount),
                            data: data.docs,
                            itemCount: itemCount,
                            pageCount: pageCount
                        });
                    }

                    done(err, data);
                }
            );
    },

    /**
     * Abre um carrinho para visualização
     *
     * @param req
     * @param res
     * @param done
     */
    abre: function (req, res, done) {
        CarrinhoModel
            .findOne({
                _id: req.params.id,
                site: req.headers.site
            })
            .populate(['items.produto', 'comprador'])
            .exec(function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err.message,
                        itemCount: 1,
                        pageCount: 1
                    });
                } else {
                    res.status(200).json({
                        object: 'object',
                        has_more: false,
                        data: data,
                        itemCount: 1,
                        pageCount: 1
                    });
                }

                done(err, data);
            });
    },

    /**
     * Cria um novo carrinho com os produtos relacionados
     *
     * @param req
     * @param res
     * @param done
     */
    adiciona: function (req, res, done) {
        var carrinho = {
            cadastro    : (new Date),
            site        : req.app.site._id,
            comprador   : req.app.usuario._id,
            token       : req.body.token,
            valor       : req.body.valor,
            tipo        : req.body.tipo,
            entrega     : req.body.entrega,
            items       : []
        };

        if (req.body.items) {
            req.body.items.forEach(function (item) {
                carrinho.items.push({
                    produto: item.produto,
                    quantidade: item.quantidade
                });
            });
        }

        CarrinhoModel
            .create(
                carrinho,
                function (err, resultSave) {
                    if (err) {
                        res.status(500).json({
                            object: 'error',
                            has_more: false,
                            data: err.message,
                            itemCount: 1,
                            pageCount: 1
                        });
                    } else {
                        res.status(201).json({
                            object: 'object',
                            has_more: false,
                            data: resultSave,
                            itemCount: 1,
                            pageCount: 1
                        });
                    }

                    done(err, resultSave);
                });
    },

    /**
     * Atualiza os dados de um carrinho
     *
     * @param req
     * @param res
     * @param done
     */
    atualiza: function (req, res, done) {
        var data = {};

        if (req.body.produto && req.body.quantidade) {
            var exists = false;

            data.items.forEach(function (item) {
                if (item.produto._id.toString() === req.body.produto) {
                    item.quantidade += req.body.quantidade;

                    exists = true;
                }
            });

            if (exists === false) {
                data.items.push({
                    produto: req.body.produto,
                    quantidade: req.body.quantidade
                });
            }
        }

        if (req.body.status) {
            data.status = req.body.status;
        }

        if (req.body.token) {
            data.token = req.body.token;
        }

        if (req.body.valor) {
            data.valor = req.body.valor;
        }

        CarrinhoModel
            .update(
                {
                    _id: req.params.id,
                    site: req.headers.site,
                    comprador: req.app.usuario._id
                },
                data,
                function (err, result) {
                    if (err) {
                        res.status(500).json({
                            object: 'error',
                            has_more: false,
                            data: err.message,
                            itemCount: 1,
                            pageCount: 1
                        });
                    } else {
                        res.status(204).json({
                            object: 'object',
                            has_more: false,
                            data: result,
                            itemCount: 1,
                            pageCount: 1
                        });
                    }

                    done(err, result);
                }
            );
    },

    /**
     * Remove um carrinho
     *
     * @param req
     * @param res
     * @param done
     */
    apaga: function (req, res, done) {
        CarrinhoModel
            .remove({
                _id: req.params.id,
                site: req.headers.site,
                comprador: req.app.usuario._id
            }, function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err.message,
                        itemCount: 1,
                        pageCount: 1
                    });
                } else {
                    res.status(204).json({
                        object: 'object',
                        has_more: false,
                        data: data,
                        itemCount: 1,
                        pageCount: 1
                    });
                }

                done(err, data);
            });
    }
};

router.get('/', CarrinhoController.lista);
router.get('/:id', CarrinhoController.abre);
router.post('/', CarrinhoController.adiciona);
router.put('/:id', CarrinhoController.atualiza);
router.delete('/:id', CarrinhoController.apaga);

module.exports = router;