const {check} = require('express-validator')

module.exports = [
    check('title')
    .notEmpty().withMessage('Este campo es obligatorio'),

    check('description')
    .notEmpty().withMessage('Añade una descripción'),

    check('price')
    .notEmpty().withMessage('Añade un precio'),

    check('category')
    .notEmpty().withMessage('Indica la categoría')
]