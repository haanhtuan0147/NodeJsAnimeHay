const Evaluate=require('../repository/Evaluate')
const Repository = new Evaluate();
const jwt =require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config()


module.exports =class Evaluate {
    findAll = async () => {
        try {
        const rs = await Repository.findAll();
        if (Object.keys(rs).length == 0) {
            return Promise.reject({messager :"Not Found"} )
        }
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

     findOne = async (id) => {
        try {
            const rs  = await Repository.findOne(id);
            if (Object.keys(rs).length == 0) {
                return Promise.reject({ messager: " Evaluate not exists ! "  });
            }
            if (rs) {
                return Promise.resolve(rs)
            }
        } catch (error) {
            return Promise.reject({ messager: " Evaluate not exists ! "  } )
        }
    }


     findItem = async (item) => {
         try {
            const rs = await Repository.findItem(item);
            if (Object.keys(rs).length == 0) {
                return Promise.reject({messager :"Not Found"} )
            }
            return Promise.resolve({result : rs})
             
         } catch (error) {
            return Promise.reject({messager :"Not Found"})
         }

    }
    findevaluateAnime= async (id) => {
        try {
           const rs = await Repository.findevaluateAnime(id);
           if (Object.keys(rs).length == 0) {
            return Promise.resolve({result :{NumberEvaluate:0}})
           }
           return Promise.resolve({result : rs})
            
        } catch (error) {
           return Promise.reject({messager :"Not Found"})
        }

   }
   findevaluateAnimeAccount= async (id,token) => {
    try {
        const checkToken=jwt.verify(token,process.env.ACCES_TOKENLINK,(err,decode)=>{
            if(decode.Id)
            return decode.Id;
        });
       const rs = await Repository.findItem({IdAnime:id,IdAccount:checkToken});
       if (Object.keys(rs).length == 0) {
        return Promise.resolve({result :0})
       }
       return Promise.resolve({result : rs[0].Scores})
        
    } catch (error) {
       return Promise.reject({messager :"Not Found"})
    }

    }
    CreateAndUpDate= async (id,item,UpDate,token) => {
        try {
            const checkToken=jwt.verify(token,process.env.ACCES_TOKENLINK,(err,decode)=>{
                if(decode.Id)
                return decode.Id;
            });
            const rst=await Repository.findItem({IdAccount:checkToken,IdAnime:item.IdAnime})
            if(Object.keys(rst).length==0){
                item.Id=id
                this.create(item)
                return Promise.resolve({messager:"Sucsuess create"})
            }
            else
            {
                //console.log(rst,item.Scores,UpDate)
                this.update(rst[0].Id,{Scores:item.Scores,UpDate:UpDate})
                return Promise.resolve({messager:"Sucsuess Update"})
            }
        } catch (error) {
            return Promise.reject({messager:"failure CreateAndUpDate"});
        }
    }


}