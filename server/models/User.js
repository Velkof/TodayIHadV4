/**
 * Created by Marjan on 26-Jun-17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('User', UserSchema);
