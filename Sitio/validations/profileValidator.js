const {body} = require("express-validator");
const path = require("path");
const db = require('../database/models')
module.exports = [

    body("avatar").custom((value,{req})=>{
        let extensions = [".jpg",".jpeg",".gif",".png",]

        if(!req.file){
            return true
        }else{
            if(!extensions.includes(path.extname(req.file.originalname))){
                throw new Error(`las extenciones permitidas son ${extensions.join(", ")}`);
            }else{
                return true 
            }
        }
    }),

    body("name")
    .notEmpty().withMessage("debes introducir un nombre")
    .isLength({min : 3}).withMessage("el nombre debe tener al menos 3 caracteres"),

    body("access")
    .notEmpty().withMessage("debes elegir un tipo de producto"),
]