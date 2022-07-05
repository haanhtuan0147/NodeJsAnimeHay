const KnexRepository=require('./repository');
const Connect  =require('../config/connect');
const knex = new Connect().knex;
const Leve01=require('../model/Leve')
const Leve02=new Leve01();
module.exports=class Leve extends KnexRepository{
    constructor(){
        super(Leve02.tableName)
    }
}