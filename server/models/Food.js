/**
 * Created by Marjan on 21-Jun-17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount:  {
        type: Number,
        required: true
    },
    unit:  {
        type: String,
        required: true
    },
    units: {
        type: Array,
        required: true
    },
    calories:  {
        type: Number,
        required: true
    },
    protein:  {
        type: Number,
        required: true
    },
    fat:  {
        type: Number,
        required: true
    },
    carbs:  {
        type: Number,
        required: true
    },
    createdAt: Date,
    updatedAt: Date,
    sugar: Number,
    fiber: Number,
    fatSat: Number,
    fatMono: Number,
    fatPoly: Number,
    sodium: Number,
    cholesterol: Number,
});

module.exports = mongoose.model('Food', FoodSchema);
