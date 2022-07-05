const {v4} = require('uuid');
const BaseController =require('./BaseController');
const baseController = new BaseController();
const Service=require('../service/Follow')
const service = new Service();
module.exports=class Follow {

    findAll = (req, res, next) => {

        service.findAll()
        .then(result => {
                            baseController.sendResponse(result, req, res.status(200));

        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
}

     create =  (req, res, next) => {
        const author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        const item = req.body;
        item.Id = "Follow-"+v4();
        service.create(item,token)
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
        const item = req.query;
        service.findItem(item)
        .then(result => {
                            baseController.sendResponse(result, req, res.status(200));

        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }

    delete = (req, res, next) => {
        const author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        const id = req.params.id;
        service.delete(id,token)
            .then(result => {
                baseController.sendResponse(result, req, res.status(200));
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }
    findUser=  (req, res, next) => {
        const author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        service.findUser(token)
        .then(result => {
            baseController.sendResponse(result, req, res.status(200));
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }
    findUserOne=  (req, res, next) => {
        const author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        const IdAnime = req.query.IdAnime;
        service.findUserOne(IdAnime,token)
        .then(result => {
            baseController.sendResponse(result, req, res.status(200));
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }
}