const app = require('./app');
const database = require('./database');
const auth = require('./auth');

module.exports = Object.assign({}, app, database, auth);