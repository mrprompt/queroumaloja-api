/**
 * Created by mrprompt on 07/06/15.
 */
'use strict';

var async     = require('async');
var Produto   = require('./../models/produto').Produto;
var Livro     = require('././livro').Livro;
var Parque    = require('././parque').Parque;
var Uniforme  = require('././uniforme').Uniforme;
var products = [];

async.parallel([
    function (callback) {
        Uniforme.find(
            {},
            {},
            {},
            function (err, row) {
                if (err) {
                    console.log(err);
                } else {
                    row.forEach(function(object) {
                        var Produto = {
                            codigo      : '00000000',
                            titulo      : object.titulo,
                            descricao   : object.descricao,
                            valor       : 0.00,
                            tipo        : 'Uniformes',
                            categoria   : 'escolares',
                            imagem      : object.imagem,
                            site        : object.site
                        };

                        products.push(Produto);
                    });

                    console.log(products);

                    callback(null, products);
                }
            }
        );
    },
    function (callback) {
        Parque.find(
            {},
            {},
            {},
            function (err, row) {
                if (err) {
                    console.log(err);
                } else {
                    row.forEach(function(object) {
                        var Produto = {
                            codigo      : '00000000',
                            titulo      : object.titulo,
                            descricao   : object.descricao,
                            valor       : 0.00,
                            tipo        : 'Parques',
                            categoria   : 'madeira',
                            imagem      : object.imagem,
                            site        : object.site
                        };

                        products.push(Produto);
                    });

                    console.log(products);

                    callback(null, products);
                }
            }
        );
    },
    function (callback) {
        Livro.find(
            {},
            {},
            {},
            function (err, row) {
                if (err) {
                    console.log(err);
                } else {
                    row.forEach(function(object) {
                        var Produto = {
                            codigo      : object.codigo,
                            titulo      : object.titulo,
                            descricao   : object.descricao,
                            valor       : 0.00,
                            tipo        : 'Livros',
                            categoria   : object.categoria,
                            imagem      : object.imagem,
                            site        : object.site
                        };

                        products.push(Produto);
                    });

                    console.log(products);

                    callback(null, products);
                }
            }
        );
    }
], function (err, results) {
    products.forEach(function(row) {
        var produto = new Produto(row);
            produto.save(function(err, data) {
                if (err) {
                    console.log('Erro cadastrando produto: ', err);
                    return false;
                }

                console.log('Produto cadastrado: ', data._id);
            });
    });
});
