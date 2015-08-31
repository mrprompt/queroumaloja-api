'use strict';

var router          = require('express').Router();

router.post('/', function(req, res) {
    res.status(200).json({
        object      : 'object',
        has_more    : false,
        data        : [],
        itemCount   : 1,
        pageCount   : 1
    });
});

module.exports = router;
