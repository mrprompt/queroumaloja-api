'use strict';

var connection = require('./index');
var site = require('./site');
var mongoose = connection.mongoose;
var Schema = mongoose.Schema;
var nodemailer = require('nodemailer');
var fs = require('fs');
var ini = require('ini').parse(fs.readFileSync('config/config.ini', 'utf-8'));
var transporter = nodemailer.createTransport({
    service: ini.mail.service,
    auth: {
        user: ini.mail.auth,
        pass: ini.mail.pass
    }
});
var ContatoSchema = new Schema({
    nome: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    telefone: {
        type: String,
        default: ''
    },
    mensagem: {
        type: String,
        default: ''
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

var Contato = mongoose.model('Contato', ContatoSchema);

exports.Contato = Contato;

exports.list = function(req, res) {
    Contato
        .find({
            site: req.site._id
        })
        .exec(function(err, contato) {
            if (err) {
                console.log(err);
            } else {
                res.json(contato);
            }
        });
};

exports.get = function(req, res) {
    var id = req.params.id;

    Contato
        .findOne({
            _id: id,
            site: req.site._id
        })
        .exec(function(err, contato) {
            if (err) {
                console.log(err);
            } else {
                res.json(contato);
            }
        });
};

exports.create = function(req, res) {
    var data = req.body;

    var dados = {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        mensagem: data.mensagem,
        cadastro: data.cadastro,
        site: req.site._id
    };

    var mensagem = '' +
        'Nome: ' + dados.nome + '\n' +
        'E-mail: ' + dados.email + '\n' +
        'Telefone: ' + dados.telefone + '\n' +
        'Mensagem: ' + dados.mensagem;

    transporter.sendMail({
        from: dados.nome,
        replyTo: dados.email,
        to: req.site.emails.toString(),
        subject: 'Contato do Site por ' + dados.nome,
        text: mensagem
    });

    var contato = new Contato(dados);
    contato.save(function(err, data) {
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

    Contato.update({
        _id: id,
        site: req.site._id
    }, data, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;

    Contato.remove({
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