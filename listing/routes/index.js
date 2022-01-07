const express = require('express');
const router = express.Router();
const control = require('../controller');

router.get('/product-list', control.getAllList);
router.patch('/update-prop-status/:id', control.updateStatus);
module.exports = router;
