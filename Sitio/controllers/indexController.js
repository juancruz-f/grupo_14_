const path = require('path');
const products= require('../data/products_db')
module.exports = {
    index : (req, res)=>{
        console.log(products)
        return res.render('index',{
            title : "Oh Shots"
    })
}
}