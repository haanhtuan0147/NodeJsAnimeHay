const {v4} = require('uuid');
const BaseController =require('./BaseController');
const baseController = new BaseController();
const Service=require('../service/Gmail')
const service = new Service();
module.exports=class Gmail{
    Gmail = (req, res, next) => {
        var item =req.body
        item.Id="Gmail-"+v4();
        service.Gmail(item)
        .then(result => {
            baseController.sendResponse(result, req, res.status(200));
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }
    CheckNumberRegisterToken=(req, res, next) => {
        var item =req.body
        service.CheckNumberRegisterToken(item)
        .then(result => {
            next()
        })
        .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }
}
