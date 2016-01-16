'use strict';

var sendgrid    = require('sendgrid')(process.env.SENDGRID_TOKEN);
var siteModel   = require(__dirname + '/../models/site');

var mail = function avisaPorEmail(carrinho) {
    siteModel
        .findOne(
            {
                _id: carrinho.site
            }
        )
        .then(function (error, site) {
            var email = new sendgrid.Email({
                to      : 'mrprompt@gmail.com', // _site.emails[0],
                from    : 'system@publiciti.com.br',
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

            var items = '<ul>';

            if (carrinho.items.length > 0) {
                carrinho.items.forEach(function(item) {
                    items += '<li><a href="http://www.publiciti.com.br/#/product/' + item.produto + '" target="_blank">'
                          + item.produto + ' x ' + item.quantidade
                          + '</a></li>';
                });
            }

            items += '</ul>';

            email.addSubstitution("%carrinho%", carrinho._id);
            email.addSubstitution("%status%", carrinho.status);
            email.addSubstitution("%items%", items);

            sendgrid.send(email, function (err, json) {
                if (err) {
                    return console.error(err);
                }

                return json;
            });
        });
};

module.exports = mail;