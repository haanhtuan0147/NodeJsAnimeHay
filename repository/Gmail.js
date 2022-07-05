const KnexRepository=require('./repository');
const Connect  =require('../config/connect');
const knex = new Connect().knex;
const Gmail01=require('../model/Gmail')
const Gmail02=new Gmail01();
module.exports=class Gmail extends KnexRepository{
    constructor(){
        super(Gmail02.tableName)
    }
}