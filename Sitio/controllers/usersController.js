const db = require('../database/models');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');


module.exports = {
    register: (req, res) => {
        return res.render('register', {
            /* products, */
        })
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);
        let { nombre, apellido, email, password } = req.body;

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
                    return res.redirect('/users/login')
                }
                )




        } else {
            return res.render('register', {
                products,
                old: req.body,
                errores: errors.mapped(),
            })
        }

    },
    login: (req, res) => {
        return res.render('login')
    },
    processLogin: (req, res) => {

        let errors = validationResult(req);
        const { email, recordar } = req.body;
        if (errors.isEmpty()) {
            db.users.findOne({  //por el mail
                where: { email : email }
            }).then(user => {
                console.log(user);
                req.session.userLogin = {
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    rolId: user.rolId,
                    email : user.email,
                    avatar : user.avatar,
                }
                recordar && res.cookie('ohshots', req.session.userLogin, { maxAge: 1000 * 60 })
                return res.redirect('/')
            })
        } else {
            return res.render('login', {
                products,
                errores: errors.mapped()
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
    profile: (req, res) => {
        db.users.findOne({
            include : ['rol'],
            where: {email : req.session.userLogin.email}
        })
        .then(user =>{ 
            console.log(user);
            res.render("userProfile", {user}
        )})

    },
    
    updateProfile: (req, res) => {
        const errors = validationResult(req);
        console.log(errors);
        if (errors.isEmpty()) {
            db.users.update( 
                {
                    nombre : req.body.name,
                    avatar: req.file ? req.file.filename : "default.png",

                },
               { where : {email : req.session.userLogin.email}},
            ).then(() => {
            
                if (req.cookies.rememberSession) {
                    res.cookie('rememberSession', req.session.userLogged, { maxAge: 10000 * 60 });
                }
                res.redirect('/')
            })
              
            


        } else {

            res.render("userProfile", {
                errors: errors.mapped(),
                old: req.body,
            })
        }
    }

}

