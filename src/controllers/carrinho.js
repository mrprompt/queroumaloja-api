'use strict';

var paginate            = require('express-paginate');
var sendgrid            = require('sendgrid')('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');
var CarrinhoModel       = require(__dirname + '/../models/carrinho');
var CarrinhoController  = {
    lista: function (req, res) {
        CarrinhoModel.paginate(
            {
                site: req.headers.site,
                usuario: req.params.usuario
            },
            {
                page: req.query.page,
                limit: req.query.limit,
                populate: ['items.produto', 'site', 'usuario'],
                sortBy: {
                    cadastro: -1
                }
            },
            function (err, data, pageCount, itemCount) {
                if (err) {
                    return res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err,
                        itemCount: 1,
                        pageCount: 1
                    });
                }

                res.status(200).json({
                    object: 'list',
                    has_more: paginate.hasNextPages(req)(pageCount),
                    data: data,
                    itemCount: itemCount,
                    pageCount: pageCount
                });
            }
        );
    },

    abre: function (req, res) {
        CarrinhoModel.findOne({
            _id: req.params.id,
            site: req.headers.site,
            usuario: req.params.usuario
        })
            .populate(['items.produto', 'site', 'usuario'])
            .exec(function (err, data) {
                if (err) {
                    return res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err,
                        itemCount: 1,
                        pageCount: 1
                    });
                }

                res.status(200).json({
                    object: 'object',
                    has_more: false,
                    data: data,
                    itemCount: 1,
                    pageCount: 1
                });
            });
    },

    adiciona: function (req, res) {
        var carrinho = new CarrinhoModel({
            titulo: (req.body.titulo ? req.body.titulo : 'Sem título'),
            cadastro: (new Date),
            site: req.headers.site,
            usuario: req.params.usuario,
            token: (req.body.token ? req.body.token : null),
            status: (req.body.status ? req.body.status : 'novo'),
            valor: req.body.valor,
        });

        if (req.body.items) {
            req.body.items.forEach(function (item) {
                carrinho.items.push({
                    produto: item.produto,
                    quantidade: item.quantidade
                });
            });
        }

        if (req.body.produto && req.body.quantidade) {
            carrinho.items.push({
                produto: req.body.produto,
                quantidade: req.body.quantidade
            });
        }

        carrinho.save(function (err, resultSave) {
            if (err) {
                return res.status(500).json({
                    object: 'error',
                    has_more: false,
                    data: err,
                    itemCount: 1,
                    pageCount: 1
                });
            }

            var site = require(__dirname + '/../models/site')
                .findOne({_id: req.headers.site})
                .then(function (_site) {
                    var email = new sendgrid.Email({
                        to: _site.emails[0],
                        from: 'system@publiciti.com.br',
                        subject: ' ',
                        html: ' '
                    });

                    email.setFilters({
                        'templates': {
                            'settings': {
                                'enable': 1,
                                'template_id': 'd5e54ad0-718f-4a53-8827-b1dbaeb68238',
                            }
                        }
                    });

                    email.addSubstitution('%carrinho%', resultSave._id);
                    email.addSubstitution('%status%', resultSave.status);
                    email.addSubstitution('%items%', JSON.stringify(resultSave.items));

                    sendgrid.send(email, function (err, json) {
                        if (err) {
                            return console.error(err);
                        }
                        return json;
                    });
                });

            res.status(201).json({
                object: 'object',
                has_more: false,
                data: resultSave,
                itemCount: 1,
                pageCount: 1
            });
        });
    },

    atualiza: function (req, res) {
        CarrinhoModel.findOne({
            _id: req.params.id,
            site: req.headers.site,
            usuario: req.params.usuario
        })
            .populate(['items.produto', 'site', 'usuario'])
            .exec(function (err, data) {
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

                data.save(function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            object: 'error',
                            has_more: false,
                            data: err,
                            itemCount: 1,
                            pageCount: 1
                        });
                    }

                    var site = require(__dirname + '/../models/site')
                        .findOne({_id: req.headers.site})
                        .then(function (_site) {
                            var email = new sendgrid.Email({
                                to: _site.emails[0],
                                from: 'system@publiciti.com.br',
                                subject: ' ',
                                html: ' '
                            });

                            email.setFilters({
                                'templates': {
                                    'settings': {
                                        'enable': 1,
                                        'template_id': 'd5e54ad0-718f-4a53-8827-b1dbaeb68238',
                                    }
                                }
                            });

                            email.addSubstitution('%carrinho%', result._id);
                            email.addSubstitution('%status%', result.status);
                            email.addSubstitution('%items%', JSON.stringify(result.items));

                            sendgrid.send(email, function (err, json) {
                                if (err) {
                                    return console.error(err);
                                }
                                return json;
                            });
                        });

                    res.status(204).json({
                        object: 'object',
                        has_more: false,
                        data: result,
                        itemCount: 1,
                        pageCount: 1
                    });
                });
            });
    },

    apaga: function (req, res) {
        CarrinhoModel.remove({
            _id: req.params.id,
            site: req.headers.site,
            usuario: req.params.usuario
        }, function (err, data) {
            if (err) {
                return res.status(500).json({
                    object: 'error',
                    has_more: false,
                    data: err,
                    itemCount: 1,
                    pageCount: 1
                });
            }

            res.status(204).json({
                object: 'object',
                has_more: false,
                data: data,
                itemCount: 1,
                pageCount: 1
            });
        });
    }
};

module.exports = CarrinhoController;
