/**
 * Created by mrprompt on 07/06/15.
 */
'use strict';
var fs = require('fs');
var ini = require('ini').parse(fs.readFileSync(__dirname + '/../config/config.ini', 'utf-8'));
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: ini.cloudinary.cloud_name,
    api_key: ini.cloudinary.api_key,
    api_secret: ini.cloudinary.api_secret
});
var Produto = require(__dirname + '/../models/produto').Produto;

Produto.find(
    {
        site: '55743d2101fdb1d6a267a345'
    },
    {},
    {},
    function (err, produtos) {
        if (err) {
            console.log(produtos);
        } else {
            console.log('Produtos encontrados: ', produtos.length);

            var contador = 1;
            var naoprocessados = 0;

            produtos.forEach(function (object) {
                //console.log('Envio #' + contador + ' :: ', object.imagem.url);

                if (/^(http:\/\/www\.publiciti\.com\.br\/).+$/i.exec(object.imagem.url)) {
                    console.log('Não processado: #' + naoprocessados  + ' :: ', object.imagem.url);
                    naoprocessados++;

                    /*
                    cloudinary.uploader.upload(
                        object.imagem.url,
                        function (cloudinary_response) {
                            if (cloudinary_response.url) {
                                var dados = {
                                    codigo: object.codigo,
                                    titulo: object.nome,
                                    descricao: object.descricao,
                                    valor: object.valor,
                                    tipo: object.categoria,
                                    categoria: object.sub_categoria,
                                    imagem: cloudinary_response,
                                    site: object.site
                                };


                                Produto.update({ _id: object._id }, dados, function(update_error, update_response) {
                                    if (update_error) {
                                        console.log('Erro atualiando produto: ' + object.titulo + ' :: ', update_error);
                                    } else {
                                        console.log('Produto atualizado: ' + object.titulo + ' :: ', update_response);
                                    }
                                });
                            }
                        },
                        {
                            tags: 'publiciti.com.br'
                        }
                    );
                    */

                }

                contador++;
            });
        }
    }
);