
module.exports = (req,res,next) => {
    console.log(req.session.userLogin);
    if(req.session.userLogin && req.session.userLogin.rolId == 2){
        next()
    }
    else{
        res.redirect('/')
    }
    
    
}