'use strict';

var cloudinary  = require('cloudinary');

var router = function(req, res, done) {
    var site = req.app.site;

    if (site === undefined || site.config.cloudinary === undefined) {
        done();

        return;
    }

    if (!req.file) {
        done();

        return;
    }

    var config = req.app.site.config.cloudinary;

    cloudinary.config({
        cloud_name  : config.cloud_name,
        api_key     : config.api_key,
        api_secret  : config.api_secret
    });

    cloudinary.uploader.upload(req.file.path + '', function(result) {
        req.body.imagem = result;

        done();
    });
};

module.exports = router;