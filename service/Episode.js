const Episode=require('../repository/Episode')
const Repository = new Episode();


module.exports =class Episode {
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
            return Promise.resolve({result : rs})
        } catch (error) {
            return Promise.reject({ messager: " Episode not exists ! "  } )
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
    findItemdis = async (item) => {
        try {
           const rs = await Repository.findItemdis(item);
           return Promise.resolve({result : rs})
            
        } catch (error) {
           return Promise.reject({messager :error})
        }

   }
    EpisodeCountAnime = async (item) => {
        try {
            const rs = await Repository.EpisodeCountAnime(item);
        return Promise.resolve({result : rs})
            
        } catch (error) {
            return Promise.reject({messager :"Not Found Episode"})
        }
        
    }
    EpisodeSever = async (item) => {
        try {
        const rs = await Repository.EpisodeSever(item.IdAnime,item.IdServer,item.EpisodeNumber);
        await Repository.update(rs[0].Id,{NumberView:rs[0].NumberView+1});
        return Promise.resolve({result : rs})
    } catch (error) {
        if(error.sqlMessage)
        return Promise.reject({messager :error.sqlMessage})
        else
        return {messager :error}
    }
    }
    ListSever = async (item) => {
        try {
        const rs = await Repository.ListSever(item.IdAnime,item.EpisodeNumber);
        return Promise.resolve({result : rs})
    } catch (error) {
        return Promise.reject({messager :"Not Found ListSever"})
    }
    }



}