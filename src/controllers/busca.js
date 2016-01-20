/**
 * Busca de Produtos
 *
 * @author Thiago Paes
 * @package busca
 * @licence GPL V3
 */
'use strict';

var paginate        = require('express-paginate');
var ProdutoModel    = require(__dirname + '/../models/produto');
var BuscaController = {
    /**
     * Buscar por um produto
     *
     * @param req
     * @param res
     * @param done
     */
    busca: function (req, res, done) {
        var filter = {
            site: req.headers.site
        };

        if (req.query.busca !== undefined) {
            filter["$text"] = {
                $search: req.query.busca
            };
        }

        ProdutoModel.paginate(
            filter,
            {
                page: req.query.page,
                limit: req.query.limit,
                sort: {cadastro : 'desc'}
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
