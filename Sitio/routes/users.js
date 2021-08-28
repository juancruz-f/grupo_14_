var express = require('express');
var router = express.Router();



const {register,login, contact, processRegister,processLogin, logout} = require('../controllers/usersController');
const loginValidator =require('../validations/loginValidator');

const registerValidator = require('../validations/registerValidator');



/* GET users listing. */
router.get('/login',login);
router.post('/login', loginValidator, processLogin);
router.get('/register',register);
router.post('/register', registerValidator, processRegister);
router.get('logout',logout);


module.exports = router;
