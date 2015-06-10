'use strict';

var async = require('async');
var routes = require('../index').routes;
var conteudos = {};
var LIMITE = 4;

exports.index = function(req, res) {
	var dominio = req.site.dominio;
	var conteudos = {
		site: req.site
	};

	conteudos.site = req.site;

	async.parallel([
			function (callback) {
				routes.produto.Produto.findRandom({
						site: req.site._id,
						tipo: 'Uniformes'
					},
					{},
					{
						limit: LIMITE
					},
					function (err, linhas) {
						if (err) {
							console.log(err);
						} else {
							conteudos.parceiros = linhas;

							callback(null, linhas);
						}
					}
				);
			},
			function (callback) {
				routes.produto.Produto.findRandom({
						site: req.site._id,
						tipo: 'Livros'
					},
					{},
					{
						limit: LIMITE
					},
					function (err, linhas) {
						if (err) {
							console.log(err);
						} else {
							conteudos.livros = linhas;

							callback(null, linhas);
						}
					}
				);
			}
		],
		function (err, results) {
			if (err) {
				console.log(err);

				return res.send(400);
			}

			if (results == null || results[0] == null) {
				return res.send(400);
			}

			return res.render(dominio + '/livros/index', {
				site: req.site,
				conteudo: JSON.stringify(conteudos)
			});
		});
};