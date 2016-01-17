/**
 * E-mail
 *
 * @author Thiago Paes
 * @package email
 * @licence GPL V3
 */
'use strict';

var sendgrid    = require('sendgrid')(process.env.SENDGRID_TOKEN);
var siteModel   = require(__dirname + '/../models/site');

var mail = {
    /**
     * Aviso de compra por email
     *
     * @param carrinho
     */
    avisoDeCompra: function (carrinho) {
        siteModel
            .findOne(
                {
                    _id: carrinho.site
                }
            )
            .then(function (site) {
                if (site === null || site.config[0].sendgrid == undefined) {
                    return;
                }

                var email = new sendgrid.Email({
                    to      : site.emails[0],
                    from    : site.emails[0],
                    subject : ' ',
                    html    : ' '
                });

                email.setFilters({
                    'templates': {
                        'settings': {
                            'enable': 1,
                            'template_id': site.config[0].sendgrid.templates.compra
                        }
                    }
                });

                var items = '';

                if (carrinho.items.length > 0) {
                    carrinho.items.forEach(function (item) {
                        items += '<li><a href="http://' + site.dominio + '/#/product/' + item.produto + '" target="_blank">'
                            + item.produto
                            + '</a> x ' + item.quantidade + '</li>';
                    });
                }

                email.addSubstitution("%carrinho%", carrinho._id);
                email.addSubstitution("%status%", carrinho.status);
                email.addSubstitution("%items%", '<ul>' + items + '</ul>');

                sendgrid.send(email, function (err, json) {
                    if (err) {
                        return console.error(err);
                    }

                    return json;
                });
            });
    }
};

module.exports = mail;