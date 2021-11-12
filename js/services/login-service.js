exports.login = async function(req,res){
    let email = req.body.email;
    let password = req.body.password;
    let json={};
    if(email == "suyou881@gmail.com" && password ==1234){
        json.email=email;
        json.password=password;
        json.code=0;
    }else{
        json.code=100;
        json.msg="Please check your ID or password again.";
    }
    return json;
}