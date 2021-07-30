const fs=require('fs');
const path=require('path');
const categories= require('../data/categories_db');
const origenes= require('../data/origen_db')
const products= require('../data/products_db');


module.exports = {
    detail : (req,res) => {
        let product=products.find(product=> product.id === +req.params.id);
        return res.render('productDetail',{
                products,
                product,
                
        })
    },
    save: (req,res)=>{
        const {title, description,price,category,origen,image} = req.body;

        let product = {
            id : products[products.length - 1].id + 1,
            title,
            description,
            category,
            image,
            origen,
            price : +price,  
        }
        origenes,
       products.push(product);

       fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(products,null,2),'utf-8')
       return res.redirect('/')

    },
    edit : (req,res) => {
        let product = products.find(product => product.id === +req.params.id);

        return res.render('productEdit',{
            categories,
            products,
            product,
            origenes
        })
    },
    update : (req,res) => {
        res.send(req.body)
    },
    remove : (req,res) => {
        res.send(req.params.id)
    },
    cart : (req,res) => {
        return res.render('productCart')
    },
    add : (req,res) => {
        return res.render('productAdd',{
            products,
            categories,
            origenes,
        })
    
    }
}