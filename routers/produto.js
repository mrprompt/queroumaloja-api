const router = require('express').Router();
const multer = require('multer');
const upload = require('../middleware/upload');
const slugify = require('slugify');
const striptags = require('striptags');
const ProdutoController = require('../controllers/produto');

/**
 * @api {get} /produto Lista os produtos cadastrados
 * @apiName ProdutoLista
 * @apiGroup Produto
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "object": "list",
 *        "has_more": true,
 *        "data": [
 *          {
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
 *              "url": "http://res.cloudinary.com/queroumalojati-papelaria/image/upload/v1466088376/p47d42m0ebagghhzdptt.jpg",
 *              "secure_url": "https://res.cloudinary.com/queroumalojati-papelaria/image/upload/v1466088376/p47d42m0ebagghhzdptt.jpg",
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
 *          },
 *          ...
 *        ],
 *        "itemCount": "100",
 *        "pageCount": "2"
 *      }
 */
router.get('/produto/', (req, res) => {
  const filter = {
    page: req.query.page,
    limit: req.query.limit
  };

  if (req.query.tipo !== undefined) {
    filter.tipo = req.query.tipo.toLowerCase();

    if (req.query.categoria !== undefined) {
      filter.categoria = req.query.categoria.toLowerCase();
    }
  }

  ProdutoController.lista(req.app.site._id, filter, (err, data) => {
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
 * @api {get} /produto/:id Abre um produto para visualização
 * @apiName ProdutoAbre
 * @apiGroup Produto
 *
 * @apiParam {String} id Produto unique ID
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
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
 *              "url": "http://res.cloudinary.com/queroumalojati-papelaria/image/upload/v1466088376/p47d42m0ebagghhzdptt.jpg",
 *              "secure_url": "https://res.cloudinary.com/queroumalojati-papelaria/image/upload/v1466088376/p47d42m0ebagghhzdptt.jpg",
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
router.get('/produto/:id', (req, res) => {
  const id = req.params.id;
  const site = req.app.site._id;

  ProdutoController.abre(id, site, (err, data) => {
    if (err) {
      res.status(404).json({
        object: 'error',
        data: err.message,
        itemCount: 0,
        pageCount: 0
      });

      return;
    }

    res.status(200).json({
      object: 'object',
      data,
      itemCount: 1,
      pageCount: 1
    });
  });
});

/**
 * @api {post} /produto Cadastra um produto
 * @apiName ProdutoAdiciona
 * @apiGroup Produto
 *
 * @apiParam {String} codigo Código interno do produto.
 * @apiParam {String} titulo Título do produto.
 * @apiParam {String} descricao Descrição do produto.
 * @apiParam {Object} valor Valor do produto {valor: number, nome: string, moeda: string} .
 * @apiParam {Object} categoria Categoria {titulo: string, uri: string, categoria: { titulo: string, uri: string}}.
 * @apiParam {Boolean} ativo Produto (in)ativo.
 * @apiParam {Object} imagem Imagem de representação do produto {url: string, secure_url: string}
 * @apiParam {Object} album Álbum de imagens, array de {imagem}
 * @apiParam {Object} dimesoes Dimensões do produto {altura, largura, comprimento, unidade}
 * @apiParam {Number} vendas Número de vendas do produto.
 * @apiParam {Number} quantidade Quantidade de ítens em estoque.
 * @apiParam {Object} peso Peso do produto {total, unidade}.
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
 *              "url": "http://res.cloudinary.com/queroumalojati-papelaria/image/upload/v1466088376/p47d42m0ebagghhzdptt.jpg",
 *              "secure_url": "https://res.cloudinary.com/queroumalojati-papelaria/image/upload/v1466088376/p47d42m0ebagghhzdptt.jpg",
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
router.post('/produto/', multer({ dest: '/tmp/' }).single('imagem'), upload, (req, res) => {
  const site = req.app.site._id;
  const params = {
    titulo: striptags(req.body.titulo),
    descricao: striptags(req.body.descricao),
    codigo: striptags(req.body.codigo),
    valor: striptags(req.body.valor),
    imagem: striptags(req.body.imagem),
    categoria: {
      titulo: striptags(req.body.categoria.titulo),
      uri: slugify(striptags(req.body.categoria.titulo.toLowerCase())),
      categoria: {
        titulo: striptags(req.body.categoria.categoria.titulo),
        uri: slugify(striptags(req.body.categoria.categoria.titulo.toLowerCase()))
      }
    },
    estoque: striptags(req.body.estoque),
    dimensoes: striptags(req.body.dimensoes),
    peso: striptags(req.body.peso),
    site: req.app.site._id
  };

  ProdutoController.adiciona(site, params, (err, data) => {
    if (err || !data) {
      res.status(500).json({
        object: 'error',
        data: err.message,
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
 * @api {put} /produto/:id Atualiza os dados de um produto
 * @apiName ProdutoAtualiza
 * @apiGroup Produto
 *
 * @apiParam {String} id Produto unique ID.
 * @apiParam {String} codigo Código interno do produto.
 * @apiParam {String} titulo Título do produto.
 * @apiParam {String} descricao Descrição do produto.
 * @apiParam {Object} valor Valor do produto {valor: number, nome: string, moeda: string} .
 * @apiParam {Object} categoria Categoria {titulo: string, uri: string, categoria: { titulo: string, uri: string}}.
 * @apiParam {Boolean} ativo Produto (in)ativo.
 * @apiParam {Object} imagem Imagem de representação do produto {url: string, secure_url: string}
 * @apiParam {Object} album Álbum de imagens, array de {imagem}
 * @apiParam {Object} dimesoes Dimensões do produto {altura, largura, comprimento, unidade}
 * @apiParam {Number} vendas Número de vendas do produto.
 * @apiParam {Number} quantidade Quantidade de ítens em estoque.
 * @apiParam {Object} peso Peso do produto {total, unidade}.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
router.put('/produto/:id', (req, res) => {
  const id = req.params.id;
  const site = req.app.site._id;
  const params = {
    titulo: striptags(req.body.titulo),
    descricao: striptags(req.body.descricao),
    codigo: striptags(req.body.codigo),
    valor: striptags(req.body.valor),
    imagem: striptags(req.body.imagem),
    categoria: {
      titulo: striptags(req.body.categoria.titulo),
      uri: slugify(striptags(req.body.categoria.titulo.toLowerCase())),
      categoria: {
        titulo: striptags(req.body.categoria.categoria.titulo),
        uri: slugify(striptags(req.body.categoria.categoria.titulo.toLowerCase()))
      }
    },
    estoque: striptags(req.body.estoque),
    dimensoes: striptags(req.body.dimensoes),
    peso: striptags(req.body.peso),
    site: req.app.site._id
  };

  ProdutoController.atualiza(id, site, params, (err, data) => {
    if (err) {
      res.status(500).json({
        object: 'error',
        data: err.message,
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
 * @api {delete} /produto/:id Apagar produto
 * @apiName ProdutoApaga
 * @apiGroup Produto
 *
 * @apiParam {String} id Produto unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 OK
 */
router.delete('/produto/:id', (req, res) => {
  const id = req.params.id;
  const site = req.app.site._id;

  ProdutoController.apaga(id, site, (err, data) => {
    if (err) {
      res.status(500).json({
        object: 'error',
        data: err.message,
        itemCount: 0,
        pageCount: 0
      });

      return;
    }

    res.status(204).json({ data });
  });
});

module.exports = router;
