const db = require('../database/models')
const {validationResult} = require('express-validator');
const category = require('../utils/idConverter');
const { idSection, idCategory, idOrigen} = require('../utils/idConverter');


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
      console.log(categories);      })
      
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
        console.log(products.imagen[0]);
        return res.render("productDetail", {
          products,
          idCategory,
          idOrigen,
          
        });
      })
      .catch((error) => console.log(error));
  },
  search : (req,res) =>{
    let producto = db.products.findAll({
        where : {
            name : {
                [Op.substring] : req.query.search /* para q me busque ej : auris, micro etc.. */
            }
        },
            include : [
                {association : 'imagen'},
                {association : 'category'},
                {association: 'section'},
                {association: 'origen'}
            ]

    })
    let categorias = db.categories.findAll()
    Promise.all([producto,categorias])
    .then(([producto,categorias])=>{
        return res.render('resultSearch',{
            producto,
            categorias,
            name : req.query.search
        })
    })
},
  loading: (req, res) => res.render("productLoading"),
  save: (req, res) => {
    let errors = validationResult(req);
    console.log(errors);
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

            db.images.bulkCreate(images, { validate: true })
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
},
admin : (req, res)=>{
 
    db.products.findAll({
      include: [
          { association: "category" },
          { association: "section" },
          { association: "origen" },
          { association: "imagen" },
        ],
      })
      .then(productos =>{

        
          
      res.render('productAdmin',{
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
    list: (req, res)=> db.products.findAll({
      include: [
        { association: "category" },
        { association: "section" },
        { association: "origen" },
        { association: "imagen" },
      ],
    })
    .then((productos) => {
      console.log(productos.imagen);;
      res.render("/products/listProducts", {
        productos,
      });
    })
    .catch((error) => console.log(error))
}
