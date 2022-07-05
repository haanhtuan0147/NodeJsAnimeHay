const express =require('express');
const Router =express();
const bodyParser=require('body-parser');
const FollowController=require('../controller/Follow');
const Controller = new FollowController();
const ControllerToken=require('../controller/ToKen')

Router.use(express.json());
Router.use(bodyParser.urlencoded({ extended: true }));

Router.get('/findAll',ControllerToken.RoleAdmin,Controller.findAll);
        Router.get('/findOne/:id',ControllerToken.RoleAdmin,Controller.findOne);
        Router.get('/findItem',ControllerToken.RoleAdmin,Controller.findItem);
        Router.get('/findUser',ControllerToken.RoleKhach,Controller.findUser);
        Router.get('/findUserOne',ControllerToken.RoleKhach,Controller.findUserOne);

        Router.post('/create',ControllerToken.RoleKhach,Controller.create);
        Router.put('/update/:id',ControllerToken.RoleAdmin,Controller.update);
        Router.delete('/delete/:id',ControllerToken.RoleKhach,Controller.delete);
module.exports= Router;