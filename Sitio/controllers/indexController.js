const products= require('../data/products_db');
const sections= require('../data/sections_db')

module.exports = {
    index : (req, res)=>{
        return res.render('index',{
            title : "Oh Shots",
            products,
            sections,
            destacados : products.filter(product => product.section === "destacados"),
            interes: products.filter(product => product.section === "interes"),
            packs : products.filter(product => product.section === "packs"),
    })
}
}