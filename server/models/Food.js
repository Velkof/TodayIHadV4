/**
 * Created by Marjan on 21-Jun-17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: String,
    amount: Number,
    unit: String,
    calories: Number,
    protein: Number,
    fat: Number,
    carbs: Number,
    sugar: Number,
    fiber: Number,
    fatSat: Number,
    fatMono: Number,
    fatPoly: Number,
    sodium: Number,
    cholesterol: Number
});

module.exports = mongoose.model('Food', FoodSchema);
