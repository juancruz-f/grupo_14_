var express = require('express');
var router = express.Router();
const {index,about} = require('../controllers/indexcontroller')

/* GET home page. */
router.get('/', index)
router.get('/about',about);

module.exports = router;
