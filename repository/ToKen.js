const connect=require('../config/connect')
const knex=new connect().knex
exports.CreateToken=(item)=>{
    return knex('ToKen')
            .insert(item)
}
exports.SelectToken=(item)=>{
    return knex('ToKen')
    .where(item)
    .select()
}
exports.Update=(id,item)=>{
    return knex("ToKen")
        .where('Id', '=', id)
        .update(item)
}
exports.FindOneDay=(Id,date)=>{
    //return knex.raw(`select * from ToKen where IdAccount='${Id}' and date(CreateDate)='${new Date().getFullYear()}-${(new Date().getMonth())+1}-${new Date().getDate()}'`)
    return knex("ToKen").whereRaw(`DATE(CreateDate)='${date.getUTCFullYear()}-${(date.getUTCMonth())+1}-${date.getUTCDate()}'`).andWhere('IdAccount','=',Id).select()
}