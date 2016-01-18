/**
 * Upload Module
 *
 * @author Thiago Paes
 * @package modules
 * @licence GPL V3
 */
'use strict';

var cloudinary = require('cloudinary');
var router = require('express').Router();

router.all('*', function(req, res, done) {
    if (req.method === 'OPTIONS') {
        next();

        return true;
    }

    var config = req.app.site.config[0].cloudinary;

    cloudinary.config({
        cloud_name  : config.cloud_name,
        api_key     : config.api_key,
        api_secret  : config.api_secret
    });

    cloudinary.uploader.upload(req.file.path + '', function(result) {
        req.body.imagem = result;

        done();
    });
});

module.exports = router;