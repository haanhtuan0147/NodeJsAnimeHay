const {v4} = require('uuid');
const BaseController =require('./BaseController');
const baseController = new BaseController();
const Service=require('../service/Episode')
const service = new Service();
module.exports=class Episode {

    findAll = (req, res, next) => {

        service.findAll()
        .then(result => {
            baseController.sendResponse(result, req, res.status(200));
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
}

     create =  (req, res, next) => {
        const item = req.body;
        item.Id = "Episode-"+v4();
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
        const item = req.query;
        service.findItem(item)
        .then(result => {
            baseController.sendResponse(result, req, res.status(200));
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }
    findItemdis=  (req, res, next) => {
        const item = req.query;
        service.findItemdis(item)
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
    EpisodeCountAnime =  (req, res, next) => {
        const item = req.params.id;
        service.EpisodeCountAnime(item)
        .then(result => {
            baseController.sendResponse(result, req, res.status(200));
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }
    EpisodeSever =  (req, res, next) => {
        const item = req.query;
        service.EpisodeSever(item)
        .then(result => {
            baseController.sendResponse(result, req, res.status(200));
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }
    ListSever =  (req, res, next) => {
        const item = req.query;
        service.ListSever(item)
        .then(result => {
            baseController.sendResponse(result, req, res.status(200));
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }
}