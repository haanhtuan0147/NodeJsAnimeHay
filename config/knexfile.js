// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
/*module.exports = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "animehay",
    timezone: 'UTC',
  },
  migrations: {
    file: __dirname + '/migrations'
  },
  seeds: {
    file: __dirname + '/seeds'
  },
  useNullAsDefault: true
}*/
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : 'ec2-3-222-74-92.compute-1.amazonaws.com',
      port: 5432,
      database: 'd9aq015f89rm7s',
      user: 'mhopzrblltkxjb',
      password: 'e9d43601aa84a1eaa2309a3ec98b622a397659cf10bcd6c664ecd506ed5cb91a',
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
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  },

};
