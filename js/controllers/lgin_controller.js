let service_main = require("../services/login-service");

exports.login = async function(req, res)   {
    let result = await service_main.login(req);
    if(result.code==0){
        res.cookie('cookie_login', result.email, {
            maxAge:60*60*1000,
            httpOnly: true,
            signed: true
        });
        // after logging, save user info to session
        //req.session.user = result;
    }
    return result;
}