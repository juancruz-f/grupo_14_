const express = require('express');
var router = express.Router();
const multer = require('multer')
const path = require("path");
const productAddValidator = require('../validations/productAddValidator')
const adminUserCheck= require("../middlewares/adminUserCheck")

const {detail, add, save, edit, update, remove, admin, list} = require('../controllers/productsControllerDb')



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

/*product create*/
router.get('/add',adminUserCheck,add);
router.post('/add', upload.any(),productAddValidator,save);

/*product edit*/
router.get('/edit/:id',adminUserCheck,edit);
router.put('/edit/:id',upload.array('image'),adminUserCheck,update);

/*product delete*/
router.post('/remove/:id',adminUserCheck,remove);
router.get('/listProducts',list) 
/*carrito*/


module.exports = router;
