const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const UserSession = new Schema({
    userid: {
        type: String,
        trim: true,
        required: true
    },
    token: {
        type: String,
        trim: true,
        required: true
    },
    reqip: {
        type: String,
        trim: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('UsersSession', UserSession);