const KnexRepository=require('./repository');
const Account=require('../model/Account')
const Account01=new Account();
module.exports=class Account extends KnexRepository{
    constructor(){
        super(Account01.tableName)
    }
}