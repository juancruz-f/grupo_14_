/* Esto debe ser borrado */

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
            .then(products =>{
                
            res.render('index',{
                products,
                usuario: req.session.userLogin
            })

            })
            .catch(error => {
                console.log(error)
            })

    

    
    },
    about : (req,res)=>res.render('about'),

    test: (req,res)=> res.render('index')


}
