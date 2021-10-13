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

    body('email')
    .isEmail().withMessage('Debes ingresar un email válido')
    .custom((value, {req})=> {
        let emailRepeat = db.users.F
        if(!emailRepeat){
            return true
        }else{
            return false 
        }
    }).withMessage('Este email ya esta registrado'),

    body("access")
    .notEmpty().withMessage("debes elegir un tipo de producto"),
]