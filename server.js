var express = require("express");
var multer = require("multer");
var fs = require("fs");
var bodyParser = require("body-parser");
var querystring = require("querystring");
var path = require("path");
var data = require("./js/data-service");
var exphbs = require("express-handlebars");
const formidable  = require('formidable');
require("dotenv").config();
var cloudinary = require('cloudinary').v2;
const { homedir } = require("os");
const cookieParser = require("cookie-parser");
const url = require("url");
const cloudinaryConfig = (req, res, next) => {cloudinary.config({
    cloud_name: 'dqhxarzwd', 
    api_key: '563238535556164',
    api_secret: 'fRkqBE7iGTS5w5FsqLKWNfQRfwM',
    secure:true
    });
    next();
}

let controller_main = require("./js/controllers/lgin_controller")

var HTTP_PORT = process.env.PORT || 8080;

var app = express();
app.use(function(req,res,next){
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
   });
app.use('/*', cloudinaryConfig);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/js"));
app.use(cookieParser("secret"));

const hbs = exphbs.create({
    extname: '.hbs'
    , defaultLayout: 'main'
    , layoutsDir: __dirname + '/views/layouts'
    , partialsDir: __dirname + '/views/partials'

    , helpers:{
        navLink: function(url, options){
            return '<li' + 
            ((url == app.locals.activeRoute) ? ' class="active" ' : '') + 
            '><a href="' + url + '">' + options.fn(this) + '</a></li>';
           }

        , equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
            throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
            return options.inverse(this);
            } else {
            return options.fn(this);
            }
        }
        , isEmpty: function(items, options){
            if(items.length==0)
            return options.fn(this);
            else if(items.length > 1)
            return 
            options.inverse(this);
        }
    }
})

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');


function onHttpStart(){
    console.log("Express http server listening on port " + HTTP_PORT);
}

const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb) {
      // we write the filename as the current date down to the millisecond
      // in a large web service this would possibly cause a problem if two people
      // uploaded an image at the exact same time. A better way would be to use GUID's for filenames.
      // this is a simple example.
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage: storage });

app.get("/", (req,res) => {
    if(req.signedCookies.cookie_login){
        console.log(req.signedCookies.cookie_login)
        res.render('member_home',{
            cookie: req.signedCookies.cookie_login
        });
    }else{
        res.render('member_home');
    }
});
app.get("/member_logout", (req,res) => {
    res.render('member_logout');
});
app.get("/member_myPage", (req,res) => {
    res.render('member_myPage');
});
app.get("/member_signup", (req,res) => {
    res.render('member_signup');
});
app.get("/member_login", (req,res) => {
    res.render('member_login',{
        layout: "empty"
    });
});
app.post("/member_login",async (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let result = await controller_main.login(req,res);
    if(result.code==0){
        res.redirect("/");
    }else{
        res.render("member_login",{
            layout: "empty",
            msg: result.msg
        })
    }
})



app.use((req,res,next)=>{
    res.status(404).send('Page Not Found');
});
app.listen(HTTP_PORT,onHttpStart);