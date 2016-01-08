'use strict';

var LogoutController = {
    logout: function(req, res, done) {
        res.status(200).json({
            object      : 'object',
            has_more    : false,
            data        : [],
            itemCount   : 1,
            pageCount   : 1
        });

        done();
    }
};

module.exports = LogoutController;
