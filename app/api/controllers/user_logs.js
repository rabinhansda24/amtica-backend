const userModel = require('../models/users');
const userSessionModel = require('../models/userssession');

module.exports = {
    getUserLogs: (req, res, next) => {
        const userId = req.body.userId;
        userModel.findById(userId, (err, user) => {
            if(err){
                next(err);
            } else {
                if(user.role == 'admin') {
                    userSessionModel.find({}, (err, logs) => {
                        if(err) {
                            next(err);
                        } else {
                            res.json({status:"success", message: "Users logs", data:{logs: logs}})
                        }
                    })
                } else {
                    userSessionModel.find({userid: userId}, (err, logs) => {
                        if(err) {
                            next(err);
                        } else {
                            res.json({status:"success", message: "Users logs", data:{logs: logs}})
                        }
                    })
                }
            }
        })
        
    }
}