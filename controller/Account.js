const {v4} = require('uuid');
const BaseController =require('./BaseController');
const baseController = new BaseController();
const Service=require('../service/Account')
const service = new Service();
const TokenService=require('../service/createtoken');
module.exports=class Account {

    findAll = (req, res, next) => {
        service.findAll()
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }

     create =  async(req, res, next) => {
        const item = req.body;
        var pass=item.Password;
        item.Id="Account-"+v4();
        item.Password=await TokenService.CreateToken({Email:item.Email,Password:pass},process.env.ACCES_TOKENUSERID)
        service.create(item)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }

     update =  (req, res, next) => {
        const item = req.body;
        const id = req.params.id;
        item.UpDate = new Date();
        service.update(id, item)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }
    updateUser =  (req, res, next) => {
        const item = req.body;
        const author = req.headers['authorization'];
        const token = author?.split(" ")[1];      
        service.updateUser(token, item)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }

    findOne =  (req, res, next) => {
        const id = req.params.id;
        const author = req.headers['authorization'];
        const token = author?.split(" ")[1];      
        service.findOne(id,token)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }
    findItem =  (req, res, next) => {
        const item = req.body;
        service.findItem(item)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }
    findUser=async(req, res, next) => {
        const author = req.headers['authorization'];
        const token = author?.split(" ")[1];      
        service.findUser(token)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }
    Register=  async(req, res, next) => {
        const item = req.body;
        delete item.NumberAcces;
        item.Symbol="Khach";
        var pass=item.Password;
        item.Id="Account-"+v4();
        item.Password=await TokenService.CreateToken({Email:item.Email,Password:pass},process.env.ACCES_TOKENUSERID)
        service.create(item)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }

    delete = (req, res, next) => {
        const id = req.params.id;
        const author = req.headers['authorization'];
        const token = author?.split(" ")[1];   
        service.delete(id,token)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }
    ExpFrit = (req, res, next) => {
        const userId = req.user;
        const date=new Date();
        service.ExpFrit(userId,date)
            .then(next())
            .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }
    CountDate = (req, res, next) => {
        const date=new Date();
        const author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        service.CountDate(token,date)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(500)); });            
        
    }
}
