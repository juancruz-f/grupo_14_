/* Esto debe ser borrado */
const {products}= require('../data/products_db');
const sections= require('../data/sections_db')

const db = require('../database/models')

module.exports = {
    index : (req, res)=>{
        db.products.findAll({
            include: [
                { association: "category" },
                { association: "section" },
                { association: "origen" },
                { association: "imagen" },
              ],
            })
            .then(productos =>{
                console.log(productos);
            res.render('index',{
                productos,
                usuario: req.session.userLogin
            })

            })
            .catch(error => {
                console.log(error)
            })

        /* return res.render('index',{
            title : "Oh Shots",
            products,
            sections,
            destacados : products.filter(product => product.section === "destacados"),
            interes: products.filter(product => product.section === "interes"),
            packs : products.filter(product => product.section === "packs"),
    }) */


    
    },
    about : (req,res)=>res.render('about'),

    test: (req,res)=> res.render('index')


}
