/**
 * Tela inicial
 *
 * @author Thiago Paes
 * @package index
 * @licence GPL V3
 */
'use strict';

var path            = require('path');
var SiteModel       = require(path.join(__dirname, '/../models/site'));
var IndexController = {
    /**
     * Tela inicial
     *
     * @param req
     * @param res
     * @param done
     * @returns {*}
     */
    lista: function (req, res, done) {
        SiteModel.findOne({
                _id: req.headers.site
            })
            .exec(function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err.message,
                        itemCount: 1,
                        pageCount: 1
                    });
                } else {
                    res.status(200).json({
                        object: 'object',
                        has_more: false,
                        data: data,
                        itemCount: 1,
                        pageCount: 1
                    });
                }

                done(err, data);
            });
    }
};

module.exports = IndexController;
