'use strict';

var TokenModel       = require('../models/token');
var LogoutController = function() {};

/**
 * Logout
 *
 * @param req
 * @param res
 * @param done
 */
LogoutController.prototype.logout = function(req, res, done) {
    TokenModel
        .remove(
            {
                usuario: req.app.usuario._id
            },
            function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err.message,
                        itemCount: 1,
                        pageCount: 1
                    });
                } else {
                    res.status(204).json({
                        object: 'object',
                        has_more: false,
                        data: data,
                        itemCount: 1,
                        pageCount: 1
                    });
                }

                done(err, data);
            }
        );
};

module.exports = new LogoutController;
