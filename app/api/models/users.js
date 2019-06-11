const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,  
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        trim: true,
        required: true,
        default: 'user'
    },
    created: {
        type: Date,
        default: Date.now
    }
});


   
// hash user password before saving into database
UserSchema.pre('save', function (next) {
    let salt = bcrypt.genSaltSync(saltRounds)
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});
   
module.exports = mongoose.model('User', UserSchema);