'use strict';

var path = require('path');
var request = require('request');
var fs = require('fs');
var routes = require('../index').routes;

exports.index = function(req, res) {
	var dominio = req.site.dominio;
	var empresa = routes.empresa.Empresa;
	var uniforme = routes.uniforme.Uniforme;
	var livro = routes.livro.Livro;
	var conteudos = {
		site: req.site
	};

	empresa
		.findOne({
			site: req.site._id
		})
		.exec(function(err, linhas) {
			if (err) {
				console.log(err);
			} else {
				conteudos.empresa = linhas;

				uniforme
					.find({
						site: req.site._id
					})
					.exec(function(err, linhas) {
						if (err) {
							console.log(err);
						} else {
							conteudos.uniformes = linhas;

							livro
								.find({
									site: req.site._id
								})
								.exec(function(err, linhas) {
									if (err) {
										console.log(err);
									} else {
										conteudos.livros = linhas;

										res.render(dominio + '/empresa/index', {
											site: req.site,
											conteudo: JSON.stringify(conteudos)
										});
									}
								});
						}
					});
			}
		});
};