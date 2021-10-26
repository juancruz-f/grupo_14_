const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {register,login, contact, processRegister,processLogin, logout, profile, updateProfile} = require('../controllers/usersController');
const loginValidator =require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');
const profileValidator = require("../validations/profileValidator");
const usersCheck = require("../middlewares/usersCheck");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/avatar'))
    },
    filename: (req, file, cb) => {
        const newFilename = 'image' + Date.now() + path.extname(file.originalname)
        cb(null, newFilename)
    }

})
const upload = multer({storage : storage});



/* GET users listing. */
router.get('/login',login);
router.post('/login', loginValidator, processLogin);

router.get('/register',register);
router.post('/register', upload.single('image'), registerValidator, processRegister);

router.get('/profile/:id',profile);
router.post('/profile/:id',upload.single("image"),profileValidator,updateProfile);

router.get('/contact', contact)

router.get('/logout',logout);


module.exports = router;
