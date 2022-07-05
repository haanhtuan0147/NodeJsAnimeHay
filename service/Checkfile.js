
const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const dotenv=require('dotenv')
dotenv.config()
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) 
      cb(null, filename + '-' + file.originalname )
  },
});
let uploadFile = multer({
  storage: storage,
  fileFilter:(req,file,cb) =>{
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
        req.file_error = "file not allowed";
        return cb(null,false);
    }
    cb(null, true);
},
  limits: { fileSize: maxSize },
}).single("file");
let uploadFileMiddleware = util.promisify(uploadFile);
exports.uploadFileMiddleware= uploadFileMiddleware;
////
let storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file)
    cb(null, __basedir + "/UploadVideo/");
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) 
      cb(null, filename + '-' + file.originalname )
  },
});
let UploadVideo = multer({
  storage: storage1,
  fileFilter:(req,file,cb) =>{
    if (file.mimetype !== 'video/mp4') {
        req.file_error = "file not allowed";
        return cb(null,false);
    }
    cb(null, true);
},
}).single("file");
let UploadVideoMiddleware= util.promisify(UploadVideo);
exports.UploadVideoMiddleware= UploadVideoMiddleware;
////
const upload = async (req, res) => {
    try {
      await uploadFileMiddleware(req, res);
      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
      res.status(200).send({
        message:process.env.linkweb+"uploadsImage/"+req.file.filename,
      });
    } catch (err) {
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
    }
  };
exports.upload = upload;
const UploadVi = async (req, res) => {
  try {
    await UploadVideoMiddleware(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    res.status(200).send({
      message:process.env.linkweb+"uploadsVideo/"+req.file.filename,
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file}. ${err}`,
    });
  }
};
exports.UploadVi = UploadVi;
/*module.exports =class Checkfile {
    Checkfile = async (file) => {
         if(!file){
             return Promise.reject({Message:"Lỗi file rỗng"})
         }
        return Promise.resolve()
    }

}*/