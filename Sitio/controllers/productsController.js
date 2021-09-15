const fs=require('fs');
const path=require('path');
const categories= require('../data/categories_db');
const origenes= require('../data/origen_db')
const {products, guardar} = require('../data/products_db');
const {validationResult} = require('express-validator');

module.exports = {
    admin: (req, res)=>{
       
        return res.render('productAdmin',{
            products: JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data','products.json'),'utf-8'))
        })
    },
    detail : (req,res) => {
        let product=products.find(product=> product.id === +req.params.id);
        return res.render('productDetail',{
                products,
                product,
                interes: products.filter(product => product.section === "interes")
                
        })
    },
    save: (req,res)=>{
        const {title, description,price,category,origen,avatar} = req.body;

        let product = {
            id : products[products.length - 1].id + 1,
            title,
            description,
            category,
            avatar,
            origen,
            price : +price,  
        }
        origenes
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
        const {title, description,price,origen,category} = req.body;

        let producto = products.find(producto => producto.id === +req.params.id)
        let productoEditado = {
            id : +req.params.id,
            title,
            description,
            origen,
            price : +price,
            image : req.file ? req.file.filename : producto.image,
            category
        }

        let productosModificados = products.map(producto => producto.id === +req.params.id ? productoEditado : producto)

        guardar(productosModificados)
        res.redirect('/products/admin')
    },
    remove : (req,res) => {
        let productos = products.filter(product => product.id != req.params.id)
        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(productos,null,2),'utf-8')
        return res.redirect('/products/admin')
    },
    cart : (req,res) => {
        return res.render('productCart')
    },
    add : (req,res) => {
        res.render('productAdd',{
            products,
            categories,
            origenes,
        })
    
    },
    products : (req,res) => {
        res.render('listProducts',{
            products,
        })
    }
}
