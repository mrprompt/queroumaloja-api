'use strict';

var paginate        = require('express-paginate');
var ProdutoModel    = require(__dirname + '/../models/produto');
var BuscaController = {
    busca: function (req, res, done) {
        var filter = {
            site: req.headers.site
        };

        filter["$text"] = {
            $search: req.query.busca
        };

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
            });
    }
};

module.exports = BuscaController;
