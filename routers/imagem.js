const router = require('express').Router();
const multer = require('multer');
const upload = require('../middleware/upload');
const ImagemController = require('../controllers/imagem');

/**
 * @api {post} /imagem/:id/album Adiciona uma imagem ao álbum do produto
 * @apiName ProdutoAlbumAdiciona
 * @apiGroup Produto
 *
 * @apiParam {String} id Produto unique ID.
 * @apiParam {Object} imagem Imagem do produto {url: string, secure_url: string}
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *      {
 *        "object": "object",
 *        "has_more": false,
 *        "data": {
 *            "_id": "5762bbb9b3081d1900b0acbe",
 *            "titulo": "A TRIBO, A ALDEIA E O SONO",
 *            "descricao": "A TRIBO, A ALDEIA E O SONO",
 *            "imagem": {
 *              "public_id": "p47d42m0ebagghhzdptt",
 *              "version": "1466088376",
 *              "signature": "05a243d289f44d8aa27851fa6a49c8476785ce8b",
 *              "width": "1810",
 *              "height": "2551",
 *              "format": "jpg",
 *              "resource_type": "image",
 *              "bytes": "2249274",
 *              "type": "upload",
 *              "etag": "d796793e655a4f4dd254ea2c6e317cb7",
 *              "url": "http://res.cloudinary.com/queroumaloja...466088376/p47d42m0ebagghhzdptt.jpg",
 *              "secure_url": "https://res.cloudinary.com/quer...376/p47d42m0ebagghhzdptt.jpg",
 *              "_id": "5762bbb9b3081d1900b0acc3",
 *              "tags": [
 *              ],
 *              "created_at": "2016-06-16T14:46:16.000Z"
 *            },
 *            "categoria": {
 *              "titulo": "Livros",
 *              "uri": "livros",
 *              "categoria": {
 *                "titulo": "Livros e Coleções",
 *                "uri": "livros-e-colecoes",
 *                "_id": "5762bbb9b3081d1900b0acc2"
 *              },
 *              "_id": "5762bbb9b3081d1900b0acc1"
 *            },
 *            "dimensoes": {
 *              "altura": "0.01",
 *              "largura": "0.01",
 *              "comprimento": "0.01",
 *              "unidade": "cm",
 *              "_id": "5762bbb9b3081d1900b0acc0"
 *            },
 *            "peso": {
 *              "total": "0.001",
 *              "unidade": "gr",
 *              "_id": "5762bbb9b3081d1900b0acbf"
 *            },
 *            "__v": "0",
 *            "atualizacao": "2016-06-16T14:46:17.319Z",
 *            "cadastro": "2016-06-16T14:46:17.319Z",
 *            "quantidade": "0",
 *            "vendas": "0",
 *            "album": [
 *            ],
 *            "valor": [
 *              {
 *                "_id": "5762bbb9b3081d1900b0acc4",
 *                "moeda": "R$",
 *                "nome": "default",
 *                "valor": "23.9"
 *              }
 *            ],
 *            "codigo": "VL"
 *        },
 *        "itemCount": "1",
 *        "pageCount": "1"
 *      }
 */
router.post('/imagem/:id/album', multer({ dest: '/tmp/' }).single('imagem'), upload, (req, res) => {
  const produto = req.params.id;
  const site = req.app.site._id;
  const params = req.body.imagem;

  ImagemController.adiciona(produto, site, params, (err, data) => {
    if (err) {
      res.status(500).json({
        object: 'error',
        data: err,
        itemCount: 0,
        pageCount: 0
      });

      return;
    }

    res.status(201).json({
      object: 'object',
      data,
      itemCount: 1,
      pageCount: 1
    });
  });
});

/**
 * @api {delete} /imagem/:id/album/:img Apaga uma imagem do álbum do produto
 * @apiName ProdutoAlbumApagaImagem
 * @apiGroup Produto
 *
 * @apiParam {String} id Produto unique ID.
 * @apiParam {String} img Produto Imagem unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
router.delete('/imagem/:id/album/:img', (req, res) => {
  const produto = req.params.id;
  const site = req.app.site._id;
  const imagem = req.params.img;

  ImagemController.apaga(produto, site, imagem, (err, data) => {
    if (err) {
      res.status(500).json({
        object: 'error',
        data: err,
        itemCount: 0,
        pageCount: 0
      });

      return;
    }

    res.status(204).json({ data });
  });
});

module.exports = router;
