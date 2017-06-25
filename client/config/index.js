const app = require('./app');
const auth = require('./auth');

module.exports = Object.assign({}, app, auth);