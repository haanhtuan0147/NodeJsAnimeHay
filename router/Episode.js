const express =require('express');
const Router =express();
const bodyParser=require('body-parser');
const EpisodeController=require('../controller/Episode');
const Controller = new EpisodeController();


Router.use(express.json());
Router.use(bodyParser.urlencoded({ extended: true }));

Router.get('/findAll', Controller.findAll);
        Router.get('/findOne/:id', Controller.findOne);
        Router.get('/findItem', Controller.findItem);
        Router.get('/findItemdis', Controller.findItemdis);
        Router.get('/EpisodeCountAnime/:id', Controller.EpisodeCountAnime);
        Router.get('/EpisodeSever', Controller.EpisodeSever);
        Router.get('/ListSever', Controller.ListSever);
        
        Router.post('/create', Controller.create);
        Router.put('/update/:id', Controller.update);
        Router.delete('/delete/:id', Controller.delete);
module.exports= Router;