'use strict';

var router            = require('express').Router();
var sm                = require('sitemap');
var ProdutoModel      = require('../../src/models/produto');
var SitemapController = {
    /**
     * Lista os produtos
     *
     * @param req
     * @param res
     * @param done
     */
    lista: function (req, res) {
        ProdutoModel
            .find(
                {
                    site    : req.headers.site,
                    ativo   : true
                },
                {
                    sort    : {
                        cadastro : 'desc'
                    }
                },
                function (err, data) {

                    var sitemap = sm.createSitemap ({
                        hostname: 'https://' + req.app.site.dominio,
                        cacheTime: 600000,  // 600 sec cache period
                        urls: [
                            { url: '/page-1/',  changefreq: 'daily', priority: 0.3 },
                            { url: '/page-2/',  changefreq: 'monthly',  priority: 0.7 },
                            { url: '/page-3/' } // changefreq: 'weekly',  priority: 0.5
                        ]
                    });

                    sitemap.toXML( function (err, xml) {
                        if (err) {
                            return res.status(500).end();
                        }
                        
                        res.header('Content-Type', 'application/xml');
                        res.send( xml );
                    });
                }
            );
    }
};

router.get('/', SitemapController.lista);

module.exports = router;