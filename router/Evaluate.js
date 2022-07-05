const express =require('express');
const Router =express();
const bodyParser=require('body-parser');
const EvaluateController=require('../controller/Evaluate');
const Controller = new EvaluateController();


Router.use(express.json());
Router.use(bodyParser.urlencoded({ extended: true }));

Router.get('/findAll', Controller.findAll);
        Router.get('/findOne/:id', Controller.findOne);
        Router.get('/findItem', Controller.findItem);
        Router.get('/findevaluateAnime/:id', Controller.findevaluateAnime);
        Router.get('/findevaluateAnimeAccount/:id', Controller.findevaluateAnimeAccount);


        Router.post('/CreateAndUpDate', Controller.CreateAndUpDate);
        Router.post('/create', Controller.create);
        Router.put('/update/:id', Controller.update);
        Router.delete('/delete/:id', Controller.delete);
module.exports= Router;