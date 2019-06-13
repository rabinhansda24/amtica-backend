const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FileUploadSchema = new Schema({
    file_path: {
        type: String,
        trim: true,  
        required: true,
    },
    file_name: {
        type: String,
        trim: true,
        required: true
    },
    file_ext: {
        type: String,
        trim: true,
        required: true
    },
    userid: {
        type: String,
        trim: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('FileUpload', FileUploadSchema)