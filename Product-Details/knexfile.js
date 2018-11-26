require('dotenv').config();

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      port: process.env.db_port,
      host: process.env.db_host,
      database: process.env.db_name,
      user: process.env.db_user,
      password: process.env.db_key,
      connectTimeout: 90000
    },
    debug: true,
    pool: {
      min: 1,
      max: 20,
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds',
    },
  }
};
