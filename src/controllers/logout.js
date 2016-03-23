'use strict';

var router              = require('express').Router();
var LogoutController    = {
    /**
     * Logout
     *
     * @param req
     * @param res
     * @param done
     */
    logout: function(req, res, done) {
        res.status(204).json({
            object      : 'object',
            has_more    : false,
            data        : {},
            itemCount   : 1,
            pageCount   : 1
        });

        done();
    }
};

router.delete('/', LogoutController.logout);

module.exports = router;