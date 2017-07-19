/**
 * Created by Marjan on 21-Jun-17.
 */
const User = require('./User');
const Food = require('./Food');
const LoggedFood = require('./LoggedFood');


module.exports = Object.assign({}, User, Food, LoggedFood);