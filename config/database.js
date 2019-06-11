const mongoose = require('mongoose');
const options = {
    useNewUrlParser: true
}
const mongoDB = 'mongodb://dev:dev001@67.205.134.116:27017/learntering?authSource=admin&w=1';
mongoose.connect(mongoDB, options, (err) => {
    if(err) {
        throw err
    }
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
