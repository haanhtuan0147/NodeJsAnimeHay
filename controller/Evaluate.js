const {v4} = require('uuid');
const BaseController =require('./BaseController');
const baseController = new BaseController();
const Service=require('../service/Evaluate');
const { DATE } = require('mysql/lib/protocol/constants/types');
const service = new Service();
module.exports=class Evaluate {

    findAll = (req, res, next) => {

        service.findAll()
        .then(result => {
            baseController.sendResponse(result, req, res.status(200));
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
}

     create =  (req, res, next) => {
        const item = req.body;
        item.Id = "Evaluate-"+v4();
        service.create(item)
        .then(result => {
            baseController.sendResponse(result, req, res.status(200));
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }

     update =  (req, res, next) => {
        const item = req.body;
        const id = req.params.id;
        item.UpDate = new Date();
        service.update(id, item)
        .then(result => {
            baseController.sendResponse(result, req, res.status(200));
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }

    findOne =  (req, res, next) => {
        const id = req.params.id;
        service.findOne(id)
        .then(result => {
            baseController.sendResponse(result, req, res.status(200));
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }
    findItem =  (req, res, next) => {
        const item = req.body;
        service.findItem(item)
        .then(result => {
            baseController.sendResponse(result, req, res.status(200));
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }
    findevaluateAnime=  (req, res, next) => {
        const id = req.params.id;
        service.findevaluateAnime(id)
        .then(result => {
            baseController.sendResponse(result, req, res.status(200));
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }
    findevaluateAnimeAccount=  (req, res, next) => {
        const author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        const id = req.params.id;
        service.findevaluateAnimeAccount(id,token)
        .then(result => {
            baseController.sendResponse(result, req, res.status(200));
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }

    delete = (req, res, next) => {
        const id = req.params.id;
        service.delete(id)
            .then(result => {
                baseController.sendResponse(result, req, res.status(200));
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }
    CreateAndUpDate=  (req, res, next) => {
        const item = req.body;
        const author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        const UpDate = new Date();
        const id="Evaluate-"+v4();
        service.CreateAndUpDate(id,item,UpDate,token)
        .then(result => {
            baseController.sendResponse(result, req, res.status(200));
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }
}