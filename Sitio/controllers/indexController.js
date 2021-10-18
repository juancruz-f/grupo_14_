const db = require('../database/models')


module.exports = {
    index : (req, res)=>{
        return res.render('index',{
            title : "Oh Shots",
    })
    
},
about : (req,res)=>res.render('about'),
}
