const express =require('express');
const Router =express();
const bodyParser=require('body-parser');
const MessegaAccountController=require('../controller/MessegaAccount');
const Controller = new MessegaAccountController();
const ControllerToken=require('../controller/ToKen')


Router.use(express.json());
Router.use(bodyParser.urlencoded({ extended: true }));

Router.get('/findAll',ControllerToken.RoleAdmin ,Controller.findAll);
        Router.get('/findOne/:id',ControllerToken.RoleKhach,Controller.findOne);
        Router.get('/findItem',ControllerToken.RoleKhach,Controller.findItem);
        Router.get('/findUserNumber',ControllerToken.RoleKhach,Controller.findUserNumber);

        Router.post('/create',ControllerToken.RoleRoot,Controller.create);
        Router.put('/update/:id',ControllerToken.RoleRoot,Controller.update);
        Router.put('/updateActive/:id',ControllerToken.RoleKhach,Controller.updateActive);
        Router.delete('/delete/:id',ControllerToken.RoleRoot,Controller.delete);
module.exports= Router;