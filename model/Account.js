const Connect  =require('../config/connect');
const knex = new Connect().knex;
const Bookshelf =require('bookshelf')(knex);

module.exports= Bookshelf.model('account',{
    get tableName() { return 'account'; },
    Comment(){
        return this.hasMany(Commenttext,"IdAccount")
    },
    FeedBack(){
        return this.hasMany(FeedBack,"IdAccount")
    },
    Follow(){
        return this.hasMany(Follow,"IdAccount")
    },
    Evaluate(){
        return this.hasMany(Evaluate,"IdAccount")
    },
    MessegaAccount(){
        return this.hasMany(Evaluate,"IdAccount")
    },
    TimeOnline(){
        return this.hasMany(Evaluate,"IdAccount")
    }
});