const KnexRepository=require('./repository');
const Connect  =require('../config/connect');
const knex = new Connect().knex;
const Episode01=require('../model/Episode')
const Episode02=new Episode01();
module.exports=class Episode extends KnexRepository{
    constructor(){
        super(Episode02.tableName)
    }
    EpisodeCountAnime(id){
        return knex(this.tableName).max('EpisodeNumber').where('IdAnime','=',id)
    }
    EpisodeSever(id,IdServer,EpisodeNumber){
        return knex(this.tableName).where('IdAnime','=',id).andWhere('EpisodeNumber','=',EpisodeNumber).andWhere('IdServer','=',IdServer).select().orderBy('EpisodeNumber', 'desc')
    }
    ListSever(id,EpisodeNumber){
        return knex(this.tableName).distinct('IdServer').join("animeserver","animeserver.Id","=",`${this.tableName}.IdServer`).where('IdAnime','=',id).andWhere('EpisodeNumber','=',EpisodeNumber).select(`${this.tableName}.*`,'animeserver.Name')
    }
    findItemdis(item){
        return knex(this.tableName)
        .where(item).orderBy('EpisodeNumber', 'desc')
        .groupBy("EpisodeNumber")
        .select()
    }
}