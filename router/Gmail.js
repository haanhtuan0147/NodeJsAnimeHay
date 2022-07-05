const express =require('express');
const Router =express();
const bodyParser=require('body-parser');
const GmailController=require('../controller/CheckGmail');
const Controller = new GmailController();


Router.use(express.json());
Router.use(bodyParser.urlencoded({ extended: true }));



        Router.post('/Gmail', Controller.Gmail);

module.exports= Router;