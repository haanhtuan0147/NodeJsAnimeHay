const express =require('express');
const Router =express();
const bodyParser=require('body-parser');
const AccountController=require('../controller/Account');
const Controller = new AccountController();
const ControllerToken=require('../controller/ToKen')
const ControllerGamil=new (require('../controller/CheckGmail'))()


Router.use(express.json());
Router.use(bodyParser.urlencoded({ extended: true }));

        Router.get('/findAll',ControllerToken.RoleAdmin,Controller.findAll);
        Router.get('/findOne/:id',ControllerToken.RoleKhach,Controller.findOne);
        Router.get('/findItem',ControllerToken.RoleAdmin,Controller.findItem);
        Router.get('/findUser',ControllerToken.RoleKhach,Controller.findUser);

        Router.post('/Register',ControllerGamil.CheckNumberRegisterToken,Controller.Register);
        Router.post('/create',ControllerToken.RoleRoot,Controller.create);
        Router.put('/update/:id',ControllerToken.RoleRoot,Controller.update);
        Router.put('/updateUser',ControllerToken.RoleKhach,Controller.updateUser);
        Router.delete('/delete/:id',ControllerToken.RoleRoot,Controller.delete);
module.exports= Router;