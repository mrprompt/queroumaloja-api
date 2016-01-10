'use strict';

var router          = require('express').Router();
var ProdutoModel    = require(__dirname + '/../models/produto');
var BuscaController = {
    busca: function (req, res, done) {
        var filter = {
            site: req.headers.site,
            limit: 1000,
            $text: {
                $search: req.query.busca
            }
        };

        if (req.query.tipo !== undefined) {
            filter["categoria.uri"] = req.query.tipo.toLowerCase()

            if (req.query.categoria !== undefined) {
                filter["categoria.categoria.uri"] = req.query.categoria.toLowerCase();
            }
        }

        ProdutoModel.paginate(
            filter,
            {
                page: req.query.page,
                limit: req.query.limit,
                populate: ['site'],
                sortBy: {cadastro: -1}
            },
            function(err, data) {
                if (err) {
                    res.status(500).json({
                        object      : 'error',
                        has_more    : false,
                        data        : err,
                        itemCount   : 0,
                        pageCount   : 0
                    });
                } else {
                    var items = [];

                    data.results.forEach(function(result) {
                        items.push(result.obj);
                    });

                    res.status(200).json({
                        object      : 'list',
                        has_more    : true,
                        data        : items,
                        itemCount   : data.stats.nfound,
                        pageCount   : 1
                    });
                }

                done(err, data);
            });
    }
};

module.exports = BuscaController;
