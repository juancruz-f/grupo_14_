const express = require('express');
var router = express.Router();

const multer = require('multer')
const {detail, cart, add, save, edit, update, remove,admin, products} = require('../controllers/productsController')
const path = require('path')

const productAddValidator = require('../validations/productAddValidator')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: (req, file, cb) => {
        const newFilename = 'product' + Date.now() + path.extname(file.originalname)
        cb(null, newFilename)
    }

})

const upload = multer({storage : storage})

router.get('/admin',admin);
router.get('/detail/:id',detail);
router.get('/cart',cart);
router.get('/add',add);
router.post('/add', upload.single('image') ,productAddValidator,save);
router.get('/edit/:id',edit);
router.put('/edit/:id',update);
router.post('/remove/:id',remove);
router.get('/listProducts',products)


module.exports = router;
