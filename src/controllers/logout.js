/**
 * Logout
 *
 * @author Thiago Paes
 * @package logout
 * @licence GPL V3
 */
'use strict';

var LogoutController = {
    /**
     * Logout
     *
     * @param req
     * @param res
     * @param done
     */
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
