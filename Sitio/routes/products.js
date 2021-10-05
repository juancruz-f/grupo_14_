const express = require('express');
var router = express.Router();
const multer = require('multer')
const path = require("path");
const productAddValidator = require('../validations/productAddValidator')
const adminUserCheck= require("../middlewares/adminUserCheck")

const {detail, add, save, edit, update, remove,admin, products} = require('../controllers/productsController')



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

/* product detail*/
router.get('/detail/:id',detail);
<<<<<<< HEAD
router.get('/cart',cart);
router.get('/add',add);
router.post('/add',productAddValidator, upload.single('avatar') ,save);
router.get('/edit/:id',edit);
router.put('/edit/:id',update);
router.post('/remove/:id',remove);
=======

/*product create*/
router.get('/add',adminUserCheck,add);
router.post('/add', upload.any(),productAddValidator,save);

/*product edit*/
router.get('/edit/:id',adminUserCheck,edit);
router.put('/edit/:id',upload.any(),adminUserCheck,update);

/*product delete*/
router.post('/remove/:id',adminUserCheck,remove);
>>>>>>> 42848ea06fa6a3c53ec1018f82838ba1453197ba
router.get('/listProducts',products)
/*carrito*/


module.exports = router;
