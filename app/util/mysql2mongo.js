/**
 * Created by mrprompt on 07/06/15.
 */
'use strict';
/*
 cloud_name = 'publiciti'
 api_key    = '957694724565246'
 api_secret = '1e6xLXWlFkvIWwq2RLooBcDZWYY'

 */
var Produto = require('./../models/produto').Produto;
var mysqlConnection = require('mysql').createConnection({
    host: '127.0.0.1',
    user: 'admineZeP56A',
    password: 'fbUduCy_JWW8',
    database: 'site'
});
var fs = require('fs');
var ini = require('ini').parse(fs.readFileSync('./config/config.ini', 'utf-8'));
var cloudinary = require('cloudinary');
var objectId = require('mongodb').ObjectID;

cloudinary.config({
    cloud_name: ini.cloudinary.cloud_name,
    api_key: ini.cloudinary.api_key,
    api_secret: ini.cloudinary.api_secret
});

var sql = '' +
    'SELECT ' +
    '       p.codigo, p.nome, p.descricao, f.img, p.valor, ' +
    '       c.nome as categoria, ' +
    '       s.nome as sub_categoria ' +
    '  FROM produto p ' +
    '  JOIN produto_foto f ON p.id_produto = f.id_produto ' +
    '  JOIN produto_categoria c ON p.id_produto_categoria = c.id_produto_categoria ' +
    '  JOIN produto_sub_categoria s ON p.id_produto_sub_categoria = s.id_produto_sub_categoria ' +
    ' WHERE p.ativo = "S" ' +
    '   AND f.img <> "" ' +
    ' ORDER BY p.id_produto ASC ';

var query = mysqlConnection.query(sql, function (query_error, rows) {
    if (query_error) {
        console.log('Error while performing Query. ', query_error);

        return false;
    }

    rows.forEach(function (row) {
        var image = {
            url: 'http://www.publiciti.com.br/_arquivos/gr_' + row.img
        }

        createProduct(row, image);
    });
});

function createProduct(product_details, image_details) {
    var dados = {
        codigo: product_details.codigo,
        titulo: product_details.nome,
        descricao: product_details.descricao,
        valor: product_details.valor,
        tipo: product_details.categoria,
        categoria: product_details.sub_categoria,
        imagem: image_details,
        site: new objectId('55743d2101fdb1d6a267a345')
    };

    var produto = new Produto(dados);
    var object  = produto.save(function (produto_error, produto_result) {
            if (produto_error) {
                console.log('Erro cadastrando produto: ' + row.nome + ' :: ' + produto_error);

                return false;
            }

            console.log('Produto cadastrado: ', produto_result._id);

            return produto_result;
        });

    return object;
}
