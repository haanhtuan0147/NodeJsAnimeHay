module.exports= class Connect {
    knex = require('knex')({
       client: 'pg',
       connection: {
           host : 'ec2-3-222-74-92.compute-1.amazonaws.com',
           port: 5432,
           database: 'd9aq015f89rm7s',
           user: 'mhopzrblltkxjb',
           password: 'e9d43601aa84a1eaa2309a3ec98b622a397659cf10bcd6c664ecd506ed5cb91a',
           charset: 'utf8',
           ssl: {
               require:true,
               rejectUnauthorized: false
             },
           timezone: '+07:00',
           logging:false,
           query:{
               raw:true
             }
       },  
       useNullAsDefault: true,
       pool: { min: 0, max: 5 }
   })
}
/*module.exports= class Connect {
     knex = require('knex')({
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'animehay',
            charset: 'utf8',
            timezone: 'UTC',
        },
        useNullAsDefault: true
    })
}*/
