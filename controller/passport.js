
const passport =require("passport");
const AccountService =require('../service/createtoken')
const localStrategy = require('passport-local').Strategy;
 passport.use(new localStrategy(async (username, password, done) => {
  await AccountService.CheckToKenPass(username, password).then((rs)=>{
    return done(null, rs)
  }).catch((er)=>{
    return done(null, er)
  }); //truy vấn db
}
))
 passport.serializeUser((user, done) => {
    done(null, user); //lấy dữ liệu từ return done done(null, authenticated_user)
})

  passport.deserializeUser(async (username, done) => { //hàm giải mã định dạng
    done(null, username)
})
exports.Authenticate =(req, res, next) => {
    passport.authenticate('local', async(err, user) => {
        
    if (user.message) return res.status(401).json({ message: user.message});
    else {
        //res.json(user.Email)
        req.user =user.Email;
        next();
    }
})(req, res, next)
}