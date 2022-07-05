const Account=require('../repository/Account')
const Repository = new Account();
const TimeOnline=require('../repository/TimeOnline')
const Repository1 = new TimeOnline();
const leve=require('../repository/Leve')
const leve01=new leve()
const messagerAccount=require('../repository/MessegaAccount')
const messagerAccount01=new messagerAccount()
const {v4}=require('uuid')
const dotenv=require('dotenv')
const jwt =require('jsonwebtoken');
dotenv.config()
const AdminToKen=require('../repository/ToKen');
const TokenService=require('./createtoken');



module.exports =class Account {
     findAll = async () => {
        try {
        const rs = await Repository.findAll();
        return Promise.resolve({result : rs})
    } catch (error) {
        return Promise.reject({messager :error} )
    }
    }
     create = async (item) => {
        try {
            if(Object.keys(item).length==0)
            return Promise.reject({ messager : "fail! create",});
            const rs = await Repository.create(item);
            if(rs) {
                return Promise.resolve({
                messager : "Sucsuess",
                Item:item
            })
            }
        return Promise.reject({messager : "Create Faild "});
        } catch (error) {
            return Promise.reject({messager : "Create Faild "});
        }
        
    }
     update = async (id, item) => {
        try{
        const rs = await Repository.update(id, item);
        if (rs) {
            return Promise.resolve({ messager: "Sucsess" })
           
        }
        return Promise.reject({ messager: "Update Faild" })
    } catch (error) {
        return Promise.reject({ messager: "Update Faild" } )
    }
    }
    updateUser= async (token, item) => {
        try{
        const checkToken=jwt.verify(token,process.env.ACCES_TOKENLINK,(err,decode)=>{
            if(decode)
            return decode;
            //return Promise.reject({Message:"Symbols Do Not Exist"});
        });
        //console.log(item)
        delete item.Id;
        delete item.Email;
        delete item.Leve;
        delete item.Experience;
        delete item.Symbol;
        if(item.Password){
            item.Password=await TokenService.CreateToken({Email:checkToken.Email,Password:item.Password},process.env.ACCES_TOKENUSERID);
        }
        const rs = await Repository.update(checkToken.Id, item);
        if (rs) {
            return Promise.resolve({ messager: "Sucsess" })
           
        }
        return Promise.reject({ messager: "Update Faild" })
    } catch (error) {
        return Promise.reject({ messager: "Update Faild" } )
    }
    }
     delete = async (id) => {
         try{
        const rs = await Repository.delete(id)
        if (rs == 0) {
            return Promise.reject({ messager: "Delete Faild" })
        }
        return Promise.resolve({messager : "Sucsuess"})
    } catch (error) {
        return Promise.reject({ messager: "Delete Faild" } )
    }
    }

     findOne = async (id,token) => {
        try {
            const checkToken=jwt.verify(token,process.env.ACCES_TOKENLINK,(err,decode)=>{
                if(decode)
                return decode;
                //return Promise.reject({Message:"Symbols Do Not Exist"});
            });
            if(checkToken.Symbol==="Khach"&&id!=checkToken.Id)
            return Promise.reject({messager:"Tài khoản Không đủ quyền hạn"})
            const rs  = await Repository.findOne(id);
            return Promise.resolve({result:rs})
        } catch (error) {
            return Promise.reject({ messager: " Account not exists ! "  } )
        }
    }
    findUser= async (token) => {
        try {
            const checkToken=jwt.verify(token,process.env.ACCES_TOKENLINK,(err,decode)=>{
                if(decode)
                return decode;
                //return Promise.reject({Message:"Symbols Do Not Exist"});
            });
            const rs  = await Repository.findOne(checkToken.Id);
            return Promise.resolve({result:rs})
        } catch (error) {
            return Promise.reject({ messager: " Account not exists ! "  } )
        }
    }

     findItem = async (item) => {
         try {
            const rs = await Repository.findItem(item);
            return Promise.resolve({result : rs})
             
         } catch (error) {
            return Promise.reject({messager :"Not Found"})
         }

    }
    CountExp=async (Id) => {
        try {
            const Acc=await Repository.findItem({Id:Id});
            if(Object.keys(Acc).length!=0){
                var px=Number(Acc[0].Experience)+Number(process.env.EXP)
                var pxs=Number(Acc[0].Leve)+1
                const lv=await leve01.findItem({Leve:pxs})
                var pxst=Number(lv[0].Experience)
                if(px>=pxst){
                    await Repository.update(Id,{Experience:(px-pxst),Leve:pxs})
                    await messagerAccount01.create({Id:`MessegaAccount-${v4()}`,IdAccount:Id,Message:`Bạn Đã Thăng Lên Cấp ${pxs}`})
                    return Promise.resolve({messager:`Bạn Đã Thăng Lên Cấp ${pxs}`,status:1})

                }
                else{
                    await Repository.update(Id,{Experience:px})
                    await messagerAccount01.create({Id:`MessegaAccount-${v4()}`,IdAccount:Id,Message:`Bạn Đã Được Cộng ${process.env.EXP} exp`})
                    return Promise.resolve({messager:`Bạn Đã Được Cộng ${process.env.EXP} exp`,status:1})

                }
            }
            return Promise.reject({messager:"Không Có tài khoản"})
        } catch (error) {
            return Promise.reject({messager:error})
        }

    }
    ExpFrit=async(OJES,date)=>{
        try {
            const Acc= await Repository.findItem({Email:OJES})
            if(Object.keys(Acc).length==0) return Promise.reject({Message:"Không Tồn Tại Email"})
            //console.log('vào Đây')
            const select= await AdminToKen.FindOneDay(Acc[0].Id,date);
            //console.log(select)
            if(Object.keys(select).length==0){
                this.CountExp(Acc[0].Id).then(()=>{
                    return Promise.resolve()
                }).catch((error)=>{
                    return Promise.reject(error)
                })
            }
            return Promise.resolve()
        } catch (error) {
            return Promise.reject({Message:error})
        }
        
        }
    CountDate= async(token,date)=>{
            try {
                const checkToken=jwt.verify(token,process.env.ACCES_TOKENLINK,(err,decode)=>{
                    if(decode.Id)
                    return decode.Id;
                });
                const rs = await Repository1.findatetime5(checkToken,date);
                var dates=0;
                dates=Math.floor(Number(rs[0].Time)/60)
                if(dates==0)
                return Promise.resolve({messager:"online thành công",status:0})
                else
                {
                    
                    for(var i=1;i<13;i++)
                    {
                        if(i==dates&&rs[0].Count<i){
                            await Repository1.update(rs[0].Id,{Count:i})
                            return await this.CountExp(checkToken).then((result)=>{return Promise.resolve({result})}).catch((error)=>{
                                return Promise.reject({messager:error})
                            })
                        }
                        if(i==dates&&rs[0].Count==i)
                        {
                            return Promise.resolve({messager:"online thành công",status:0})
                        }
                    }
                }
               
                
            } catch (error) {
                return Promise.reject({messager:error})
            }
    
        }
}