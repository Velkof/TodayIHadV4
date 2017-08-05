/**
 * Created by Marjan on 26-Jun-17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true,
    },
    picture_large: {
        type: String,
        required: true,
    },
    followingUsers: {
        type: Array,
        required: false,
    },
    followedByUsers: {
        type: Array,
        required: false,
    },
    role: {
        type: String,
        required: true
    },
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('User', UserSchema);
