/**
 * Created by Marjan on 21-Jun-17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Food', FoodSchema);
