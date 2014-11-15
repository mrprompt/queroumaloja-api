'use strict';

var path = require('path');
var request = require('request');
var fs = require('fs');
var routes = require('../index').routes;

exports.index = function(req, res) {
	var dominio = req.site.dominio;
	var livro = routes.livro.Livro;
	var uniforme = routes.uniforme.Uniforme;
	var conteudos = {
		site: req.site
	};

	livro
		.find({
			site: req.site._id
		})
		.exec(function(err, linhas) {
			if (err) {
				console.log(err);
			} else {
				conteudos.livros = linhas;

				uniforme
					.find({
						site: req.site._id
					})
					.exec(function(err, linhas) {
						if (err) {
							console.log(err);
						} else {
							conteudos.uniformes = linhas;

							res.render(dominio + '/uniformes/index', {
								site: req.site,
								conteudo: JSON.stringify(conteudos)
							});
						}
					});
			}
		});
};