/* Esto debe ser borrado */

const db = require('../database/models')

module.exports = {
    index : (req, res)=>{
        db.products.findAll({
            limit: 6,
            include: [
                { association: "category" },
                { association: "section" },
                { association: "origen" },
                { association: "imagen" },
              ],
            })
            .then(productos =>{
                
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
