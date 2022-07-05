const Follow=require('../repository/Follow')
const Repository = new Follow();
const jwt =require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config()


module.exports =class Follow {
    findAll = async () => {
        try {
        const rs = await Repository.findAll();
        return Promise.resolve({result : rs})
    } catch (error) {
        return Promise.reject({messager :error} )
    }
    }
     create = async (item,token) => {
        try {

            const checkToken=jwt.verify(token,process.env.ACCES_TOKENLINK,(err,decode)=>{
                if(decode.Id)
                return decode.Id;
                //return Promise.reject({Message:"Symbols Do Not Exist"});
            });
            const rs1 = await Repository.findItem({IdAccount:checkToken,IdAnime:item.IdAnime});
            if(Object.keys(rs1).length!=0)
            return Promise.reject({messager : "Create Faild "});
            item.IdAccount=checkToken
            console.log(item)
            const rs = await Repository.create(item);
            if(rs) {
                return Promise.resolve({
                messager : "Sucsuess",
                Item:item
            })
            }
        return Promise.reject({messager : "Create Faild "});
        } catch (error) {
            console.log(error)
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
     delete = async (id,token) => {
         try{
        const timkiem  = await Repository.findOne(id);
        const checkToken=jwt.verify(token,process.env.ACCES_TOKENLINK,(err,decode)=>{
            if(decode.Id)
            return decode.Id;
            //return Promise.reject({Message:"Symbols Do Not Exist"});
        });
        if(checkToken!=timkiem[0].IdAccount)
        return Promise.reject({ messager: "Bạn Không Có Quyền Xóa" } )
        const rs = await Repository.delete(id)
        if (rs == 0) {
            return Promise.reject({ messager: "Delete Faild" })
        }
        return Promise.resolve({messager : "Sucsuess"})
    } catch (error) {
        return Promise.reject({ messager: "Delete Faild" } )
    }
    }

     findOne = async (id) => {
        try {
            const rs  = await Repository.findOne(id);
                return Promise.resolve({result : rs})
        } catch (error) {
            return Promise.reject({ messager: " Follow not exists ! "  } )
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
    findUser= async (token) => {
        try {
            const checkToken=jwt.verify(token,process.env.ACCES_TOKENLINK,(err,decode)=>{
                if(decode.Id)
                return decode.Id;
                //return Promise.reject({Message:"Symbols Do Not Exist"});
            });
           const rs = await Repository.findUser(checkToken);
           return Promise.resolve({result : rs})
            
        } catch (error) {
           return Promise.reject({messager :error})
        }

   }
   findUserOne= async (Id,token) => {
    try {
        const checkToken=jwt.verify(token,process.env.ACCES_TOKENLINK,(err,decode)=>{
            if(decode.Id)
            return decode.Id;
            //return Promise.reject({Message:"Symbols Do Not Exist"});
        });
        
       const rs = await Repository.findItem({IdAccount:checkToken,IdAnime:Id});
       console.log(">>>>>>>>>>..",rs)
       return Promise.resolve({result : rs})
        
    } catch (error) {
       return Promise.reject({messager :error})
    }

}



}