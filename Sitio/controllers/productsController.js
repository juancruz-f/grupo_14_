const fs = require('fs');
const path = require('path');
const categories= require('../data/categories_db');
const origenes= require('../data/origen_db')
const sections= require('../data/sections_db')
const {products, guardar} = require('../data/products_db');
const {validationResult} = require('express-validator');

module.exports = {

    add : (req,res) => {
        return res.render('productAdd',{
            products,
            categories,
            origenes,
            sections,
        })
    
    },
    detail : (req,res) => {
        let product=products.find(product=> product.id === +req.params.id);
        return res.render('productDetail',{
                products,
                product,
                interes: products.filter(product => product.section === "interes"),
                origenes,
                
        })
    },
    loading : (req,res)=>res.render('productLoading'),

    save: (req,res)=>{
        
        let errors = validationResult(req);
        if(errors.isEmpty()){
            const {title,description,price,category,origen,section} = req.body;
            if(req.files){
                var imagenes = req.files.map(imagen=>imagen.filename)
            }
            let product={
                id : products[products.length - 1].id + 1,
                title,
                description,
                category,
                section,
                images: req.files.length != 0 ? imagenes : ['default-image.png'],
                origen,
                price : +price,  
            }
       products.push(product);
       guardar(products);
       res.redirect('/');

        }else{
            return res.render("productAdd",{
                categories,
                sections,
                origenes,
                errors : errors.mapped(),
                old : req.body,
    
                })
      
            }
    },
    edit : (req,res) => {
        let product = products.find(product => product.id === +req.params.id);

        return res.render('productEdit',{
            categories,
            sections,
            products,
            product,
            origenes,
        })
    },
    
    update : (req,res) => {
        const {title, description,price,origen,category,section} = req.body;
        let product = products.find(product => product.id === +req.params.id)
        let productoEditado = {
            id : +req.params.id,
            title,
             description,
            origen,
            price : +price,
            image : req.file ? req.file.filename : product.image,
            category,
            section,
        }

        let productosModificados = products.map(product => product.id === +req.params.id ? productoEditado : product)

        guardar(productosModificados)
        res.redirect('/products/admin')
    
    },
    remove : (req,res) => {
        res.send(req.params.id)
   
    },
    cart : (req,res) => {
        return res.render('productCart')
    },

    products : (req,res) => {
        res.render('listProducts',{
            products,
            categories,
            sections,
            bebidasBlancas : products.filter(product => product.category === "bebidas blancas"),
            vinos: products.filter(product => product.category === "vinos"),
            packs : products.filter(product => product.category === "packs"),
        })
    },
    admin: (req, res)=>{
       
        return res.render('productAdmin',{
            products: JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data','products.json'),'utf-8'))
        })
    },
}
