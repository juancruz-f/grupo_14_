const db = require('../database/models');
const {products} = require('../data/products_db');
const {usuarios, guardar}= require('../data/users_db');
const fsMethods = require("../utils/fsMethods");
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');


module.exports= {
    register:(req,res)=>{
        return res.render('register',{
            products,
        })
    },
    processRegister : (req,res) => {
        let errors = validationResult(req);
        let {nombre,apellido,email,password}= req.body;
        
        if(errors.isEmpty()){
            db.users.create({
                nombre : nombre,
                apellido: apellido,
                email: email,
                password: bcrypt.hashSync(password, 10), 
                avatar : "default.png",
                rolId : 1
            })
            
            .then(result => {
                return res.redirect('/users/login')}
            )

            
           
            
        }else{
            return res.render('register',{
                products,
                old : req.body,
                errores : errors.mapped(),
            })
        }
        
    },
    login : (req,res) => {
        return res.render('login',{
            products,
        })
    },
    processLogin : (req,res) => {

        let errors = validationResult(req);
        const {email, recordar} = req.body;
        if(errors.isEmpty()){
            let usuario = usuarios.find(usuario => usuario.email === email)
            req.session.userLogin = {
                id : usuario.id,
                nombre : usuario.nombre,
                rol : usuario.rol
            }

            if(recordar){
                res.cookie('ohshots',req.session.userLogin,{maxAge: 1000 * 60})
            }
            return res.redirect('/')
        }else{
            return res.render('login',{
                products,
                errores : errors.mapped()
            })
        }
    },
    logout : (req,res) => {
        req.session.destroy();
        res.cookie('ohshots',null,{maxAge:-1})
        return res.redirect('/')
    },
    contact:(req,res)=>{
        return res.render('contact')
    },
    profile : (req,res) => res.render("userProfile",{usuario : usuarios.find(usuario => usuario.id === +req.params.id)}),
    updateProfile : (req,res) => {
        const errors = validationResult(req);
        let oldImage,image

        if(errors.isEmpty()){
            usuarios.forEach(usuario => {
                if(usuario.id === +req.params.id){

                    oldImage = usuario.image
                    image = req.file ? req.file.filename : usuario.image
                    
                    
                    usuario.nombre = req.body.nombre
                    usuario.apellido = req.body.apellido
                    usuario.email = req.body.email
                    usuario.rol = req.body.rol
                    usuario.image = image != req.body.deleteImage ? image : "default-user-image.png"
                }
            });

            fsMethods.saveUsers(users);
            req.body.deleteImage != "noBorrar" && oldImage != "default-user-image.png" ? fsMethods.deleteFile(`../public/images/users/${oldImage}`) : null; 

            let updatedUser = usuarios.find(usuario => usuario.id === +req.params.id)
            
            req.session.save(err =>{
                req.session.userLogged = updatedUser
                res.redirect("/")
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
            })
        }
    }

}

