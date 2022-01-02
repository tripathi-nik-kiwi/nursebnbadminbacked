const express = require('express');
const router = express.Router();
const control = require('../controller');

router.get('/product-list', control.getAllList);
module.exports = router;
