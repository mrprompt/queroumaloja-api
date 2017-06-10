const router = require('express').Router();
const login = require('../controllers/login');

/**
 * @api {post} /login Autentica na API
 * @apiName LoginAdiciona
 * @apiGroup Login
 *
 * @apiParam {String} email Email de acesso.
 * @apiParam {String} password Senha de acesso.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *        {
 *          "object": "object",
 *          "has_more": false,
 *          "data": {
 *            "usuario": {
 *              "_id": "543854a2...",
 *              "email": "foo@bar.bar",
 *              "localidade": {
 *                "cidade": "Florianópolis",
 *                "estado": "Santa Catarina",
 *                "uf": "SC"
 *              },
 *              "nome": "Foo Bar Bar",
 *              "cadastro": "2016-09-05T11:27:46.383Z",
 *              "nivel": "comprador",
 *              "endereco": [
 *               ...
 *              ]
 *            },
 *            "token": {
 *              "__v": "0",
 *              "usuario": "513854b242...",
 *              "_id": "57dc59b26351...",
 *              "validade": "2016-09-12T11:27:46.387Z",
 *              "cadastro": "2016-09-05T11:27:46.387Z",
 *              "conteudo": "2H6alaOc4Ti39HKZij9pj...."
 *            },
 *            "site": {
 *              "_id": "55743d210...",
 *              "dominio": "publiciti.com.br",
 *              "nome": "Publiciti",
 *              ...
 *            }
 *          },
 *          "itemCount": "1",
 *          "pageCount": "1"
 *        }
 */
router.post('/login/', (req, res) => {
  const { email, password_encrypted } = req.body;
  const site = req.app.site._id;

  login.adiciona(email, password_encrypted, site, (err, result) => {
    if (err || !result) {
      res.status(404).json({
        object: 'error',
        data: err.message,
        itemCount: 0,
        pageCount: 1
      });

      return;
    }

    res.status(201).json({
      object: 'object',
      data: result,
      itemCount: 1,
      pageCount: 1
    });
  });
});

module.exports = router;
