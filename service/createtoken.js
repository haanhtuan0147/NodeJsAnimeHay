const {v4}=require('uuid')
const jwt =require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config()
const Account=require("../repository/Account")
const Account01=new Account();
const AdminToKen=require('../repository/ToKen');

exports.CreateToken=async (OJES,acce)=> {
    // set thời gian hoạt động bằng 3 tiếng
        const token=await jwt.sign({OJES},acce);
        return token;
}
exports.CreateToken01=async (OJES)=> {
    try {
        const Acc=await Account01.findItem({Email:OJES});
        if(Object.keys(Acc).length==0) return Promise.reject({Message:"Token generation error"})
        const token=jwt.sign({Id:Acc[0].Id,Symbol:Acc[0].Symbol},process.env.ACCES_TOKENLINK);
        const item={
            Id:"ToKen-"+v4(),
            ToKen:token,
            IdAccount:Acc[0].Id
        }
        const createToken= await AdminToKen.CreateToken(item);
        delete Acc.Password
        delete Acc.Id
        if(createToken)
        return Promise.resolve({Message:"Success",ToKen:token,Account:Acc[0]});
        return Promise.reject({Message:"Add Defective Token"})
        
    } catch (error) {
        console.log("Lỗi")
        return Promise.reject({Message:"Add Defective Token"})
    }
       
}
async function resfresh(select,date){
    try {
        const update=await AdminToKen.Update(select[0].Id,{UpDate:date})
        if(update){
            return Promise.resolve();
        }
        return Promise.reject({Message:"Token Not Generated"});
        
    } catch (error) {
        return Promise.reject({Message:"Token Not Generated"});
    }
 
}
exports.CheckToKenTime=async(token)=>{
    try {
            //if(token==undefined) return Promise.reject({Message:"Token Rỗng"});
            const select= await AdminToKen.SelectToken({ToKen:token});
            //console.log(select)
            if(Object.keys(select).length==0)
            return Promise.reject({Message:"Token Does Not Exist!"});
            const date=new Date();
            const date2=new Date(select.Update)    
            if(date.getTime()>date2.getTime()+10800000)
            return Promise.reject({Message:"Token Expired!"});
            if(date.getTime()+7200000>date2.getTime()+10800000)
            {
                return resfresh(select,date);
                        
            }
            return Promise.resolve();
        } catch (error) {
            return Promise.reject({Message:"Token Does Not Exist!"})
        }
}

exports.CheckToKenPass=async(Email,Password)=>{
    try {
        const email={
            Email:Email
        }
        const token=await Account01.findItem(email);
        //console.log(await token.result[0].Password);
        if (Object.keys(token).length == 0) {
            return Promise.reject({message:"Không Tồn tại Email Này"});
        }
            const pass=await token[0].Password;
            const checkToken=jwt.verify(pass,process.env.ACCES_TOKENUSERID,(err,decode)=>{
            if(decode.OJES.Password)
            return decode.OJES.Password;
            return false
            });
        if(!checkToken)
        return Promise.reject({message:"Lấy PassWord Thất Bại"});
        if(Password==checkToken){
            
            return Promise.resolve({Email:Email,Password:pass})
        }
        return Promise.reject({message:"PassWord Bạn Sai"});
        
    } catch (error) {
        return Promise.reject({message:"Cú Pháp Bạn Nhập Vào Sai"});
    }

}
exports.RoleRoot=async(token)=>{
    try {
    //if(token==undefined) return Promise.reject({Message:"Token Rỗng"});
    const select= await AdminToKen.SelectToken({ToKen:token});
    if(Object.keys(select).length==0)
    return Promise.reject({Message:"Token Does Not Exist!"});
    const checkToken=jwt.verify(token,process.env.ACCES_TOKENLINK,(err,decode)=>{
        if(decode.Symbol)
        return decode.Symbol;
        //return Promise.reject({Message:"Symbols Do Not Exist"});
    });
    if(checkToken=="Root")
        return Promise.resolve();
        return Promise.reject({Message:"You Are Insufficient"});
    } catch (error) {
        return Promise.reject({Message:"You Are Insufficient"})
    }
}
exports.RoleKhach=async(token)=>{
    try {
        //console.log("token",token)
    //if(token==undefined) return Promise.reject({Message:"Token Rỗng"});
    const select= await AdminToKen.SelectToken({ToKen:token});
    if(Object.keys(select).length==0)
    return Promise.reject({Message:"Token Does Not Exist!"});
    const checkToken=jwt.verify(token,process.env.ACCES_TOKENLINK,(err,decode)=>{
        if(decode.Symbol)
        return decode.Symbol;
        //return Promise.reject({Message:"Symbols Do Not Exist"});
    });
    if(checkToken=="Khach"||checkToken=="Admin"||checkToken=="Root")
    return Promise.resolve();
    return Promise.reject({Message:"You Are Insufficient"});
    } catch (error) {
        return Promise.reject({Message:"You Are Insufficient"})
    }
}
exports.RoleAdmin=async(token)=>{
    try {
    //if(token==undefined) return Promise.reject({Message:"Token Rỗng"});
    const select= await AdminToKen.SelectToken({ToKen:token});
    if(Object.keys(select).length==0)
    return Promise.reject({Message:"Token Does Not Exist!"});
    const checkToken=jwt.verify(token,process.env.ACCES_TOKENLINK,(err,decode)=>{
        if(decode.Symbol)
        return decode.Symbol;
        //return Promise.reject({Message:"Symbols Do Not Exist"});
    });
    if(checkToken=="Admin"||checkToken=="Root")
        return Promise.resolve();
        return Promise.reject({Message:"You Are Insufficient"});
    } catch (error) {
        return Promise.reject({Message:"You Are Insufficient"})
    }
}