const db = require('../database/models');
const {validationResult} = require('express-validator');
const category = require('../database/models/category');



module.exports = {

    add : (req,res) => {
        return res.render('productAdd',{
            products,
            categories,
            origenes,
            sections,
        })
    
    },
    detail : (req,res) => {
        db.products.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {association : 'category'},
                {association :'section'},
                {association :'origen'},
                {association :'imagen'},
                {association :'products'}
            ]
        }).then(category => {
            return res.render('productDetail',{
                products,
            })
        }).catch(error => console.log(error))
    },
    loading : (req,res)=>res.render('productLoading'),

    save: (req,res)=>{
        
        let errors = validationResult(req);
        if(errors.isEmpty()){
            const {title,description,price,category,origen,section} = req.body;
            db.products.create({
                title : title,
                description : description,
                price : price,
                category : category,
                origen: origen,
                section : section
            }).then(products => {
                if (req.files){
                    let image = req.files.map(imagen => image.filename);
                    imagenes.forEach(img => {
                        let image = []
                        let images = {
                            file : images,
                            productId : products.id
                        }
                        image.push(imagenes)
                    });

                    db.images.bulkCreate(image,{validate : true})
                        .then( () => console.log('imagenes agregadas'))
                }
            })
       products.push(product);
       guardar(products);
       res.redirect('/');

        }else{
            return res.render("productAdd",{
                categories,
                sections,
                origenes,
                errors : errors.mapped(),
                old : req.body,
    
                })
      
            }
    },
    edit : (req,res) => {
        let product = products.find(product => product.id === +req.params.id);

        return res.render('productEdit',{
            categories,
            sections,
            products,
            product,
            origenes,
        })
    },
    
    update : (req,res) => {
        const {title, description,price,origen,category,section} = req.body;
        let product = products.find(product => product.id === +req.params.id)
        let productoEditado = {
            id : +req.params.id,
            title,
             description,
            origen,
            price : +price,
            image : req.file ? req.file.filename : product.image,
            category,
            section,
        }

        let productosModificados = products.map(product => product.id === +req.params.id ? productoEditado : product)

        guardar(productosModificados)
        res.redirect('/products/admin')
    
    },
    remove : (req,res) => {
        res.send(req.params.id)
   
    },
    cart : (req,res) => {
        return res.render('productCart')
    },

    products : (req,res) => {
        const productos = db.products.findAll()
        const productosId = db.products.findByPk(req.params.id);
        Promise.all([productos, productosId]).then(([productos, productosId]) => {
            return res.render('listProducts',{
                productos,
                productosId,
            })
        })
    },
    admin: (req, res)=>{
       
        return res.render('productAdmin',{
            products: JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data','products.json'),'utf-8'))
        })
    },
}
