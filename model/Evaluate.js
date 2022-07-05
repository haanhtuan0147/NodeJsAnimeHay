const Connect  =require('../Config/connect');
const knex = new Connect().knex;
const Bookshelf =require('bookshelf')(knex);

module.exports= Bookshelf.model('Evaluate',{
    get tableName() { return 'evaluate'; },
});
