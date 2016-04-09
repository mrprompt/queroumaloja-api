'use strict';

var router           = require('express').Router();
var TokenModel       = require('../../src/models/token');
var LogoutController = {
    /**
     * Logout
     *
     * @param req
     * @param res
     * @param done
     */
    logout: function(req, res, done) {
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
    }
};

router.delete('/', LogoutController.logout);

module.exports = router;