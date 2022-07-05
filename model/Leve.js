const Connect  =require('../Config/connect');
const knex = new Connect().knex;
const Bookshelf =require('bookshelf')(knex);

module.exports= Bookshelf.model('leve',{
    get tableName() { return 'leve'; },
    Account(){
        return this.hasMany(Account,"Leve")
    }
});
