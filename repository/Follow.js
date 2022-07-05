const KnexRepository=require('./repository');
const Connect  =require('../config/connect');
const knex = new Connect().knex;
const Follow01=require('../model/Follow')
const Follow02=new Follow01();
module.exports=class Follow extends KnexRepository{
    constructor(){
        super(Follow02.tableName)
    }
    findUser(id){
        return knex(this.tableName).join('anime','anime.Id','=',`${this.tableName}.IdAnime`).where(`${this.tableName}.IdAccount`,'=',id).select('anime.*',`${this.tableName}.Id as Idfollow`,knex('evaluate').whereRaw(`IdAnime =anime.Id`).avg("Scores").as("NumberEvaluate"),knex('episode').whereRaw(`IdAnime =anime.Id`).max("EpisodeNumber").as("EpisodeNumbers")).orderBy('UpDate', 'desc')
    }
    
}