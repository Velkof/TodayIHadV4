/**
 * Created by Marjan on 26-Jun-17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    role: String,
});

module.exports = mongoose.model('User', UserSchema);
