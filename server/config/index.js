const app = require('./app');
const database = require('./database');

module.exports = Object.assign({}, app, database);