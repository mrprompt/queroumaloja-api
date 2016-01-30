/**
 * Carrinho de Compras
 *
 * @author Thiago Paes
 * @package carrinho
 * @licence GPL V3
 */
'use strict';

var paginate            = require('express-paginate');
var path                = require('path');
var CarrinhoModel       = require(path.join(__dirname, '/../models/carrinho'));
var CarrinhoController  = {
    /**
     * Lista todos os carrinhos
     *
     * @param req
     * @param res
     * @param done
     */
    lista: function (req, res, done) {
        CarrinhoModel.paginate(
            {
                site: req.headers.site
            },
            {
                page: req.query.page,
                limit: req.query.limit,
                populate: ['items.produto'],
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
        CarrinhoModel.findOne({
            _id: req.params.id,
            site: req.headers.site
        })
            .populate(['items.produto'])
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
        var transaction = {
            customer: {
                name: 'null',
                email: 'none@none.net'
            },
            phone: {
                ddd: 0,
                number: 0
            },
            address: {
                street: 'null',
                street_number: 0,
                complementary: 'null',
                neighborhood: 'null',
                zipcode: 0,
                city: 'null',
                state: 'null'
            }
        };

        var carrinho = new CarrinhoModel({
            cadastro: (new Date),
            site: req.headers.site,
            token: req.body.token,
            valor: req.body.valor,
            comprador: {
                nome: transaction.customer.name,
                email: transaction.customer.email,
                telefone: transaction.phone.ddd + transaction.phone.number,
                endereco: {
                    logradouro: transaction.address.street,
                    numero: transaction.address.street_number,
                    complemento: transaction.address.complementary,
                    bairro: transaction.address.neighborhood,
                    cep: transaction.address.zipcode
                },
                localidade: {
                    cidade: transaction.address.city,
                    estado: transaction.address.state,
                    uf: transaction.address.state
                }
            }
        });

        if (req.body.items) {
            req.body.items.forEach(function (item) {
                carrinho.items.push({
                    produto: item.produto,
                    quantidade: item.quantidade
                });
            });
        }

        carrinho.save(function (err, resultSave) {
            if (err) {
                return res.status(500).json({
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

                res.app.emit('carrinho:adiciona', resultSave);
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
                if (item.produto._id.toString() == req.body.produto) {
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
            .findOneAndUpdate(
                {
                    _id: req.params.id,
                    site: req.headers.site,
                    usuario: req.params.usuario
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

                        res.app.emit('carrinho.atualiza', result);
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
        CarrinhoModel.remove({
            _id: req.params.id,
            site: req.headers.site
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

                res.app.emit('carrinho.apaga', data);
            }

            done(err, data);
        });
    }
};

module.exports = CarrinhoController;