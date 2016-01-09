'use strict';

var sendgrid = require('sendgrid')(process.env.SENDGRID_TOKEN);

var mail = function avisaPorEmail(siteId) {
    var site = require(__dirname + '/../models/site');

    site
        .findOne(
            {
                _id: siteId
            }
        )
        .then(function (_site) {
            var email = new sendgrid.Email({
                to: _site.emails[0],
                from: 'system@publiciti.com.br',
                subject: ' ',
                html: ' '
            });

            email.setFilters({
                'templates': {
                    'settings': {
                        'enable': 1,
                        'template_id': 'd5e54ad0-718f-4a53-8827-b1dbaeb68238'
                    }
                }
            });

            email.addSubstitution('%carrinho%', resultSave._id);
            email.addSubstitution('%status%', resultSave.status);
            email.addSubstitution('%items%', JSON.stringify(resultSave.items));

            sendgrid.send(email, function (err, json) {
                if (err) {
                    return console.error(err);
                }

                return json;
            });
        });
};

module.exports = mail;