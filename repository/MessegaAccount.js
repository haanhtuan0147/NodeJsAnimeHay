const KnexRepository=require('./repository');
const Connect  =require('../Config/connect');
const knex = new Connect().knex;
const MessegaAccount01=require('../model/MessegaAccount')
const MessegaAccount02=new MessegaAccount01();
module.exports=class MessegaAccount extends KnexRepository{
    constructor(){
        super(MessegaAccount02.tableName)
    }
}