const KnexRepository=require('./repository');
const Connect  =require('../Config/connect');
const knex = new Connect().knex;
const AnimeServer01=require('../model/AnimeServer')
const AnimeServer02=new AnimeServer01();
module.exports=class AnimeServer extends KnexRepository{
    constructor(){
        super(AnimeServer02.tableName)
    }
}