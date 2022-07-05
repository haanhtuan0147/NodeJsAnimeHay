
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv')
dotenv.config();
global.__basedir = __dirname;
var corsOptions = {
  origin: 'http://localhost:4000',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
};
//const jwt = require('jsonwebtoken');
const Account=require('./router/Account');

var cors = require('cors');
//const AccountPremissions=require('./router/AccountPremissions');
const Anime=require('./router/Anime');
const AnimePart=require('./router/AnimePart');
const AnimeServer=require('./router/AnimeServer');
const Category=require('./router/Category');
const Commenttext=require('./router/Comment');
const Episode=require('./router/Episode');
const Evaluate=require('./router/Evaluate');
const FeedBack=require('./router/Feedback');
const Follow=require('./router/Follow');
const leve=require('./router/Leve');
const login=require('./controller/passport');
//const login=new ControllerLogin();
const controllertoken=require('./controller/ToKen')
const MessegaAccount=require('./router/MessegaAccount')
const TimeOnline=require('./router/TimeOnline')
const Gmailcheck=require('./router/Gmail')
//const ToKen=require('./router/ToKen');
const Checkfile=require("./controller/Checkfile")
const Accountexp=require('./controller/Account')
const Account01=new Accountexp();
class Server{
    app;
    constructor(){
        this.app=express();
        this.conFig();
        this.start();
        this.router();
    }
    conFig() {
        this.app.use(express.json())
            .use(
                session({
                    secret: "keyboard cat",
                    resave: false,
                    saveUninitialized: true,
                    cookie: { secure: false }
                })
            )
            .use(passport.initialize())
            .use(passport.session())
            .use(bodyParser.urlencoded({extended:true}))
            .use(cors({origin: '*'}))
    }
    start(){
        this.app.listen(process.env.PORT, () => {

            console.log(`server running at port: ${process.env.PORT}`);
        });
    }
    router(){
        this.app.use('/',(req,res)=>{res.json("HeLLo")})
       .use('/Comment',Commenttext)
        .use('/Evaluate',Evaluate)
        .use('/Leve',controllertoken.CheckToKenTime,controllertoken.RoleRoot,leve)
        .use('/Account',Account)
        .use('/FeedBack',FeedBack)
        .use('/Anime',Anime)
        .use('/AnimePart',AnimePart)
        //.use('/AccountPremissions',AccountPremissions)
        .use('/AnimeServer',AnimeServer)
        .use('/Episode',Episode)
        .use('/Category',Category)
        .use('/Follow',Follow)
        .use('/Gmail',Gmailcheck)
        .use('/MessegaAccount',MessegaAccount)
        .use('/TimeOnline',TimeOnline)
        .post('/Login',login.Authenticate,Account01.ExpFrit,controllertoken.CreateToken)
        .post('/uploadfile',Checkfile.Checkfile)
        .post('/uploadVideo',Checkfile.UploadVi)
        .get('/uploadsImage/:name',(req,res,next)=>{
            res.sendFile(__dirname+`/uploads/${req.params.name}`)
        })
        .get('/uploadsVideo/:name',(req,res,next)=>{
            res.sendFile(__dirname+`/UploadVideo/${req.params.name}`)
        })
        //.post('/taotaikhoan',Gmail01.Gmail)
        //use('/test')
        //.use('/ToKen',ToKen)
    }
}
new Server();