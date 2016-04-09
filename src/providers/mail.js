'use strict';

var SendGrid = require('sendgrid');
var mail     = {
    /**
     * Aviso de compra por email
     *
     * @param carrinho
     * @param done
     */
    avisoDeCompra: function (carrinho, done) {
        if (site === null || carrinho.site.config.sendgrid === undefined || carrinho.status !== 'pago') {
            return;
        }

        var sender = new SendGrid(carrinho.site.config.sendgrid.token);
        var email  = new sender.Email({
            to      : carrinho.site.emails,
            from    : carrinho.comprador.email,
            subject : ' ',
            html    : ' '
        });

        email.setFilters({
            'templates': {
                'settings': {
                    'enable': 1,
                    'template_id': carrinho.site.config.sendgrid.template.carrinho_adiciona
                }
            }
        });

        email.addSubstitution("%comprador%", carrinho.comprador.nome);
        email.addSubstitution("%email%", carrinho.comprador.email);
        email.addSubstitution("%carrinho%", carrinho._id);
        email.addSubstitution("%valor%", carrinho.valor);
        email.addSubstitution("%items%", carrinho.items.length);

        sender.send(email, function (err, json) {
            if (err) {
                return console.error(err);
            }

            if (done) {
                done(json);
            }
        });
    }
};

module.exports = mail;