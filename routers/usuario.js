const router = require('express').Router();
const usuario = require('../controllers/usuario');

/**
 * @api {get} /usuario Lista usuários cadastrados
 * @apiName UsuarioLista
 * @apiGroup Usuario
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "object": "list",
 *        "has_more": true,
 *        "data": [
 *          {
 *            "_id": "543854a2436802348dfd75d6",
 *            "email": "contato@queroumaloja.com.br",
 *            "nome": "queroumaloja Papelaria",
 *            "cadastro": "2016-09-05T12:32:17.148Z"
 *          },
 *          ...
 *        ],
 *        "itemCount": "100",
 *        "pageCount": "2"
 *      }
 */
router.get('/usuario/', (req, res) => {
  const site = req.app.site._id;
  const pagina = req.query.page;
  const limite = req.query.limit;

  usuario.lista(site, pagina, limite, (err, data) => {
    if (err) {
      res.status(500).json({
        object: 'error',
        data: err.message,
        itemCount: 0,
        pageCount: 0
      });

      return;
    }

    const pageCount = data.pages;
    const itemCount = data.total;

    res.status(200).json({
      object: 'list',
      data: data.docs,
      itemCount,
      pageCount
    });
  });
});

/**
 * @api {get} /usuario/:id Visualiza um usuario
 * @apiName UsuarioAbre
 * @apiGroup Usuario
 *
 * @apiParam {String} id Site unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "object": "object",
 *        "has_more": false,
 *        "data": {
 *            "_id": "543854a2436802348dfd75d6",
 *            "email": "contato@queroumaloja.com.br",
 *            "nome": "queroumaloja Papelaria",
 *            "cadastro": "2016-09-05T12:32:17.148Z"
 *          },
 *        "itemCount": "1",
 *        "pageCount": "1"
 *      }
 */
router.get('/usuario/:id', (req, res) => {
  usuario.abre(req.params.id, req.app.site, (err, user) => {
    if (err) {
      res.status(404).json({
        object: 'error',
        data: {
          status: 404,
          message: 'Usuário não encontrado'
        },
        itemCount: 0,
        pageCount: 0
      });

      return;
    }

    res.status(200).json({
      object: 'object',
      data: user,
      itemCount: 1,
      pageCount: 1
    });
  });
});

/**
 * @api {post} /usuario Cadastra um usuário
 * @apiName UsuarioAdiciona
 * @apiGroup Usuario
 *
 * @apiParam {String} nome
 * @apiParam {String} email
 * @apiParam {String} password
 * @apiParam {string} nivel ('administrador', 'editor', 'usuario', 'comprador')
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *      {
 *        "object": "object",
 *        "has_more": false,
 *        "data": {
 *            "_id": "543854a2436802348dfd75d6",
 *            "email": "contato@queroumaloja.com.br",
 *            "nome": "queroumaloja Papelaria",
 *            "cadastro": "2016-09-05T12:32:17.148Z"
 *          },
 *        "itemCount": "1",
 *        "pageCount": "1"
 *      }
 */
router.post('/usuario/', (req, res) => {
  const site = req.app.site._id;
  const params = req.body;
  params.password = params.password_encrypted;

  delete params.password_encrypted;

  usuario.adiciona(site, params, (err, user) => {
    if (err) {
      res.status(400).json({
        object: 'error',
        data: err.message,
        itemCount: 0,
        pageCount: 0
      });

      return;
    }

    res.status(201).json({
      object: 'object',
      data: user,
      itemCount: 1,
      pageCount: 1
    });
  });
});

/**
 * @api {put} /usuario/:id Atualiza um usuário
 * @apiName UsuarioAtualiza
 * @apiGroup Usuario
 *
 * @apiParam {String} id Usuário unique id
 * @apiParam {String} nome
 * @apiParam {String} email
 * @apiParam {string} nivel ('administrador', 'editor', 'usuario', 'comprador')
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
router.put('/usuario/:id', (req, res) => {
  usuario.atualiza(req.params.id, req.app.site, req.body, (err, user) => {
    if (err) {
      res.status(400).json({
        object: 'error',
        data: err.message,
        itemCount: 0,
        pageCount: 0
      });
      return;
    }

    res.status(204).json({ user });
  });
});

/**
 * @api {delete} /usuario/:id Apaga um usuário
 * @apiName UsuarioApaga
 * @apiGroup Usuario
 *
 * @apiParam {String} id Usuário unique id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
router.delete('/usuario/:id', (req, res) => {
  usuario.apaga(req.params.id, req.app.site, (err, user) => {
    if (err) {
      res.status(400).json({
        object: 'error',
        data: err.message,
        itemCount: 0,
        pageCount: 0
      });
      return;
    }

    res.status(204).json({ user });
  });
});

module.exports = router;
