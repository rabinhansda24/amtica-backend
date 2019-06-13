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
const URL = `http://localhost:${PORT}/`;

module.exports = {
    upload:(req, res, next) => {
        const userId = req.body.userId;
        upload(req, res, (err) => {
            if(err) {
                next(err);
            }
            
            let fname = req.file.filename;
            const filePath = `/files/uploads/${fname}`;
            let ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            FileUploadModel.create({
                file_path: filePath,
                file_name: req.file.filename,
                file_ext: ext,
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
        userModel.findById(userId, (err, user) => {
            if(err){
                next(err);
            } else {
                if(user.role == 'admin') {
                    FileUploadModel.find({}, (err, files) => {
                        if(err) {
                            next(err);
                        } else {
                            res.json({status:"success", message: "Users logs", data:{files: files}})
                        }
                    })
                } else {
                    FileUploadModel.find({userid: userId}, (err, files) => {
                        if(err) {
                            next(err);
                        } else {
                            res.json({status:"success", message: "Users logs", data:{files: files}})
                        }
                    })
                }
            }
        })
        
    } 
}
