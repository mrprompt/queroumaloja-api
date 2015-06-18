'use strict';

var pagination  = require('mongoose-paginate');
var mongoose = require(__dirname + '/index').mongoose;
var Schema = mongoose.Schema;
var SlideSchema = new Schema({
    titulo: {
        type: String,
        default: ''
    },
    descricao: {
        type: String,
        default: ''
    },
    endereco: {
        type: String,
        default: ''
    },
    imagem: {
        type: Object
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    }
});

SlideSchema.plugin(pagination);

var Slide = mongoose.model('Slide', SlideSchema);

exports.list = function(req, res, callback) {
    Slide
        .find({
            site: req.headers.authentication
        })
        .sort({
            cadastro: -1
        })
        .exec(function(err, data) {
            callback(err, data);
        });
};

exports.get = function(req, res, callback) {
    var id = req.params.id;

    Slide
        .findOne({
            _id: id,
            site: req.headers.authentication
        })
        .exec(function(err, data) {
            callback(err, data);
        });
};

exports.create = function(req, res, callback) {
    var data = req.body;

    var dados = {
        titulo: data.titulo,
        descricao: data.descricao,
        endereco: data.endereco,
        imagem: JSON.parse(data.imagem),
        cadastro: data.cadastro,
        site: req.headers.authentication
    };

    var slide = new Slide(dados);
        slide.save(function(err, data) {
            callback(err, data);
        });
};

exports.update = function(req, res, callback) {
    var id = req.params.id;
    var data = req.body;

    var dados = {
        titulo: data.titulo,
        descricao: data.descricao,
        endereco: data.endereco
    }

    if (data.imagem) {
        dados.imagem = JSON.parse(data.imagem);
    }

    Slide.update({
        _id: id,
        site: req.headers.authentication
    }, dados, function(err, data) {
        callback(err, data);
    });
};

exports.delete = function(req, res, callback) {
    var id = req.params.id;

    Slide.remove({
        _id: id,
        site: req.headers.authentication
    }, function(err, data) {
        callback(err, data);
    });
};