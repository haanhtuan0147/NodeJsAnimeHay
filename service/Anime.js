const Anime=require('../repository/Anime')
const Repository = new Anime();


module.exports =class Anime {
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

     /*findOne = async (id) => {
        try {
            const rs  = await Repository.findOne(id);
            if (Object.keys(rs).length == 0) {
                return Promise.reject({ messager: " Anime not exists ! "  });
            }
            if (rs) {
                return Promise.resolve({result : rs})
            }
        } catch (error) {
            return Promise.reject({ messager: " Anime not exists ! "  } )
        }
    }*/
    findOne = async (id) => {
        try {
            const rs  = await Repository.finddetailone(id);
            if (Object.keys(rs).length == 0) {
                return Promise.reject({ messager: " Anime not exists ! "  });
            }
            if (rs) {
                return Promise.resolve({result : rs})
            }
        } catch (error) {
            return Promise.reject({ messager: error  } )
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
    FindNamecount = async (name) => {
        try {
        const rs = await Repository.FindNamecount(name);
        return Promise.resolve({result : rs})
    } catch (error) {
        return Promise.reject({messager :"Not Found Name Anime"})
     }
    }
    FindName= async (name) => {
        try {
        const rs = await Repository.FindName(name.name,name.sart,name.end);
        return Promise.resolve({result : rs})
    } catch (error) {
        return Promise.reject({messager :"Not Found Name Anime"})
     }
    }
    FindCategorycount = async (name) => {
        try {
        const rs = await Repository.FindCategorycount(name);
        if (Object.keys(rs).length == 0) {
            return Promise.reject({messager :"Not Found"} )
        }
        return Promise.resolve({result : rs})
    } catch (error) {
        return Promise.reject({messager :"Not Found Name Category"})
     }
    }
    FindCategory = async (name) => {
        try {
        const rs = await Repository.FindCategory(name.ListCategory,name.sart,name.end);
        if (Object.keys(rs).length == 0) {
            return Promise.reject({messager :"Not Found"} )
        }
        return Promise.resolve({result : rs})
    } catch (error) {
        return Promise.reject({messager :"Not Found Name Category"})
     }
    }
    Findyearcount = async (name) => {
        try {
        const rs = await Repository.Findyearcount(name);
        if (Object.keys(rs).length == 0) {
            return Promise.reject({messager :"Not Found"} )
        }
        return Promise.resolve({result : rs})
    } catch (error) {
        return Promise.reject({messager :"Not Found Year"})
     }
    }
    Findyear = async (name) => {
        try {
        const rs = await Repository.Findyear(name.year,name.sart,name.end);
        if (Object.keys(rs).length == 0) {
            return Promise.reject({messager :"Not Found"} )
        }
        return Promise.resolve({result : rs})
    } catch (error) {
        return Promise.reject({messager :"Not Found Year"})
     }
    }
    FindNLSYcount = async (name) => {
        try {
        let cate= name.ListCategory.split(',')
        cate.forEach((value, index, array) => {
            cate[index]="ListCategory LIKE'%"+value+"%'";
        })
        const rs = await Repository.FindNLSYcount(cate.join(' or '),name.Year,name.EpisodeNumber,name.Status);
        return Promise.resolve({result :{
            number:rs.length
        } })
    } catch (error) {
        return Promise.reject({messager :error})
     }
    }
    FindNLSY = async (name) => {
        try {
        let cate= name.ListCategory.split(',')
        cate.forEach((value, index, array) => {
            cate[index]="ListCategory LIKE'%"+value+"%'";
        })
        const rs = await Repository.FindNLSY(cate.join(' or '),name.Year,name.EpisodeNumber,name.Status,name.sart,name.end);
        return Promise.resolve({result : rs})
    } catch (error) {
        return Promise.reject({messager :error})
     }
    }
    Pagecount = async () => {
        try {
        const rs = await Repository.Pagecount();
        if (Object.keys(rs).length == 0) {
            return Promise.reject({messager :"Not Found"} )
        }
        return Promise.resolve({result : rs})
    } catch (error) {
        return Promise.reject({messager :"Not Found Page"})
     }
    }
    Page = async (name) => {
        try {
        const rs = await Repository.Page(Number(name.sart),Number(name.end));
        if (Object.keys(rs).length == 0) {
            return Promise.reject({messager :"Not Found"} )
        }
        return Promise.resolve({result : rs})
    } catch (error) {
        return Promise.reject({messager :error})
     }
    }



}