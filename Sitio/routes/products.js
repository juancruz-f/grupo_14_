const express = require('express');
var router = express.Router();
const {detail, cart, add, save, edit, update, remove,admin} = require('../controllers/productsController')

router.get('/admin',admin);
router.get('/detail/:id',detail);
router.get('/cart',cart);
router.get('/add',add);
router.post('/add',save);
router.get('/edit/:id',edit);
router.put('/edit/:id',update);
router.post('/remove/:id',remove);

module.exports = router;
