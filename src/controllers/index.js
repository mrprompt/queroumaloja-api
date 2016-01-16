'use strict';

var IndexController = {
    lista: function (req, res, done) {
        res
            .status(200)
            .json({
                object: 'string',
                has_more: false,
                data: 'Olá :)',
                itemCount: 1,
                pageCount: 1
            });

        return done;
    }
};

module.exports = IndexController;
