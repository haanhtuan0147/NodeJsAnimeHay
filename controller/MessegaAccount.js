const {v4} = require('uuid');
const BaseController =require('./BaseController');
const baseController = new BaseController();
const Service=require('../service/MessegaAccount')
const service = new Service();
module.exports=class MessegaAccount {

    findAll = (req, res, next) => {

        service.findAll()
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
}

     create =  (req, res, next) => {
        const item = req.body;
        item.Id = "MessegaAccount-"+v4();
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

    findOne =  (req, res, next) => {
        let author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        const id = req.params.id;
        service.findOne(id,token)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }
    findItem =  (req, res, next) => {
        const item = req.body;
        let author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        service.findItem(item,token)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }
    updateActive =  (req, res, next) => {
        const id = req.params.id;
        let author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        service.updateActive(id, token)
        .then(result => {
            baseController.sendResponse(result, req, res);
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }

    delete = (req, res, next) => {
        const id = req.params.id;
        service.delete(id)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }
    findUserNumber= (req, res, next) => {
        let author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        const item = {
            Active:0
        };

        service.findItem(item,token)
            .then(result => {
                baseController.sendResponse({result:Object.keys(result.result).length}, req, res);
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }  
}
