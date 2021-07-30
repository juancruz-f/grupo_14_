const fs=require('fs');
const path=require('path');
const categories= require('../data/categories_db')
const products= require('../data/products_db');

module.exports = {
    detail : (req,res) => {
        let product=products.find(product=> product.id === +req.params.id);
        return res.render('productDetail',{
                products,
                product,
                interes: products.filter(product => product.section === "interes")
                
        })
    },
    cart : (req,res) => {
        return res.render('productCart')
    },
    add : (req,res) => {
        return res.render('productAdd',{
            products,
            categories, 
        })
    
    }
}