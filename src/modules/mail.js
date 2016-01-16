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
                if (site === null) {
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
                            'template_id': 'd5e54ad0-718f-4a53-8827-b1dbaeb68238'
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