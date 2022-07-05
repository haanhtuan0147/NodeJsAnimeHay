const express =require('express');
const Router =express();
const bodyParser=require('body-parser');
const LeveController=require('../controller/leve');
const Controller = new LeveController();


Router.use(express.json());
Router.use(bodyParser.urlencoded({ extended: true }));

Router.get('/findAll', Controller.findAll);
        Router.get('/findOne/:id', Controller.findOne);
        Router.get('/findItem', Controller.findItem);

        Router.post('/create', Controller.create);
        Router.put('/update/:id', Controller.update);
        Router.delete('/delete/:id', Controller.delete);
module.exports= Router;
/*module.exports=class routers{
   Router;
    constructor() {
        this.Router = Router;
        this.routers();
        this.config();
    }

    routers() {
        this.Router.get('/findAll', Controller.findAll);
        this.Router.get('/findOne/:id', Controller.findOne);
        this.Router.get('/findItem', Controller.findItem);

        this.Router.post('/create', Controller.create);
        this.Router.put('/update/:id', Controller.update);
        this.Router.delete('/delete/:id', Controller.delete);
    }

    config() {
        this.Router.use(express.json());
        this.Router.use(bodyParser.urlencoded({ extended: true }));
    }
}*/
