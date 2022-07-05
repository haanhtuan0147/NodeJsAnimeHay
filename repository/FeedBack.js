const KnexRepository=require('./repository');
const Connect  =require('../config/connect');
const knex = new Connect().knex;
const FeedBack01=require('../model/FeedBack')
const FeedBack02=new FeedBack01();
module.exports=class FeedBack extends KnexRepository{
    constructor(){
        super(FeedBack02.tableName)
    }
    findIdAnime(Id){
        return knex(this.tableName).where("IdComment",'=',Id)
        .select()
    }
    findcomment(Id){
        return knex(this.tableName).join('account', 'account.Id', '=', `${this.tableName}.IdAccount`).where(`${this.tableName}.IdComment`,'=',Id).orderBy(`${this.tableName}.UpDate`, 'desc')
        .select()
    }
}