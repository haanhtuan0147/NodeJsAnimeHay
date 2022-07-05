const BaseController =require('./BaseController');
const baseController = new BaseController();
const Service=require('../service/Checkfile')
//const service = new Service();
exports.Checkfile=(req, res, next) => {
    try {
        Service.upload(req, res)
        
    } catch (error) {
        res.status(500).json({Message:error})
    }

    }
exports.UploadVi=(req, res, next) => {
    try {
        Service.UploadVi(req, res)
        
    } catch (error) {
        res.status(500).json({Message:error})
    }

    }
