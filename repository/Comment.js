const KnexRepository=require('./repository');
const Connect  =require('../Config/connect');
const knex = new Connect().knex;
const Comment01=require('../model/Comment')
const Comment02=new Comment01();
module.exports=class Comments extends KnexRepository{
    constructor(){
        super(Comment02.tableName)
    }
    findpage(Id,number){
        /*console.log(knex(this.tableName).join('account', 'account.Id', '=', `${this.tableName}.IdAccount`).where(`${this.tableName}.IdAnime`,'=',Id)
        .select(`${this.tableName}.*`,'account.NickName','account.Avatar','account.Leve').orderBy(`${this.tableName}.UpDate`, 'desc').limit(number).toSQL())*/
        return knex(this.tableName).join('account', 'account.Id', '=', `${this.tableName}.IdAccount`).where(`${this.tableName}.IdAnime`,'=',Id)
        .select(`${this.tableName}.*`,'account.NickName','account.Avatar','account.Leve').orderBy(`${this.tableName}.UpDate`, 'desc').limit(number)
    }
}