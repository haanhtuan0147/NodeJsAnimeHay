const express =require('express');
const Router =express();
const bodyParser=require('body-parser');
const AnimeController=require('../controller/Anime');
const Controller = new AnimeController();


Router.use(express.json());
Router.use(bodyParser.urlencoded({ extended: true }));

Router.get('/findAll', Controller.findAll);
        Router.get('/findOne/:id', Controller.findOne);
        Router.get('/findItem', Controller.findItem);
        Router.get('/FindNamecount/:name', Controller.FindNamecount);
        Router.get('/FindName', Controller.FindName);
        Router.get('/Pagecount', Controller.Pagecount);
        Router.get('/Page', Controller.Page);
        Router.get('/FindCategorycount/:ListCategory', Controller.FindCategorycount);
        Router.get('/FindCategory', Controller.FindCategory);
        Router.get('/Findyearcount/:year', Controller.Findyearcount);
        Router.get('/Findyear', Controller.Findyear);
        Router.get('/FindNLSYcount', Controller.FindNLSYcount);
        Router.get('/FindNLSY', Controller.FindNLSY);


        Router.post('/create', Controller.create);
        Router.put('/update/:id', Controller.update);
        Router.delete('/delete/:id', Controller.delete);
module.exports= Router;