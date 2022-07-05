const Connect  =require('../Config/connect');
const knex = new Connect().knex;
const Bookshelf =require('bookshelf')(knex);

module.exports= Bookshelf.model('AnimeSever',{
    get tableName() { return 'animeserver'; },
    AnimePart(){
        return this.hasMany(AnimePart,"IdAnimeServer");
    }
});