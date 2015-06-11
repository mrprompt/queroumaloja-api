/**
 * Created by mrprompt on 07/06/15.
 */
'use strict';

var Produto = require(__dirname + '/../models/produto').Produto;
var fs = require('fs');
var ini = require('ini').parse(fs.readFileSync(__dirname + '/../config/config.ini', 'utf-8'));
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: ini.cloudinary.cloud_name,
    api_key: ini.cloudinary.api_key,
    api_secret: ini.cloudinary.api_secret
});

cloudinary.api.delete_resources_by_tag('publiciti.com.br', function(result) {
    console.log(result);
});
