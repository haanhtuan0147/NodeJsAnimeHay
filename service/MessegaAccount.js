const MessegaAccount=require('../repository/MessegaAccount')
const Repository = new MessegaAccount();
const dotenv=require('dotenv')
dotenv.config()
const jwt =require('jsonwebtoken');


module.exports =class MessegaAccount {
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
    updateActive= async (id, token) => {
        try{
        const checkToken=jwt.verify(token,process.env.ACCES_TOKENLINK,(err,decode)=>{
            if(decode.Id)
            return decode.Id;
            //return Promise.reject({Message:"Symbols Do Not Exist"});
        });
        const rs1 = await Repository.findItem({Id:id,IdAccount:checkToken});
        if(Object.keys(rs1).length===0)
        return Promise.reject({ messager: "Update Faild" })
        const rs = await Repository.update(id, {Active:1});
        //console.log(rs)
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
            return Promise.reject({ messager: " MessegaAccount not exists ! "  } )
        }
    }


     findItem = async (item,token) => {
         try {
            const checkToken=jwt.verify(token,process.env.ACCES_TOKENLINK,(err,decode)=>{
                if(decode)
                return decode;
                //return Promise.reject({Message:"Symbols Do Not Exist"});
            });
            console.log(checkToken)
            if(checkToken.Symbol==="Khach")
            item.IdAccount= checkToken.Id
            else{
                if(!item.IdAccount)
                item.IdAccount=checkToken.Id
            }
            const rs = await Repository.findItem(item);
            return Promise.resolve({result : rs})
             
         } catch (error) {
            return Promise.reject({messager :"Not Found"})
         }

    }




}