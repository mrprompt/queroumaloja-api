const bcrypt = require('bcryptjs');

const salt = process.env.PASSWORD_SALT || '$2a$10$MeVpoT66x6r2eNFZ8diZDe';

const router = (req, res, done) => {
  if ('password' in req.body === false) {
    done();

    return;
  }

  const password = bcrypt.hashSync(req.body.password, salt);

  req.body.password_encrypted = password;

  done();
};

module.exports = router;
