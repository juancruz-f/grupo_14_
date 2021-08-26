const {body} = require('express-validator');
const {usuarios} = require('../data/users_db');
const bcrypt = require('bcryptjs');


module.exports = [
    body('email')
    .custom((value,{req}) => {
        let usuario = usuarios.find(usuario => usuario.email === value && bcrypt.compareSync(req.body.password,usuario.password));
        if (usuario){
            return true
        }else{
            return false
        }
    }).withMessage('credenciales inválidas')
]