const FileUploadModel = require('../models/fileupload');
const mkdirp = require('mkdirp');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './public/files/uploads';
        mkdirp(dir, err => cb(err, dir))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage }).single('file')
const PORT = 3000;
const URL = `http://amtica.rabinhansda.com:${PORT}/`;

module.exports = {
    upload:(req, res, next) => {
        const userId = req.body.userId;
        upload(req, res, (err) => {
            if(err) {
                next(err);
            }
            
            console.log('User id: ', userId);
            const filePath = `${URL}files/uploads/${req.file.filename}`;
            FileUploadModel.create({
                file_path: filePath,
                file_name: req.file.filename,
                userid: userId
            })
            const data = {
                'path': filePath,
                'name': req.file.filename
            }
            res.json({status: "success", message: "File uploaded successfully!!!", data: data})
        })
    },
    getFilesByUser: (req, res, next) => {
        const userId = req.body.userId;
        FileUploadModel.find({userid: userId}, (err, files) => {
            if(err) {
                next(err);
            } else {
                res.json({status:"success", message: "Users logs", data:{files: files}})
            }
        })
    } 
}
