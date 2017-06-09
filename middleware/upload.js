const cloudinary = require('cloudinary');

const router = (req, res, done) => {
  if (!req.file) {
    done();

    return;
  }

  cloudinary.config(process.env.CLOUDINARY_URL);
  cloudinary.uploader.upload(`${req.file.path}`, (result) => {
    req.body.imagem = result;

    done();
  });
};

module.exports = router;
