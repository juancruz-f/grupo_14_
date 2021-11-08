const db = require('../database/models')
const { validationResult } = require('express-validator');

const { idSection, idCategory, idOrigen } = require('../utils/idConverter');


module.exports = {
  add: (req, res) => {
    let categories = db.categories.findAll();
    let origenes = db.origenes.findAll();
    let sections = db.sections.findAll();
    Promise.all([categories, origenes, sections])
      .then(([categories, origenes, sections]) => {
        res.render("productAdd", {


          categories,
          origenes,
          sections,
        });
      })

      .catch((error) => console.log(error));
  },
  detail: (req, res) => {
    db.products.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { association: "category" },
        { association: "section" },
        { association: "origen" },
        { association: "imagen" },
      ],
    })
      .then((products) => {

        return res.render('productDetail', {
          products,
          idCategory,
          idOrigen,
          

        });
      })
      .catch((error) => console.log(error));
  },
  search: (req, res) => {
    let producto = db.products.findAll({
      where: {
        name: {
          [Op.substring]: req.query.search /* para q me busque ej : auris, micro etc.. */
        }
      },
      include: [
        { association: 'imagen' },
        { association: 'category' },
        { association: 'section' },
        { association: 'origen' }
      ]

    })
    let categorias = db.categories.findAll()
    Promise.all([producto, categorias])
      .then(([producto, categorias]) => {
        return res.render('resultSearch', {
          producto,
          categorias,
          name: req.query.search
        })
      })
  },
  loading: (req, res) => res.render("productLoading"),
  save: (req, res) => {
    let errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {


      const { title, description, price, categoryId, sectionId, origenId } = req.body;



      db.products.create({
        ...req.body,
        title: title.trim(),
        description: description.trim(),
        price: price,




      })
        .then(producto => {


          if (req.files) {
            var images = [];
            var imagenes = req.files.map(imagen => imagen.filename);
            imagenes.forEach(img => {
              var image = {
                file: img,
                productId: producto.id
              }
              images.push(image)
            });

            db.images.bulkCreate(images, { validate: true })
              .then(() => console.log('imagenes agregadas'))
                     }
                     return res.redirect('/products/admin')   

          
        }).catch(error => console.log(error))

    } else {
      let categories = db.categories.findAll();
      let origenes = db.origenes.findAll();
      let sections = db.sections.findAll();
      Promise.all([categories, origenes, sections])
        .then(([categories, origenes, sections]) => {
          res.render("productAdd", {


            categories,
            origenes,
            sections,
            errores: errors.mapped(),
            old: req.body


          });
        })

        .catch((error) => console.log(error));
    }
  },
  edit: (req, res) => {
    let categories = db.categories.findAll();
    let sections = db.sections.findAll();
    let origenes = db.origenes.findAll();
    let producto = db.products.findByPk(req.params.id, { include: ["imagen"] });
    Promise.all([categories, producto, origenes, sections])
      .then(([categories, producto, origenes, sections]) => {
        return res.render('productEdit', {
          categories,
          origenes,
          sections,
          producto
        })
      })

  },
  update: (req, res) => {
    const { title, description, price, categoryId, origenId, sectionId } = req.body;

    db.products.update(
      {
        title: title.trim(),
        description: description.trim(),
        price,
        categoryId,
        origenId,
        sectionId
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(() => {
      if (req.files.length > 0) {
        db.images.destroy({
          where: {
            productId: req.params.id
          }
        })
          .then(() => {
            let images = req.files.map(file => {
              let image = {
                file: file.filename,
                productId: req.params.id
              }
              return image
            })
            db.images.bulkCreate(images, { validate: true })
              .then(() => console.log('imagenes agregadas'))
              
              
          })
          return res.redirect('/products/admin')
      }else {
        return res.redirect('/products/admin')
      }



    }
    )
      .catch(error => console.log(error))

  },
  remove: (req, res) => {
    db.products.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => res.redirect('/products/listProducts'))
      .catch(error => console.log(error))
  },
  admin: (req, res) => {

    db.products.findAll({
      include: [
        { association: "category" },
        { association: "section" },
        { association: "origen" },
        { association: "imagen" },
      ],
    })
      .then(productos => {



        res.render('productAdmin', {
          productos,
          idCategory,
          idSection,
          idOrigen,


          usuario: req.session.userLogin
        })

      })
      .catch(error => {
        console.log(error)
      })

  },
  list: (req, res) => {
    db.products.findAll({
      include: [
        { association: "category" },
        { association: "section" },
        { association: "origen" },
        { association: "imagen" },
      ],
    })
      .then((productos) => {
        

        return res.render("listProducts", {
          productos,
        });
      })
      .catch((error) => console.log(error))
  }
}
