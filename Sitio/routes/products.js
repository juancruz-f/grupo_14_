const express = require('express');
const router = express.Router();
const {detail, cart, add, save, edit, update, remove} = require('../controllers/productsController')

router.get('/detail/:id',detail);
router.get('/cart',cart);
router.get('/add',add);
router.post('/add',save);
router.get('/edit/:id',edit);
router.put('/edit/:id',update);
router.delete('/remove/:id',remove);

module.exports = router;
