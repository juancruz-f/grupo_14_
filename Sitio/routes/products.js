const express = require('express');
const router = express.Router();
const {detail, cart, add} = require('../controllers/productsController')

router.get('/detail/:id',detail);
router.get('/cart',cart);
router.get('/add',add)

module.exports = router;
