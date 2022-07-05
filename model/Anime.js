const Connect  =require('../config/connect');
const AnimePart = require('./AnimePart');
const knex = new Connect().knex;
const Bookshelf =require('bookshelf')(knex);

module.exports= Bookshelf.model('anime',{
    get tableName() { return 'anime'; },
    AnimePart(){
        return this.hasMany(AnimePart,"IdAnime")
    },
    Episode(){
        return this.hasMany(Episode,"IdAnime")
    },
});
