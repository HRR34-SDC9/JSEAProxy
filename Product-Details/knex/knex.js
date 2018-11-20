require('dotenv').config();
const env = process.env.environment || 'development'
const config = require('../knexfile.js')[env];

module.exports = require('knex')(config);