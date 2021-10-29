const {body} = require('express-validator');
const db = require('../database/models')
/* const users =require('../data/users_db'); */
module.exports = [
    body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({
        min : 2,
        max : 50
    }).withMessage('El nombre tiene que tener como mínimo 2 caracteres').bail()
    .isAlpha().withMessage('El nombre debe contener solo letras'),

    body('apellido')
    .notEmpty().withMessage('El apellido es obligatorio').bail()
    .isLength({
        min : 2,
        max : 50
    }).withMessage('El apellido tiene que tener como mínimo 2 caracteres').bail()
    .isAlpha().withMessage('El apellido debe contener solo letras'),

    body('email')
    .isEmail().withMessage('Debes ingresar un email válido')
    .custom((value)=> {
        return db.users.findOne({
            where : {
                email : value
            }
        }).then(user =>{
            if(user){
                return Promise.reject()
            }
        }).catch(() => Promise.reject("Este email ya esta registrado"))
    }),

 
 //YA VUELVOOOO PROF

    body('password')
    .isLength({
        min : 6,
        max : 12
    }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    body('password2')
    .custom((value,{req}) => {
        if(value !== req.body.password){
            return false
        }
        return true
    }).withMessage('Las contraseñas no coinciden')

   
]