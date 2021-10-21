
const {validationResult} = require('express-validator');
const db = require('../database/models')


module.exports = {
  add: (req, res) => {
    db.products
      .findAll()
      .then((product) => {
        return res.render("productAdd", {
          products,
          categories,
          origenes,
          sections,
        });
      })
      .catch((error) => console.log(error));
  },
  detail: (req, res) => {
    db.products
      .findOne({
        where: {
          id: req.params.id,
        },
        include: [
          { association: "category" },
          { association: "section" },
          { association: "origen" },
          { association: "imagen" },
          { association: "products" },
        ],
      })
      .then((products) => {
        return res.render("productDetail", {
          products,
          product,
          origenes,
          section,
        });
      })
      .catch((error) => console.log(error));
  },
  loading: (req, res) => res.render("productLoading"),
  save: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const { title, description, price, category, origen, section } = req.body;
      db.products.create({
        ...req.body,
        title: title.trim(),
        description: description.trim(),
        price: price,
        category: category,
        origen: origen,
        section: section
    }).then(product => {

        if (req.files) {
            var images = [];
            var imagenes = req.files.map(imagen => imagen.filename);
            imagenes.forEach(img => {
                var image = {
                    file: img,
                    productId: product.id
                }
                images.push(image)
            });

            db.image.bulkCreate(images, { validate: true })
                .then(() => console.log('imagenes agregadas'))
        }

        return res.redirect('/listProducts')
    }).catch(error => console.log(error))

} else {
    db.categories.findAll()
        .then(categorias => {
            return res.render('productAdd', {
                categorias,
                errores: errors.mapped(),
                old: req.body
            })
        }).catch(error => console.log(error))


      
    }
  },
  edit: (req, res) => {
    let categorias = db.categories.findAll();
    let producto = db.products.findByPk(req.params.id);
    Promise.all([categorias, producto])
        .then(([categorias, producto]) => {
            return res.render('productEdit', {
                categorias,
                producto
            })
        })

},
  update: (req, res) => {
    const { title, description, price, category, origen, section } = req.body;

    db.products.update(
        {
            title: title.trim(),
            description: description.trim(),
            price,
            category,
            origen,
            section
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(() => res.redirect('/listProducts'))
        .catch(error => console.log(error))

},
remove: (req, res) => {
  db.products.destroy({
      where: {
          id: req.params.id
      }
  }).then(() => res.redirect('/listProducts'))
      .catch(error => console.log(error))
}

};
