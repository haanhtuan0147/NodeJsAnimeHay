const express =require('express');
const Router =express();
const bodyParser=require('body-parser');
const CommentController=require('../controller/Comment');
const Controller = new CommentController();
const ControllerToken=require('../controller/ToKen')


Router.use(express.json());
Router.use(bodyParser.urlencoded({ extended: true }));

Router.get('/findAll', Controller.findAll);
        Router.get('/findOne/:id', Controller.findOne);
        Router.get('/findItem',Controller.findItem);
        Router.get('/findpage', Controller.findpage);

        Router.post('/create',ControllerToken.RoleKhach,Controller.create);
        Router.put('/update/:id',ControllerToken.RoleAdmin,Controller.update);
        Router.delete('/delete/:id',ControllerToken.RoleAdmin, Controller.delete);
module.exports= Router;