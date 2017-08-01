/**
 * Created by Marjan on 01-Aug-17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatMessageSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    receiver:  {
        type: String,
        required: true
    },
    message:  {
        type: String,
        required: true
    },
    seen:  {
        type: Boolean,
        required: true
    },
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
