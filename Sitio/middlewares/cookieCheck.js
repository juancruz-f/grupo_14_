module.exports = (req, res,next) => {
    if(req.cookies.ohshots){
        req.session.userLogin = req.cookies.ohshots;
    }
    next()
}