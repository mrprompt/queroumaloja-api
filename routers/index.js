const router = require('express').Router();

/**
 * @api {get} / Rota inicial
 * @apiName IndexLista
 * @apiGroup Index
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *         "object":"object",
 *         "has_more":false,
 *         "data":{
 *            "name":"QueroUmaLoja API",
 *            "last_update":"2016-09-05T06:45:45.995Z"
 *         },
 *         "itemCount":1,
 *         "pageCount":1
 *      }
 */
router.get('/', (req, res) => {
  const data = {
    name: `${req.app.site.nome} API`,
    last_update: new Date()
  };

  res.status(200).json({
    object: 'object',
    data,
    itemCount: 1,
    pageCount: 1
  });
});

/* GET home page. */
router.get('/_ah/health', (req, res) => {
  res.send('OK');
});

module.exports = router;
