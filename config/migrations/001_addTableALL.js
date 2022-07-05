
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up=(knex)=>{
    return knex.schema
    .createTable("gmailacces",function(table){
        table.specificType('Id','CHAR(100)');
        table.string('Email',255).notNullable();
        table.text('NumberAcces').notNullable();
        table.timestamp('CreateDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('UpDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'), knex.raw('ON UPDATE CURRENT_TIMESTAMP'));
    })
    .createTable('leve', function (table) {
       table.specificType('Id','CHAR(100)');
       table.integer('Leve').notNullable().primary();
       table.integer('Experience',100).notNullable();
       table.string('Title', 255).notNullable();
       table.timestamp('CreateDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'));
       table.timestamp('UpDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'), knex.raw('ON UPDATE CURRENT_TIMESTAMP'));
    })
    .createTable('accountpremissions', function (table) {
       table.specificType('Id','CHAR(100)');
       table.specificType('Symbol','CHAR(10)').primary();
       table.string('Describe', 1000).notNullable();
       table.timestamp('CreateDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP '));
       table.timestamp('UpDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'), knex.raw('ON UPDATE CURRENT_TIMESTAMP'));
    })
    .createTable('account',function(table){
        table.specificType('Id','CHAR(100)').primary();
        table.text('Avatar').notNullable();
        table.string('Email',255).notNullable();
        table.text('Password').notNullable();
        table.string('NickName',255);
        table.string('Maxim',255);
        table.timestamp('CreateDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP '));
        table.timestamp('UpDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'), knex.raw('ON UPDATE CURRENT_TIMESTAMP'));
        table.integer('Leve').defaultTo(1);
        table.integer('Experience').defaultTo(0);
        table.specificType('Symbol','CHAR(10)').notNullable();
        table.foreign('Symbol').references('Symbol').inTable('accountpremissions');
        table.foreign('Leve').references('Leve').inTable('leve');
    })
    .createTable('messageaccount',function(table){
        table.specificType('Id','CHAR(100)').primary();
        table.specificType('IdAccount','CHAR(100)').notNullable();
        table.string('Message',255).notNullable();
        table.timestamp('CreateDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP '));
        table.timestamp('UpDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'), knex.raw('ON UPDATE CURRENT_TIMESTAMP'));
        table.foreign('IdAccount').references('Id').inTable('account');
    })
    .createTable('token',function(table){
        table.specificType('Id','CHAR(100)').primary();
        table.specificType('IdAccount','CHAR(100)').notNullable();
        table.text('ToKen').notNullable();
        table.timestamp('CreateDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP '));
        table.timestamp('UpDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'), knex.raw('ON UPDATE CURRENT_TIMESTAMP'));
        table.foreign('IdAccount').references('Id').inTable('account'); 
    })
    .createTable('category',function(table){
        table.specificType('Id','CHAR(100)').primary();
        table.string('NameCategory',255).notNullable();
        table.text('Describe').notNullable().defaultTo('Không biết nó là gì:???');
        table.timestamp('CreateDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP '));
        table.timestamp('UpDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'), knex.raw('ON UPDATE CURRENT_TIMESTAMP'));
    })
    .createTable('anime',function(table){
        table.specificType('Id','CHAR(100)').primary();
        table.text('Avatar').notNullable();
        table.string('NameAnime',255).notNullable();
        table.text('Content').notNullable().defaultTo('Không biết nó là gì:???');
        table.text('ListCategory').notNullable().defaultTo('1');
        table.string('Status',255).notNullable().defaultTo('Đang Tiến Hành ...');
        table.float('Year').notNullable().defaultTo(2020);
        table.float('EpisodeNumber').notNullable().defaultTo(1);
        table.timestamp('CreateDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP '));
        table.timestamp('UpDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'), knex.raw('ON UPDATE CURRENT_TIMESTAMP'));
    })
    .createTable('animepart',function(table){
        table.specificType('Id','CHAR(100)');
        table.specificType('Id_1','CHAR(100)');
        table.specificType('IdAnime','CHAR(100)');
        table.string('Describe');
        table.foreign('IdAnime').references('Id').inTable('anime');
        table.primary('IdAnime');
        table.timestamp('CreateDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP '));
        table.timestamp('UpDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'), knex.raw('ON UPDATE CURRENT_TIMESTAMP'));
    })
    .createTable('animeserver',function(table){
        table.specificType('Id','CHAR(100)').primary();
        table.string('Name',255).notNullable();
        table.timestamp('CreateDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP '));
        table.timestamp('UpDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'), knex.raw('ON UPDATE CURRENT_TIMESTAMP'));
    })
    .createTable('episode',function(table){
        table.specificType('Id','CHAR(100)').primary()
        table.specificType('IdAnime','CHAR(100)');
        table.integer('EpisodeNumber');
        table.specificType('IdServer','CHAR(100)');
        table.text('Link').notNullable();
        table.integer('NumberView').notNullable().defaultTo(0);
        table.timestamp('CreateDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP '));
        table.timestamp('UpDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'), knex.raw('ON UPDATE CURRENT_TIMESTAMP'));
        table.foreign('IdAnime').references('Id').inTable('anime');
        table.foreign('IdServer').references('Id').inTable('animeserver');
    })
    .createTable('comment',function(table){
        table.specificType('Id','CHAR(100)').primary();
        table.specificType('IdAnime','CHAR(100)').notNullable();
        table.specificType('IdAccount','CHAR(100)').notNullable();
        table.text('Comment').notNullable().defaultTo('Không Biết nói Gì Phim Quá Hay ...');
        table.timestamp('CreateDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP '));
        table.timestamp('UpDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'), knex.raw('ON UPDATE CURRENT_TIMESTAMP'));
        table.foreign('IdAnime').references('Id').inTable('anime');
        table.foreign('IdAccount').references('Id').inTable('account');
    })
    .createTable('feedback',function(table){
        table.specificType('Id','CHAR(100)').primary();
        table.specificType('IdComment','CHAR(100)').notNullable();
        table.specificType('IdAccount','CHAR(100)').notNullable();
        table.text('FeedBack').notNullable().defaultTo('Bạn Nó Rất Đúng');
        table.timestamp('CreateDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP '));
        table.timestamp('UpDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'), knex.raw('ON UPDATE CURRENT_TIMESTAMP'));
        table.foreign('IdComment').references('Id').inTable('comment');
        table.foreign('IdAccount').references('Id').inTable('account');
    })
    .createTable('follow',function(table){
        table.specificType('Id','CHAR(100)').primary();
        table.specificType('IdAccount','CHAR(100)').notNullable();
        table.specificType('IdAnime','CHAR(100)').notNullable();
        table.foreign('IdAnime').references('Id').inTable('anime');
        table.foreign('IdAccount').references('Id').inTable('account');
        table.timestamp('CreateDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP '));
        table.timestamp('UpDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'), knex.raw('ON UPDATE CURRENT_TIMESTAMP'));
    })
    .createTable('evaluate',function(table){
        table.specificType('Id','CHAR(100)').primary();
        table.specificType('IdAccount','CHAR(100)').notNullable();
        table.specificType('IdAnime','CHAR(100)').notNullable();
        table.integer('Scores').notNullable().defaultTo(10);
        table.timestamp('CreateDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP '));
        table.timestamp('UpDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'), knex.raw('ON UPDATE CURRENT_TIMESTAMP'));
        table.foreign('IdAnime').references('Id').inTable('anime');
        table.foreign('IdAccount').references('Id').inTable('account');
    })
    .createTable('timeonline',function(table){
        table.specificType('Id','CHAR(100)').primary();
        table.specificType('IdAccount','CHAR(100)').notNullable();
        table.integer('Time').notNullable().defaultTo(0);
        table.integer('Count').notNullable().defaultTo(0);
        table.timestamp('CreateDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('UpDate',{  precision: 6  }).defaultTo(knex.raw('CURRENT_TIMESTAMP'), knex.raw('ON UPDATE CURRENT_TIMESTAMP'));
        table.foreign('IdAccount').references('Id').inTable('account');
    });
    };

    exports.down=(knex)=>{
      return knex.schema
      .dropTable("timeonline")
      .dropTable("evaluate")
      .dropTable("follow")
      .dropTable("feedback")
      .dropTable("comment")
      .dropTable("episode")
      .dropTable("animepart")
      .dropTable("animeserver")
      .dropTable("anime")
      .dropTable("category")
      .dropTable("toKen")
      .dropTable("account")
      .dropTable("accountpremissions")
      .dropTable("leve");
    };