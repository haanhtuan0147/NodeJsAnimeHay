const KnexRepository=require('./repository');
const Connect  =require('../Config/connect');
const knex = new Connect().knex;
const AnimePart01=require('../model/AnimePart')
const AnimePart02=new AnimePart01();
module.exports=class AnimePart extends KnexRepository{
    constructor(){
        super(AnimePart02.tableName)
    }
    FindFollowIdAnime(id){
            return knex(this.tableName)
            .where('Id_1','in', knex(this.tableName).where('IdAnime','=', id).select('Id_1')).select()
    }
    CreateOld(item){
        return knex(this.tableName)
        .insert(item)
    }
}