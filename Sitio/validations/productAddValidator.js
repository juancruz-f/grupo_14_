const {body} = require('express-validator')

module.exports = [
    body('title')
    .notEmpty().withMessage('Este campo es obligatorio'),

    body('description')
    .notEmpty().withMessage('Añade una descripción'),

    body('price')
    .notEmpty().withMessage('Añade un precio'),

    body('category')
    .notEmpty().withMessage('Indica la categoría')
]