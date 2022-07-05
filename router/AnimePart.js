const express =require('express');
const Router =express();
const bodyParser=require('body-parser');
const AnimePartController=require('../controller/AnimePart');
const Controller = new AnimePartController();


Router.use(express.json());
Router.use(bodyParser.urlencoded({ extended: true }));

Router.get('/findAll', Controller.findAll);
        Router.get('/findOne/:id', Controller.findOne);
        Router.get('/findItem', Controller.findItem);
        Router.get('/FindFollowIdAnime/:id', Controller.FindFollowIdAnime);

        Router.post('/create', Controller.create);
        Router.post('/CreateOld', Controller.CreateOld);
        Router.put('/update/:id', Controller.update);
        Router.delete('/delete/:id', Controller.delete);
module.exports= Router;