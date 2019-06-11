const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const userSessionModel = require('../models/userssession');
const saltRounds = 10;

module.exports = {
    create: (req, res, next) => {
        userModel.find().exec((err, result) => {
            const count = result.length;
            console.log('Count: ', count)
            if(count == 0) {
                userModel.create({ 
                    name: req.body.name, 
                    email: req.body.email, 
                    password: req.body.password,
                    role: 'admin'
                }, (err, result) => {
                    if (err) 
                        next(err);
                    else
                        res.json({status: "success", message: "User added successfully!!!", data: null});
                 
                });
            } else {
                userModel.create({ 
                    name: req.body.name, 
                    email: req.body.email, 
                    password: req.body.password 
                }, (err, result) => {
                    if (err) 
                        next(err);
                    else
                        res.json({status: "success", message: "User added successfully!!!", data: null});
                 
                });
            }
        })
        
    },
   
    authenticate: (req, res, next) => {
        userModel.findOne({
            email:req.body.email
        }, (err, userInfo) => {
            if (err) {
                next(err);
            } else {
   
                if(bcrypt.compareSync(req.body.password, userInfo.password)) {
            
                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                    userSessionModel.create({
                        userid: userInfo._id,
                        token: token,
                        reqip: req.ip
                    })
                    const user = {
                        id: userInfo._id,
                        name: userInfo.name,
                        email: userInfo.email
                    }
                    res.json({status:"success", message: "user found!!!", data:{user: user, token:token}});
            
                }else{
            
                    res.json({status:"error", message: "Invalid email/password!!!", data:null});
            
                }
            }
       });
    },
   
}