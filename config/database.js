const mongoose = require('mongoose');
const mongoDB = 'mongodb://67.205.134.116/learntering';
mongoose.connect(mongoDB, {useNewUrlParser: true}, (err) => {
    if(err) {
        throw err
    }
    console.log("DB connection successfull")
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
