const KnexRepository=require('./repository');
const Connect  =require('../Config/connect');
const knex = new Connect().knex;
const Anime01=require('../model/Anime');
const { DOUBLE } = require('mysql/lib/protocol/constants/types');
const Anime02=new Anime01();
module.exports=class Anime extends KnexRepository{
    constructor(){
        super(Anime02.tableName)
    }
    FindNamecount(Name){
        return knex(this.tableName).count('NameAnime as number')
        .where('NameAnime','like',`%${Name}%`).select()
    }
    FindName(Name,Sart,end){
         return knex(this.tableName).where('NameAnime','like',`%${Name}%`).select('*',knex('evaluate').whereRaw(`IdAnime =${this.tableName}.Id`).avg("Scores").as("NumberEvaluate"),knex('episode').whereRaw(`IdAnime =${this.tableName}.Id`).max("EpisodeNumber").as("EpisodeNumbers")).orderBy('UpDate', 'desc')
        .limit(end).offset
        (Sart);
    }
    Pagecount(){
        return knex(this.tableName).count('NameAnime as number').select()
    }
    Page(Sart,end){
        return knex(this.tableName).select('*',knex('evaluate').whereRaw(`IdAnime =${this.tableName}.Id`).avg("Scores").as("NumberEvaluate"),knex('episode').whereRaw(`IdAnime =${this.tableName}.Id`).max("EpisodeNumber").as("EpisodeNumbers")).orderBy('UpDate', 'desc')
        .limit(end).offset
        (Sart);
    }
    FindCategorycount(Cate){
        return knex(this.tableName).count('NameAnime')
        .where("ListCategory","like",`%${Cate}%`).select()
    }
    FindCategory(Cate,Sart,end){
        return knex(this.tableName)
        .where("ListCategory","like",`%${Cate}%`).select().orderBy('UpDate', 'desc')
        .limit(end).offset
        (Sart);
    }
    Findyearcount(year){
        return knex(this.tableName).count('NameAnime')
        .where("Year",'like',`%${year}%`).select();
    }
    Findyear(year,Sart,end){
        return knex(this.tableName)
        .where("Year",'like',`%${year}%`).select().orderBy('UpDate', 'desc')
        .limit(end).offset
        (Sart);
    }
    FindNLSYcount(Cate,year,EpisodeNumber,Status){
        
        return knex(this.tableName)
        .whereRaw(Cate)
        .andWhere("Year",'like',`%${year}%`)
        .andWhere("Status",'like',`%${Status}%`)
        .select('*',
        knex('evaluate')
        .whereRaw(`IdAnime =${this.tableName}.Id`)
        .avg("Scores")
        .as("NumberEvaluate"),
        knex('episode')
        .whereRaw(`IdAnime =${this.tableName}.Id`)
        .max("EpisodeNumber")
        .as("EpisodeNumbers"))
        .having(Number(EpisodeNumber),"<=",knex('episode').whereRaw(`IdAnime =${this.tableName}.Id`).max("EpisodeNumber"))
        .orderBy('UpDate', 'desc')
    }
    FindNLSY(Cate,year,EpisodeNumber,Status,Sart,end){
        return knex(this.tableName)
        .whereRaw(Cate)
        .andWhere("Year",'like',`%${year}%`)
        .andWhere("Status",'like',`%${Status}%`)
        .select('*',
        knex('evaluate')
        .whereRaw(`IdAnime =${this.tableName}.Id`)
        .avg("Scores")
        .as("NumberEvaluate"),
        knex('episode')
        .whereRaw(`IdAnime =${this.tableName}.Id`)
        .max("EpisodeNumber")
        .as("EpisodeNumbers"))
        .having(Number(EpisodeNumber),"<=",knex('episode').whereRaw(`IdAnime =${this.tableName}.Id`).max("EpisodeNumber"))
        .orderBy('UpDate', 'desc')
        .limit(end).offset(Sart);
    }
    finddetailone(id){
        return knex(this.tableName).where({Id:id}).select('*',knex('evaluate').whereRaw(`IdAnime =${this.tableName}.Id`).avg("Scores").as("NumberEvaluate"),knex('evaluate').whereRaw(`IdAnime =${this.tableName}.Id`).count("Scores").as("CountNumberEvaluate"),knex('episode').whereRaw(`IdAnime =${this.tableName}.Id`).max("EpisodeNumber").as("EpisodeNumbers"));
    }
    LocFindCount(){
        return knex(this.tableName).where('NameAnime','like',`%${Name}%`).select('*',knex('evaluate').whereRaw(`IdAnime =${this.tableName}.Id`).avg("Scores").as("NumberEvaluate"),knex('episode').whereRaw(`IdAnime =${this.tableName}.Id`).max("EpisodeNumber").as("EpisodeNumbers")).and.orderBy('UpDate', 'desc')
        .limit(end).offset
        (Sart);
    }
}