'use strict';

var router       = require('express').Router();
var ProdutoModel = require(__dirname + '/../models/produto');

router.get('/', function (req, res) {
    var filter = {
        site: req.headers.site,
        limit: 1000
    };

    if (req.query.tipo !== undefined) {
        filter.tipo = req.query.tipo;

        if (req.query.categoria !== undefined) {
            filter.categoria = req.query.categoria;
        }
    };

    ProdutoModel.textSearch(
        req.query.busca,
        filter,
        function(err, data) {
            if (err) {
                return res.status(500).json({
                    object      : 'error',
                    has_more    : false,
                    data        : err,
                    itemCount   : 0,
                    pageCount   : 0
                });
            };

            var items = [];

            data.results.forEach(function(result) {
                items.push(result.obj);
            });

            return res.status(200).json({
                object      : 'list',
                has_more    : true,
                data        : items,
                itemCount   : data.stats.nfound,
                pageCount   : 1
            });
        });
});

module.exports = router;
