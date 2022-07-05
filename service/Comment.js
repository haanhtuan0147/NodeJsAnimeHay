const Commenttext=require('../repository/Comment')
const Repository = new Commenttext();
const FeedBack=require('../repository/FeedBack')
const RepositoryFeedBack = new FeedBack();
const dotenv=require('dotenv')
const jwt =require('jsonwebtoken');
dotenv.config()


module.exports =class Commenttext {
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
     create = async (item,token) => {
        try {
            const checkToken=jwt.verify(token,process.env.ACCES_TOKENLINK,(err,decode)=>{
                if(decode.Id)
                return decode.Id;
            });
            item.IdAccount=checkToken
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
                return Promise.reject({ messager: " Comment not exists ! "  });
            }
            if (rs) {
                return Promise.resolve(rs)
            }
        } catch (error) {
            return Promise.reject({ messager: " Comment not exists ! "  } )
        }
    }


     findItem = async (item) => {
         try {
            const rs = await Repository.findItem(item);
            return Promise.resolve({result : rs,number:rs.length})
         } catch (error) {
            return Promise.reject({messager :"Not Found"})
         }

    }
    findpage = async (item) => {
        try {
        let rs = await Repository.findpage(item.IdAnime,Number(item.end));
        const r1 = await Repository.findItem({IdAnime:item.IdAnime});
        for(var i=0;i<Object.keys(rs).length;i++)
        {
            rs[i].FeedBack=await RepositoryFeedBack.findcomment(rs[i].Id)
        }
        return Promise.resolve({result : rs,number:r1.length})
    } catch (error) {
        return Promise.reject({messager :error})
     }
    }



}