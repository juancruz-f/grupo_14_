var express = require('express');
var router = express.Router();

const{login,register,contact} = require('../controllers/usersController')

/* GET users listing. */
router.get('/login',login);
router.get('/register',register);
router.get('/contact',contact)

module.exports = router;
