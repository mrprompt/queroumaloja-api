const cloudinary = require('cloudinary');

const router = (req, res, done) => {
  if (!req.file) {
    done();

    return;
  }

  cloudinary.config({
    api_key: req.app.site.config.cloudinary.api_key,
    api_secret: req.app.site.config.cloudinary.api_secret,
    cloud_name: req.app.site.config.cloudinary.cloud_name
  });

  cloudinary.uploader.upload(`${req.file.path}`, (result) => {
    req.body.imagem = result;

    done();
  });
};

module.exports = router;
