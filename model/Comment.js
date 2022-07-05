const Connect  =require('../Config/connect');
const knex = new Connect().knex;
const Bookshelf =require('bookshelf')(knex);

module.exports= Bookshelf.model('comment',{
    get tableName() { return 'comment'; },
    FeedBack(){
        return this.hasMany(FeedBack,"IdComment");
    }
});
