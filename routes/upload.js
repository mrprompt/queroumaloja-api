'use strict';

var fs = require('fs');
var ini = require('ini').parse(fs.readFileSync('config/config.ini', 'utf-8'));
var cloudinary = require('cloudinary').v2;

exports.index = function(req, res, next) {
    var file = req.files.file;
    var dominio = req.site.dominio;

    cloudinary.config({
        cloud_name: ini.cloudinary.cloud_name,
        api_key: ini.cloudinary.api_key,
        api_secret: ini.cloudinary.api_secret
    });

    cloudinary.uploader.upload(file.path, {
        tags: dominio
    }, function(err, image) {
        if (err) {
            console.warn(err);

            return res.json(err);
        }

        fs.unlink(file.path, function(err) {
            if (err) {
                console.warn(err);
            }
        });

        return res.json(image);
    });
};
