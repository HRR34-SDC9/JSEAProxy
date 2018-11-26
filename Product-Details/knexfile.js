require('dotenv').config();

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      // port: process.env.db_port,
      host: process.env.db_host,
      user: process.env.db_user,
      password: process.env.db_key,
      database: process.env.db_name,
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds',
    }
  }
};
