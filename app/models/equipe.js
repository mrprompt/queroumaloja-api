'use strict';

var mongoose = require(__dirname + '/index').mongoose;
var Schema = mongoose.Schema;
var EquipeSchema = new Schema({
    nome: {
        type: String
    },
    cargo: {
        type: String
    },
    email: {
        type: String
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
}, {
    collection: 'equipe'
});

var Equipe = mongoose.model('Equipe', EquipeSchema);

exports.Equipe = Equipe;

exports.list = function(req, res) {
    Equipe
        .find({
            site: req.site._id
        })
        .exec(function(err, data) {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            }
        });
};

exports.get = function(req, res) {
    var id = req.params.id;

    Equipe
        .findOne({
            _id: id,
            site: req.site._id
        })
        .exec(function(err, data) {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            }
        });
};

exports.create = function(req, res) {
    var data = req.body;

    var dados = {
        nome: data.nome,
        cargo: data.cargo,
        email: data.email,
        imagem: data.imagem,
        site: req.site._id
    };

    var membro = new Equipe(dados);
    membro.save(function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};

exports.update = function(req, res) {
    var id = req.params.id;

    var data = req.body;

    var dados = {
        nome: data.nome,
        cargo: data.cargo,
        email: data.email,
        site: req.site._id
    };

    if (data.imagem) {
        dados.imagem = JSON.parse(data.imagem);
    }

    Equipe.update({
        _id: id
    }, dados, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;

    Equipe.remove({
        _id: id,
        site: req.site._id
    }, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};