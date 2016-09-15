'use strict';

var cloudinary  = require('cloudinary');

var router = function(req, res, done) {
    if (!req.file) {
        done();

        return;
    }

    cloudinary.config(process.env.CLOUDINARY_URL);
    cloudinary.uploader.upload(req.file.path + '', function(result) {
        req.body.imagem = result;

        done();
    });
};

module.exports = router;