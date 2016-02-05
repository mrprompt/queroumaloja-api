'use strict';

var paginate = require('express-paginate');

var View = function (status, data) {
    var result = {
        object   : 'object',
        has_more : false,
        itemCount: 0,
        pageCount: 0,
        data     : {
            message : '',
            status  : status
        }
    };

    if (res.error) {
        result.message      = error.message;
        result.object       = 'error';
        result.data.status  = 500;
    }

    switch (req.method.toLowerCase()) {
        case 'post':
            result.data.status  = 201;
            break;

        case 'put':
            result.data.status  = 204;
            result.itemCount    = 1;
            result.pageCount    = 1;
            break;

        case 'get':
            result.object    = 'list';
            result.has_more  = paginate.hasNextPages(req)(data.total);
            result.data      = data.docs;
            result.itemCount = data.total;
            result.pageCount = data.pages;
            break;
    }

    res.json(result);
};

module.exports = View;