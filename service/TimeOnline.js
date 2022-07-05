
const TimeOnline=require('../repository/TimeOnline')
const Repository = new TimeOnline();
const Account=require('../repository/Account')
const Repository1 = new Account();
const jwt =require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config()
module.exports =class TimeOnline {
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
                return Promise.reject({ messager: " TimeOnline not exists ! "  });
            }
            if (rs) {
                return Promise.resolve(rs)
            }
        } catch (error) {
            return Promise.reject({ messager: " TimeOnline not exists ! "  } )
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
    findatetime5= async (time,date,uuid,token) => {
        try {
            const checkToken=jwt.verify(token,process.env.ACCES_TOKENLINK,(err,decode)=>{
                if(decode.Id)
                return decode.Id;
            });
            const Acc=await Repository1.findItem({Id:checkToken})
            if(Object.keys(Acc).length==0) return Promise.reject({messager:"Id Incorrect ?"})
            const rs = await Repository.findatetime5(checkToken,date);
            //console.log(rs)
            if (Object.keys(rs).length==0) {
                //console.log("vào đây 1")
                await Repository.create({Id:uuid,IdAccount:checkToken,Time:time})
                return Promise.resolve()
            }
            else{
                //console.log("vào đây 2")
                await Repository.update(rs[0].Id,{Time:Number(rs[0].Time)+Number(time)})
                return Promise.resolve()
            }
            
        } catch (error) {
            return Promise.reject({messager:"The input parameter is incorrect"})
        }

    }
}