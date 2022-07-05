const KnexRepository=require('./repository');
const Connect  =require('../config/connect');
const knex = new Connect().knex;
const Category01=require('../model/Category')
const Category02=new Category01();
module.exports=class Category extends KnexRepository{
    constructor(){
        super(Category02.tableName)
    }
    findinlistid(item){
        return knex(this.tableName).whereIn('Id',item)
    }
}