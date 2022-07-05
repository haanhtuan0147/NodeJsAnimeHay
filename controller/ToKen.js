const Service=require('../service/createtoken')
const BaseController =require('./BaseController');
const baseController = new BaseController();
exports.CreateToken =async (req, res, next) => {
            const userId = req.user;
            //console.log(userId)
             await Service.CreateToken01(userId).then((result)=>{
                baseController.sendResponse(result, req, res.status(200))
            }
            ).catch((err)=>{
                baseController.sendResponse(err, req, res.status(500))
            })

}
exports.CheckToKenTime=async (req, res, next) => {
        let author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        Service.CheckToKenTime(token).then(()=>{
            next()
        }).catch((err)=>{
            res.status(401).json(err)
        })
}
exports.RoleRoot = (req,res,next) => {
        const author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        Service.RoleRoot(token)
            .then(() => {
                next();
            })
            .catch((err) => {
                res.status(403).json(err)
            })
}
exports.RoleKhach = (req,res,next) => {
    const author = req.headers['authorization'];
    const token = author?.split(" ")[1];
    Service.RoleKhach(token)
        .then(() => {
            next();
        })
        .catch((err) => {
            res.status(403).json(err)
        })
    }
    exports.RoleAdmin = (req,res,next) => {
        const author = req.headers['authorization'];
        const token = author?.split(" ")[1];
        Service.RoleAdmin(token)
            .then(() => {
                next();
            })
            .catch((err) => {
                res.status(403).json(err)
            })
        }
