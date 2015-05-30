'use strict';

var path = require('path');
var request = require('request');
var fs = require('fs');
var routes = require('../index').routes;

exports.index = function (req, res) {
    var dominio = req.site.dominio;
    var conteudos = {
        site: req.site
    };

    res.render(dominio + '/empresa/index', conteudos);
};