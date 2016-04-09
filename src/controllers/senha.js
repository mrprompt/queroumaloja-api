'use strict';

var router          = require('express').Router();
var UsuarioModel    = require('../../src/models/usuario');
var bcrypt          = require('bcrypt');
var salt            = process.env.PASSWORD_SALT;
var SenhaController = {
    /**
     * Atualiza a senha do usuário
     *
     * @param req
     * @param res
     * @param done
     */
    adiciona: function (req, res, done) {
        UsuarioModel
            .findOneAndUpdate(
                {
                    _id: req.app.usuario._id,
                    site: req.app.site._id
                },
                {
                    $set: {
                        password: (bcrypt.hashSync(req.body.password, salt))
                    }
                },
                {
                    new: true
                },
                function (err, user) {
                    if (err) {
                        console.log(err, user);

                        return res.status(500).json({
                            object: 'error',
                            has_more: false,
                            data: 'Não foi possível atualizar a senha',
                            itemCount: 0,
                            pageCount: 0
                        });
                    } else {
                        res.status(201).json({
                            object: 'object',
                            has_more: false,
                            data: user,
                            itemCount: 1,
                            pageCount: 1
                        });

                        return done(err, data);
                    }
                }
            );
    }
};

router.post('/', SenhaController.adiciona);

module.exports = router;