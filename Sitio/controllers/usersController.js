const {usuarios, guardar}= require('../data/users_db');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const {products} = require('../data/products_db');


module.exports= {
    register:(req,res)=>{
        return res.render('register',{
            products,
        })
    },
    processRegister : (req,res) => {
        let errors = validationResult(req);
        let {nombre,apellido,email,password} = req.body;
        if(errors.isEmpty()){
            let usuario = {
                id : usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
                nombre,
                apellido,
                email,
                password : bcrypt.hashSync(password,10),
                rol : "user"
            }
            usuarios.push(usuario);
            guardar(usuarios);

           
            return res.redirect('/users/login')
        }else{
            return res.render('register',{
                products,
                old : req.body,
                errores : errors.mapped()
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
    profile: (req, res) => {
        /* if (req.locals.userLogin) { // mandar usuarios abajo de productos
            res.locals.userLogin 
        } else {
            return res.render('login')
        } */
        return res.render('userProfile',{
            products,
        })
        req.session.userLogin = {
            id : usuario.id,
            nombre : usuario.nombre,
            rol : usuario.rol
        }
            res.cookie('ohshots',req.session.userLogin,{maxAge: 1000 * 60})
        }
    }/* ,
    profileEdit: (req, res) => { // update o post: actualizar req.session.userlogin y hacer push.
        return res.render('userProfileEdit',{
            products,
        })
    } */

