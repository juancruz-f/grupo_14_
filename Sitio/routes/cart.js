const express = require('express');
const router = express.Router();

const {cart} = require("../controllers/cartController")

/* GET home page. */
router.get('/',cart)

module.exports = router;