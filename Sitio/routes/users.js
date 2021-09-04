var express = require('express');
var router = express.Router();
const multer = require('multer')
const path = require('path');
const fs = require('fs');



const {register,login, contact, processRegister,processLogin, logout, profile, profileEdit} = require('../controllers/usersController');
const loginValidator =require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');
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
router.post('/register', registerValidator,upload.single('image'), processRegister);
router.get('/contact', contact)
router.get('/logout',logout);
router.get('/userProfile', profile)
router.put('/userProfileEdit', profileEdit);


/* router.put('/userProfileEdit', profileEdit) */


module.exports = router;
