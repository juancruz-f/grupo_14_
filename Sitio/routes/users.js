var express = require('express');
var router = express.Router();



const {register,login, contact, processRegister,processLogin, logout, profile, profileEdit} = require('../controllers/usersController');
const loginValidator =require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');


/* GET users listing. */
router.get('/login',login);
router.post('/login', loginValidator, processLogin);
router.get('/register',register);
router.post('/register', registerValidator, processRegister);
router.get('/contact', contact)
router.get('/logout',logout);
router.get('/userProfile', profile)


/* router.put('/userProfileEdit', profileEdit) */


module.exports = router;
