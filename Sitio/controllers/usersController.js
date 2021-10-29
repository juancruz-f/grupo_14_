const db = require('../database/models');
/* Eliine las llamadas a los json */
const fsMethods = require("../utils/fsMethods");
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');


module.exports= {
    register:(req,res)=>{
        return res.render('register',{

        })
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);
        let { nombre, apellido, email, password } = req.body;
        console.log(errors)

        if (errors.isEmpty()) {
            db.users.create({
                nombre: nombre,
                apellido: apellido,
                email: email,
                password: bcrypt.hashSync(password, 10),
                avatar: "default.png",
                rolId: 1
            })
            
            .then(result => {
                return res.redirect('/users/login')}
            )     
        }else{
            return res.render('register',{
                /* elimine el envio de productos, obsoleto por que lo usaban del json */
                old : req.body,
                errores : errors.mapped(),
            })
        }

    },
    login : (req,res) => {
        return res.render('login',{
            /* elimine el envio de productos, obsoleto por que lo usaban del json */
        })
    },
    processLogin : (req,res) => {
        let errors = validationResult(req);
        const {email, recordar} = req.body;
        if(errors.isEmpty()){
            /* Uso la base de datos */
            db.users.findOne({
                where: {
                    email: email
                }
            }).then(usuario => {
                req.session.userLogin = {
                    id : usuario.id,
                    nombre : usuario.nombre,
                    rol : usuario.rol,
                    imagen: usuario.imagen,
                    apellido: usuario.apellido
                }
                if(recordar){
                    res.cookie('ohshots',req.session.userLogin,{maxAge: 1000 * 60})
                }
                return res.redirect('/')
    
            }).catch(error => res.send(error))

            /*obsoleto ->usado en el json
             let usuario = usuarios.find(usuario => usuario.email === email) */
            
        }else{
            return res.render('login',{
                errores : errors.mapped()
            })
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.cookie('ohshots', null, { maxAge: -1 })
        return res.redirect('/')
    },
    contact: (req, res) => {
        return res.render('contact')
    },
    profile : (req,res) =>{
        db.users.findByPk(req.params.id)
        .then(usuario => {
            res.render('userProfile',{
                usuario
            })
        })
    }
    
    /* res.render("userProfile",{usuario : usuarios.find(usuario => usuario.id === +req.params.id)}) */,
    updateProfile : (req,res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){

            db.users.update({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                rol: req.body.rol,
                image: req.file ? req.file.filename : req.session.userLogin,
                },{
                    where:{
                        id:req.params.id
                    }                
            }).then(result =>{
                db.users.findByPk(req.session.userLogin.id)
                .then(usuario => {
                    req.session.userLogin = {
                        id : usuario.id,
                        nombre : usuario.nombre,
                        rol : usuario.rol,
                        imagen: usuario.imagen,
                        apellido: usuario.apellido
                    }
                    res.cookie('ohshots',req.session.userLogin,{maxAge: 1000 * 60})
                    return res.redirect('/')
                })

                
            })
        }else{
            req.file ? fsMethods.deleteFile(`../public/images/avatar/${req.file.filename}`) : null

            res.render("userProfile",{
                errors : errors.mapped(),
                old : req.body,
                usuario : req.session.userLogin
            })
        }
            /* usuarios.forEach(usuario => {
                if(usuario.id === +req.params.id){

                    oldImage = usuario.image
                    image = req.file ? req.file.filename : usuario.image
                    
                    
                    usuario.nombre = req.body.nombre
                    usuario.apellido = req.body.apellido
                    usuario.email = req.body.email
                    usuario.rol = req.body.rol
                    usuario.image = image != req.body.deleteImage ? image : "default-user-image.png"
                }
            }); */

            /* fsMethods.saveUsers(users);
            req.body.deleteImage != "noBorrar" && oldImage != "default-user-image.png" ? fsMethods.deleteFile(`../public/images/users/${oldImage}`) : null; 

                },
               { where : {email : req.session.userLogin.email}},
            ).then(() => {
            
                if (req.cookies.rememberSession) {
                    res.cookie('rememberSession', req.session.userLogged, { maxAge: 10000 * 60 });
                }
                res.redirect('/')
            })
              
            
            if (req.cookies.rememberSession) {
                res.cookie('rememberSession', req.session.userLogged, {maxAge : 10000 * 60});
            }     

                
        }else{
            req.file ? fsMethods.deleteFile(`../public/images/avatar/${req.file.filename}`) : null

            res.render("userProfile",{
                errors : errors.mapped(),
                old : req.body,
                usuario : usuarios.find(usuario => usuario.id === +req.params.id)
            })*/ 
        
    }

}

