const express = require('express');
const router = express.Router();
const {register,login, contact, processRegister,processLogin, logout, profile, profileEdit} = require('../controllers/usersController');
const multer = require('multer');
const path = require('path');


const loginValidator =require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');

const fs = require('fs');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/avatar'))
    },
    filename: (req, file, cb) => {
        const newFilename = 'image' + Date.now() + path.extname(file.originalname)
        cb(null, newFilename)
    }

})
const adminUserCheck = require('../middlewares/adminUserCheck');
const localUsersCheck = require('../middlewares/localsUserCheck');
const cookieCheck = require('../middlewares/cookieCheck');
const upload = multer({storage : storage});








/* GET users listing. */
router.get('/login',login);
router.post('/login', loginValidator, processLogin);
router.get('/register',register);
router.post('/register', upload.single('image'), registerValidator, processRegister);
router.get('/contact', contact)
router.get('/logout',logout);
router.get('/userProfile', profile)
router.put('/userProfileEdit', profileEdit);


/* router.put('/userProfileEdit', profileEdit) */


module.exports = router;
