var express = require('express');
var router = express.Router();
const {index,about, test} = require('../controllers/indexController')

/* GET home page. */
router.get('/', index)
router.get('/about',about);
router.get('/test', test);
module.exports = router;
