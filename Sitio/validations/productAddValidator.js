const path = require("path");
const {body} = require('express-validator');

module.exports = [
    body('title')
    .notEmpty().withMessage('Este campo es obligatorio')
    .isLength({min : 5}).withMessage("el nombre debe tener al menos 5 caracteres"),

    body('description')
    .notEmpty().withMessage('Añade una descripción')
    .isLength({min : 5}).withMessage("la descripcion debe tener un minimo de 5 caracteres")
    .isLength({max : 400}).withMessage("la descripcion puede tener un maximo de 400 caracteres"),

    body('price')
    .notEmpty().withMessage('Añade un precio')
    .isInt().withMessage("debes introducir un numero"),

    body('category')
    .notEmpty().withMessage('Indica la categoría'),

    body("section")
    .notEmpty().withMessage("Debes elegir una seccion"),

    
    body("image").custom((value,{req})=>{
        let extensions = [".jpg",".jpeg",".gif",".png",]

        if(req.files.length == 0){
            return true
        }else{
            for (let i=0;i< req.files.length; i++) {
                if(!extensions.includes(path.extname(req.files[i].originalname))){
                    throw new Error(`las extensiones permitidas son ${extensions.join(", ")}`);
                }
            }
            return true
        }
    }),

]