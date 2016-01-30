/**
 * E-mail
 *
 * @author Thiago Paes
 * @package email
 * @licence GPL V3
 */
'use strict';

var mail    = {
    /**
     * Aviso de compra por email
     *
     * @param carrinho
     * @param site
     * @param done
     */
    avisoDeCompra: function (carrinho, site, done) {
        if (site === null || site.config[0].sendgrid === undefined || !_.contains(['pago', 'autorizado'], carrinho.status)) {
            return;
        }

        var sendgrid = require('sendgrid')(site.config[0].sendgrid.token);
        var email    = new sendgrid.Email({
            to      : site.emails[0],
            from    : carrinho.comprador.email,
            subject : ' ',
            html    : ' '
        });

        email.setFilters({
            'templates': {
                'settings': {
                    'enable': 1,
                    'template_id': site.config[0].sendgrid.template.carrinho_adiciona
                }
            }
        });

        email.addSubstitution("%comprador%", carrinho.comprador.nome);
        email.addSubstitution("%email%", carrinho.comprador.email);
        email.addSubstitution("%carrinho%", carrinho._id);
        email.addSubstitution("%valor%", carrinho.valor);
        email.addSubstitution("%items%", carrinho.items.length);

        sendgrid.send(email, function (err, json) {
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