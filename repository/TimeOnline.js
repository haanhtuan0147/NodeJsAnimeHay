const KnexRepository=require('./repository');
const Connect  =require('../Config/connect');
const knex = new Connect().knex;
const TimeOnline01=require('../model/TimeOnline')
const TimeOnline02=new TimeOnline01();
module.exports=class TimeOnline extends KnexRepository{
    constructor(){
        super(TimeOnline02.tableName)
    }
    findatetime5(id,date){
        return knex(this.tableName).whereRaw(`DATE(CreateDate)='${date.getUTCFullYear()}-${(date.getUTCMonth())+1}-${date.getUTCDate()}'`).andWhere('IdAccount','=',id).orderBy('UpDate', 'desc').select()
    }
}