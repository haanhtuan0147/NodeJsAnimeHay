const express =require('express');
const Router =express();
const bodyParser=require('body-parser');
const TimeOnlineController=require('../controller/TimeOnline');
const Controller = new TimeOnlineController();
const token=require('../controller/ToKen')
const Accountexp=require('../controller/Account')
const Account01=new Accountexp();

Router.use(express.json());
Router.use(bodyParser.urlencoded({ extended: true }));

        Router.get('/findAll', Controller.findAll);
        Router.get('/findOne/:id', Controller.findOne);
        Router.get('/findItem', Controller.findItem);
        Router.post('/TimeOnline',token.CheckToKenTime,Controller.findatetime5,Account01.CountDate);
        Router.post('/create', Controller.create);
        Router.put('/update/:id', Controller.update);
        Router.delete('/delete/:id', Controller.delete);
module.exports= Router;