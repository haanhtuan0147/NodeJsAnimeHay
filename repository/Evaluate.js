const KnexRepository=require('./repository');
const Connect  =require('../Config/connect');
const knex = new Connect().knex;
const Evaluate01=require('../model/Evaluate')
const Evaluate02=new Evaluate01();
module.exports=class Evaluate extends KnexRepository{
    constructor(){
        super(Evaluate02.tableName)
    }
    findevaluateAnime(id){
        return knex(this.tableName)
        .where({IdAnime:id}).avg("Scores as NumberEvaluate")
    }
}