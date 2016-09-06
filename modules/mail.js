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
        if (carrinho.site.config.sendgrid === undefined || carrinho.status !== 'pago') {
            done();

            return;
        }

        var config = carrinho.site.config.sendgrid;

        var sender = new SendGrid(config.token);

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
                    'template_id': config.template.carrinho_adiciona
                }
            }
        });

        email.addSubstitution("%comprador%", carrinho.comprador.nome);
        email.addSubstitution("%email%", carrinho.comprador.email);
        email.addSubstitution("%carrinho%", carrinho._id);
        email.addSubstitution("%valor%", carrinho.valor);
        email.addSubstitution("%items%", carrinho.items.length);

        sender.send(email, done);
    }
};

module.exports = mail;
